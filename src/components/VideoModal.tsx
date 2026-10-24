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
  RotateCcw,
  Sparkles,
  RotateCw,
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

  // Smooth Scrubbing: immediate UI response, clean seeking
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

  const skipTime = (deltaSeconds: number) => {
    if (!videoRef.current) return;
    const newTime = Math.max(0, Math.min(videoRef.current.currentTime + deltaSeconds, durationSec));
    videoRef.current.currentTime = newTime;
    setProgress(durationSec > 0 ? (newTime / durationSec) * 100 : 0);
    setCurrentTime(formatTime(newTime));
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

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " " || e.key === "k") {
        e.preventDefault();
        handlePlayPause();
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "m") {
        toggleMute();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        skipTime(-5);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        skipTime(5);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setVolume((v) => {
          const next = Math.min(1, v + 0.1);
          if (videoRef.current) videoRef.current.volume = next;
          return next;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setVolume((v) => {
          const next = Math.max(0, v - 0.1);
          if (videoRef.current) videoRef.current.volume = next;
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePlayPause, onClose, durationSec]);

  // Auto-hide controls when playing and inactive
  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2800);
    }
  };

  // Buffering debouncer: only show buffer indicator if waiting takes >280ms
  const handleWaiting = () => {
    if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
    bufferingTimerRef.current = setTimeout(() => {
      setIsBuffering(true);
    }, 280);
  };

  const handleCanPlay = () => {
    if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
    setIsBuffering(false);
  };

  // Reset and auto-play attempt when project changes or modal opens
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
          // Autoplay with sound restricted by browser; user will click play
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#0B0B0B]/95 backdrop-blur-xl animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetControlsTimer}
        className={`relative w-full ${
          isVertical ? "max-w-md" : "max-w-5xl"
        } bg-[#111111] border border-white/[0.08] rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-auto`}
      >
        {/* Top bar with project tag and close button */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-[#0E0E0E]/90 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#C9A86A] uppercase">
              {project.category}
            </span>
            {project.isClientProject && (
              <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/20">
                Client Project
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-[#A7A39A] hover:text-[#F5F2EA] p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Canvas */}
        <div
          className={`relative bg-black flex items-center justify-center ${
            isVertical ? "aspect-[9/16] max-h-[75vh]" : "aspect-[16/9]"
          } overflow-hidden cursor-pointer group select-none`}
          onClick={handlePlayPause}
        >
          <video
            key={project.id}
            ref={videoRef}
            src={project.video}
            poster={project.thumbnail}
            preload="metadata"
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
            className="w-full h-full object-contain"
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

          {/* Elegant Non-blocking Center Buffering Spinner */}
          {isBuffering && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-black/30 backdrop-blur-[1px] transition-all">
              <div className="w-12 h-12 rounded-full border-2 border-[#C9A86A]/20 border-t-[#C9A86A] animate-spin mb-2.5 shadow-[0_0_25px_rgba(201,168,106,0.4)]" />
              <span className="text-[10px] font-semibold tracking-[0.22em] text-[#C9A86A] uppercase">
                Loading...
              </span>
            </div>
          )}

          {/* Large Center Play Overlay (when paused and not buffering) */}
          {!isPlaying && !isBuffering && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none transition-opacity">
              <div className="w-20 h-20 rounded-full bg-[#C9A86A] text-[#0B0B0B] flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(201,168,106,0.4)] transform scale-100 group-hover:scale-105 transition-transform duration-300">
                <Play className="w-8 h-8 fill-current" />
              </div>
            </div>
          )}

          {/* Minimal Custom Control Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-300 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Timeline Progress Slider with Buffered Track */}
            <div className="relative mb-3 flex items-center group/timeline">
              {/* Background track */}
              <div className="absolute left-0 right-0 h-1 bg-white/15 rounded-full overflow-hidden pointer-events-none">
                {/* Buffered chunk indicator */}
                <div
                  className="h-full bg-white/25 transition-all duration-300"
                  style={{ width: `${bufferedPercent}%` }}
                />
              </div>

              {/* Active played progress fill */}
              <div
                className="absolute left-0 h-1 bg-gradient-to-r from-[#C9A86A] to-[#E0C487] rounded-full pointer-events-none"
                style={{ width: `${progress}%` }}
              />

              <input
                type="range"
                min="0"
                max="100"
                step="0.05"
                value={progress}
                onPointerDown={() => setIsScrubbing(true)}
                onTouchStart={() => setIsScrubbing(true)}
                onChange={handleSeekInput}
                onPointerUp={handleSeekCommit}
                onTouchEnd={handleSeekCommit}
                className="w-full h-2 appearance-none bg-transparent cursor-pointer relative z-10 accent-[#C9A86A] focus:outline-none"
                aria-label="Video timeline"
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-xs text-[#F5F2EA]">
              <div className="flex items-center space-x-3">
                {/* Play / Pause Toggle */}
                <button
                  onClick={handlePlayPause}
                  className="p-1 text-[#F5F2EA] hover:text-[#C9A86A] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>

                {/* Rewind 5s */}
                <button
                  onClick={() => skipTime(-5)}
                  className="p-1 text-[#A7A39A] hover:text-[#F5F2EA] transition-colors"
                  aria-label="Rewind 5 seconds"
                  title="Rewind 5s (←)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Forward 5s */}
                <button
                  onClick={() => skipTime(5)}
                  className="p-1 text-[#A7A39A] hover:text-[#F5F2EA] transition-colors"
                  aria-label="Forward 5 seconds"
                  title="Forward 5s (→)"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                <div className="text-[11px] font-mono tracking-wider text-[#A7A39A]">
                  <span className="text-[#F5F2EA]">{currentTime}</span> / {duration}
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                {/* Volume & Mute */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={toggleMute}
                    className="p-1 text-[#A7A39A] hover:text-[#C9A86A] transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    title="Mute / Unmute (M)"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-white/20 rounded appearance-none cursor-pointer accent-[#C9A86A]"
                    aria-label="Volume slider"
                  />
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1 text-[#A7A39A] hover:text-[#C9A86A] transition-colors"
                  aria-label="Toggle Fullscreen"
                  title="Toggle Fullscreen (F)"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Information Panel */}
        <div className="p-6 md:p-8 bg-[#111111] space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#F5F2EA]">
                {project.title}
              </h3>
              <p className="text-sm text-[#A7A39A] mt-2 leading-relaxed max-w-2xl">
                {project.longDescription || project.description}
              </p>
            </div>

            {project.duration && (
              <div className="shrink-0 text-right">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#77736C]">
                  Duration
                </span>
                <p className="text-sm font-semibold tracking-wide text-[#C9A86A]">
                  {project.duration}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
            {/* Role Breakdown */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F2EA] mb-3">
                My Role
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.role.map((r) => (
                  <span
                    key={r}
                    className="text-xs px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-[#A7A39A]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools Used */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F2EA] mb-3">
                Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded bg-[#C9A86A]/5 border border-[#C9A86A]/20 text-[#C9A86A]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex items-center justify-between border-t border-white/[0.06]">
            <button
              onClick={onClose}
              className="inline-flex items-center text-xs font-semibold tracking-[0.16em] uppercase text-[#A7A39A] hover:text-[#C9A86A] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              BACK TO WORK
            </button>

            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center text-xs font-semibold tracking-[0.16em] uppercase text-[#C9A86A] hover:text-[#E0C487] transition-colors"
            >
              DISCUSS SIMILAR PROJECT
              <Sparkles className="w-3.5 h-3.5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
