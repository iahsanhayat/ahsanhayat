"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Wifi,
  Battery,
  Signal,
  ArrowLeft,
} from "lucide-react";
import { Project } from "@/data/portfolioData";

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bufferedPercent, setBufferedPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [durationSec, setDurationSec] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [showCenterIcon, setShowCenterIcon] = useState<"play" | "pause" | null>(null);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bufferingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const centerIconTimerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const triggerCenterIcon = (type: "play" | "pause") => {
    setShowCenterIcon(type);
    if (centerIconTimerRef.current) clearTimeout(centerIconTimerRef.current);
    centerIconTimerRef.current = setTimeout(() => setShowCenterIcon(null), 500);
  };

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false);
            triggerCenterIcon("play");
          })
          .catch((err) => {
            console.warn("Play aborted or prevented:", err);
            setIsPlaying(false);
            setIsBuffering(false);
          });
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsBuffering(false);
      triggerCenterIcon("pause");
    }
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current || isScrubbing) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((cur / dur) * 100);
      setCurrentTime(formatTime(cur));
    }
    updateBuffered();
  };

  const updateBuffered = () => {
    if (!videoRef.current) return;
    const buf = videoRef.current.buffered;
    const dur = videoRef.current.duration;
    if (buf.length > 0 && dur > 0) {
      const bufferedEnd = buf.end(buf.length - 1);
      setBufferedPercent(Math.min(100, (bufferedEnd / dur) * 100));
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    setDurationSec(dur);
    setDuration(formatTime(dur));
    updateBuffered();
  };

  const handleSeekInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (durationSec > 0) {
      setCurrentTime(formatTime((val / 100) * durationSec));
    }
  };

  const handleSeekCommit = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (!videoRef.current || durationSec <= 0) return;
    const val = parseFloat((e.target as HTMLInputElement).value);
    const seekTime = (val / 100) * durationSec;
    videoRef.current.currentTime = seekTime;
    setIsScrubbing(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard accessibility: Backspace or Escape closes modal and returns to main website where user was
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "Backspace" || e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === " " || e.key === "k") {
        e.preventDefault();
        handlePlayPause();
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "m") {
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePlayPause, onClose]);

  // Controls auto-hide
  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const handleWaiting = () => {
    if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
    bufferingTimerRef.current = setTimeout(() => {
      setIsBuffering(true);
    }, 200);
  };

  const handleCanPlay = () => {
    if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
    setIsBuffering(false);
  };

  // Reset and auto-play attempt when project changes
  useEffect(() => {
    setIsPlaying(false);
    setIsBuffering(false);
    setProgress(0);
    setBufferedPercent(0);
    setCurrentTime("0:00");
    setDuration("0:00");

    if (!videoRef.current) return;
    const video = videoRef.current;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsBuffering(false);
        });
    }

    return () => {
      if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      if (centerIconTimerRef.current) clearTimeout(centerIconTimerRef.current);
    };
  }, [project?.id]);

  if (!project) return null;

  const isVertical = project.aspectRatio === "9:16";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      {/* Top Floating Utility Bar (Quick Exit & Backspace Tip) */}
      <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 z-50 flex items-center justify-between pointer-events-none">
        <button
          onClick={onClose}
          type="button"
          className="pointer-events-auto inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[#F5F2EA] backdrop-blur-md text-xs font-semibold tracking-wider transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK</span>
        </button>

        <div className="flex items-center space-x-3 pointer-events-auto">
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            Press <kbd className="text-[#C9A86A] font-bold">⌫ Backspace</kbd> to exit
          </span>

          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[#F5F2EA] flex items-center justify-center transition-all focus:outline-none"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Modal Container */}
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetControlsTimer}
        className={`relative my-auto flex flex-col ${
          isVertical
            ? "lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-5xl w-full"
            : "items-center justify-center gap-6 max-w-5xl w-full"
        }`}
      >
        {/* ====================================================================
            THE REALISTIC IPHONE MOCKUP (Portrait vs Landscape Orientation)
           ==================================================================== */}
        <div className="relative shrink-0 flex items-center justify-center">
          {/* Outer Titanium Phone Shell */}
          <div
            className={`relative ${
              isVertical
                ? "w-[310px] sm:w-[350px] md:w-[370px] aspect-[9/19.5] rounded-[52px]"
                : "w-full max-w-[820px] aspect-[19.5/9] rounded-[48px]"
            } bg-[#181817] p-2.5 sm:p-3 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.12)] border-[3px] border-[#363532] transition-all`}
          >
            {/* Side Hardware Buttons (Authentic Titanium Buttons) */}
            {isVertical ? (
              <>
                {/* Left Side: Action Button & Volume Buttons */}
                <div className="absolute -left-[5px] top-24 w-[3px] h-7 bg-[#2e2d2a] rounded-l" />
                <div className="absolute -left-[5px] top-36 w-[3px] h-12 bg-[#2e2d2a] rounded-l" />
                <div className="absolute -left-[5px] top-52 w-[3px] h-12 bg-[#2e2d2a] rounded-l" />
                {/* Right Side: Power / Lock Button */}
                <div className="absolute -right-[5px] top-32 w-[3px] h-16 bg-[#2e2d2a] rounded-r" />
              </>
            ) : (
              <>
                {/* Landscape Top Side: Action & Volume Buttons */}
                <div className="absolute top-[-5px] left-24 h-[3px] w-7 bg-[#2e2d2a] rounded-t" />
                <div className="absolute top-[-5px] left-36 h-[3px] w-12 bg-[#2e2d2a] rounded-t" />
                <div className="absolute top-[-5px] left-52 h-[3px] w-12 bg-[#2e2d2a] rounded-t" />
              </>
            )}

            {/* Inner Phone Screen Canvas */}
            <div
              className={`relative w-full h-full bg-black ${
                isVertical ? "rounded-[42px]" : "rounded-[38px]"
              } overflow-hidden cursor-pointer select-none group flex items-center justify-center`}
              onClick={handlePlayPause}
            >
              {/* Dynamic Island & iOS Status Bar (Portrait) */}
              {isVertical && (
                <div className="absolute top-0 left-0 right-0 z-30 pt-3 px-6 flex items-center justify-between text-white pointer-events-none">
                  <span className="text-[11px] font-semibold tracking-tight">9:41</span>

                  {/* Dynamic Island Pill */}
                  <div className="w-[102px] h-[26px] rounded-full bg-black border border-white/5 flex items-center justify-between px-2.5 shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#121315] border border-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0a1828]" />
                  </div>

                  <div className="flex items-center space-x-1.5 text-white">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-4 h-4 fill-white" />
                  </div>
                </div>
              )}

              {/* Dynamic Island in Landscape (Placed on the left rim as in real rotated iPhone) */}
              {!isVertical && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                  <div className="h-[96px] w-[24px] rounded-full bg-black border border-white/5 flex flex-col items-center justify-between py-2 shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#121315] border border-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0a1828]" />
                  </div>
                </div>
              )}

              {/* Video Element (Fills the phone display seamlessly) */}
              <video
                key={project.id}
                ref={videoRef}
                src={project.video}
                poster={project.thumbnail}
                preload="auto"
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onProgress={updateBuffered}
                onWaiting={handleWaiting}
                onPlaying={() => {
                  if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
                  setIsBuffering(false);
                  setIsPlaying(true);
                }}
                onCanPlay={handleCanPlay}
                onSeeked={() => {
                  if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
                  setIsBuffering(false);
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  setIsBuffering(false);
                  setShowControls(true);
                }}
                className={`w-full h-full ${
                  isVertical ? "object-cover" : "object-contain"
                } bg-black`}
              />

              {/* Quick Click-Feedback Indicator */}
              {showCenterIcon && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 animate-ping duration-300">
                  <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md text-[#C9A86A] flex items-center justify-center border border-[#C9A86A]/30">
                    {showCenterIcon === "play" ? (
                      <Play className="w-7 h-7 fill-current ml-0.5" />
                    ) : (
                      <Pause className="w-7 h-7 fill-current" />
                    )}
                  </div>
                </div>
              )}

              {/* Buffering Indicator */}
              {isBuffering && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 bg-black/40 backdrop-blur-[2px]">
                  <div className="w-10 h-10 rounded-full border-2 border-[#C9A86A]/30 border-t-[#C9A86A] animate-spin mb-2" />
                  <span className="text-[10px] font-bold tracking-widest text-[#C9A86A] uppercase">
                    Loading
                  </span>
                </div>
              )}

              {/* Center Play Overlay when Paused */}
              {!isPlaying && !isBuffering && (
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#C9A86A] text-black flex items-center justify-center pl-1 shadow-[0_0_35px_rgba(201,168,106,0.5)] transform scale-100 group-hover:scale-105 transition-transform duration-300">
                    <Play className="w-7 h-7 fill-current" />
                  </div>
                </div>
              )}

              {/* iOS Video Controls Bar */}
              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20 transition-opacity duration-300 ${
                  showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Timeline Progress Slider */}
                <div className="relative mb-2 flex items-center group/timeline">
                  <div className="absolute left-0 right-0 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/35 transition-all duration-150"
                      style={{ width: `${bufferedPercent}%` }}
                    />
                  </div>
                  <div className="absolute left-0 right-0 h-1 rounded-full overflow-hidden pointer-events-none">
                    <div
                      className="h-full bg-[#C9A86A] transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleSeekInput}
                    onMouseUp={handleSeekCommit}
                    onTouchEnd={handleSeekCommit}
                    className="relative w-full h-4 opacity-0 cursor-pointer z-10"
                    aria-label="Seek video progress"
                  />
                </div>

                {/* Control Actions Row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handlePlayPause}
                      className="text-white hover:text-[#C9A86A] transition-colors p-1"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>

                    <span className="text-[11px] font-mono text-white/80">
                      {currentTime} / {duration}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-[#C9A86A] transition-colors p-1"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-[#C9A86A] transition-colors p-1"
                      aria-label="Toggle Fullscreen"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* iOS Home Indicator Bar */}
                <div className="mt-3 w-28 h-1 rounded-full bg-white/40 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            PROJECT INFORMATION CARD (Elegantly positioned beside/below phone)
           ==================================================================== */}
        <div
          className={`flex-1 w-full bg-[#141413]/90 border border-white/10 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl text-left space-y-5 ${
            isVertical ? "max-w-md lg:max-w-lg" : "max-w-4xl"
          }`}
        >
          {/* Header & Category */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C9A86A] uppercase">
                {project.category}
              </span>
            </div>

            {project.isClientProject && (
              <span className="text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#C9A86A]/15 text-[#E0C487] border border-[#C9A86A]/30">
                Client Project
              </span>
            )}
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F2EA]">
              {project.title}
            </h3>
            <p className="text-sm text-[#A7A39A] mt-2 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Duration & Roles */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#77736C]">Duration</span>
              <p className="font-semibold text-[#F5F2EA] mt-0.5">{project.duration || "N/A"}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#77736C]">Format</span>
              <p className="font-semibold text-[#F5F2EA] mt-0.5">
                {isVertical ? "Vertical (9:16 Mobile)" : "Widescreen (16:9)"}
              </p>
            </div>
          </div>

          {/* Tools Used */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] uppercase tracking-widest text-[#77736C]">Tools Used</span>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#C9A86A]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <button
              onClick={onClose}
              className="text-xs font-semibold tracking-wider uppercase text-[#A7A39A] hover:text-[#C9A86A] transition-colors"
            >
              ← Back to site
            </button>

            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center text-xs font-bold tracking-wider uppercase text-[#C9A86A] hover:text-[#E0C487] transition-colors"
            >
              <span>Discuss Project</span>
              <Sparkles className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
