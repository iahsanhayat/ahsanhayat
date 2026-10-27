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
  Loader2,
} from "lucide-react";
import { Project } from "@/data/portfolioData";
import { useTheme } from "@/components/ThemeProvider";

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
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
  const [needsTapToUnmute, setNeedsTapToUnmute] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bufferingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const centerIconTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Entrance animation
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsEntering(false);
      });
    });
  }, []);

  // Lock background scroll while player is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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

  // Smooth exit: animate out then call onClose
  const handleExit = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (isExiting) return;
      setIsExiting(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setTimeout(() => {
        onClose();
      }, 350);
    },
    [onClose, isExiting]
  );

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    if (v.paused) {
      if (needsTapToUnmute) {
        v.muted = false;
        setIsMuted(false);
        setNeedsTapToUnmute(false);
      }
      v.play()
        .then(() => {
          setIsPlaying(true);
          triggerCenterIcon("play");
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      v.pause();
      setIsPlaying(false);
      triggerCenterIcon("pause");
    }
  }, [needsTapToUnmute]);

  const handleUnmute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setIsMuted(false);
    setNeedsTapToUnmute(false);
  };

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
      if (val > 0) setNeedsTapToUnmute(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) setNeedsTapToUnmute(false);
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

  // Keyboard: Escape closes, space/k toggles play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "Backspace" || e.key === "Escape") {
        e.preventDefault();
        handleExit();
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
  }, [handleExit, handlePlayPause]);

  // Controls auto-hide
  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Smooth playback engine: preload and autoplay
  useEffect(() => {
    setIsPlaying(false);
    setIsBuffering(true);
    setIsVideoReady(false);
    setProgress(0);
    setBufferedPercent(0);
    setCurrentTime("0:00");
    setDuration("0:00");
    setNeedsTapToUnmute(false);

    if (!videoRef.current) return;
    const video = videoRef.current;
    video.currentTime = 0;

    // Wait until enough data is buffered before attempting play
    const onCanPlay = () => {
      setIsVideoReady(true);
      setIsBuffering(false);

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false);
          })
          .catch(() => {
            // Autoplay blocked — start muted
            video.muted = true;
            setIsMuted(true);
            setNeedsTapToUnmute(true);
            video
              .play()
              .then(() => {
                setIsPlaying(true);
                setIsBuffering(false);
              })
              .catch(() => {
                setIsPlaying(false);
                setIsBuffering(false);
              });
          });
      }
    };

    video.addEventListener("canplay", onCanPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      if (centerIconTimerRef.current) clearTimeout(centerIconTimerRef.current);
    };
  }, [project?.id]);

  // Scroll to player on mount
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  if (!project) return null;

  const isVertical = project.aspectRatio === "9:16";

  return (
    <div
      ref={wrapperRef}
      className={`fixed inset-0 z-50 overflow-y-auto overscroll-contain transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isEntering || isExiting ? "opacity-0 scale-[0.97]" : "opacity-100 scale-100"
      }`}
      style={{
        backgroundColor: isLight ? "rgba(250,248,245,0.96)" : "rgba(11,11,11,0.96)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
      onClick={handleExit}
    >
      {/* Close Button — Fixed Top Right */}
      <button
        onClick={handleExit}
        type="button"
        className={`fixed top-3 right-3 sm:top-5 sm:right-5 z-[60] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none ${
          isLight
            ? "bg-white/90 hover:bg-white text-[#151412] border border-black/10 shadow-md"
            : "bg-black/70 hover:bg-black/90 text-[#F5F2EA] border border-white/15 shadow-lg"
        } backdrop-blur-md`}
        aria-label="Close video"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetControlsTimer}
        onTouchStart={resetControlsTimer}
        className={`relative flex min-h-full ${
          isVertical
            ? "flex-col lg:flex-row items-center justify-start lg:justify-center gap-4 sm:gap-6 lg:gap-10"
            : "flex-col items-center justify-start sm:justify-center gap-4 sm:gap-6"
        } w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-14 sm:py-12`}
      >
        {/* ====================================================================
            VIDEO PLAYER — Clean, no mockup, inline
           ==================================================================== */}
        <div
          className={`relative shrink-0 w-full ${
            isVertical
              ? "max-w-[280px] sm:max-w-[340px] lg:max-w-[380px]"
              : "max-w-[960px]"
          } rounded-lg sm:rounded-xl overflow-hidden shadow-2xl ${
            isLight
              ? "shadow-black/15 ring-1 ring-black/10"
              : "shadow-black/60 ring-1 ring-white/10"
          } group cursor-pointer select-none`}
          onClick={handlePlayPause}
        >
          {/* Video Aspect Container */}
          <div
            className={`relative w-full ${
              isVertical ? "aspect-[9/16]" : "aspect-video"
            } bg-black`}
          >
            {/* Video Element */}
            <video
              key={project.id}
              ref={videoRef}
              src={project.video}
              poster={project.thumbnail}
              autoPlay
              playsInline
              preload="auto"
              onPlay={() => {
                setIsPlaying(true);
                setIsBuffering(false);
              }}
              onPause={() => setIsPlaying(false)}
              onPlaying={() => {
                setIsBuffering(false);
                setIsPlaying(true);
              }}
              onLoadedData={() => {
                setIsVideoReady(true);
                setIsBuffering(false);
              }}
              onCanPlay={() => {
                setIsVideoReady(true);
                setIsBuffering(false);
              }}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onProgress={updateBuffered}
              onWaiting={() => {
                if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
                bufferingTimerRef.current = setTimeout(() => {
                  if (videoRef.current && !videoRef.current.paused) {
                    setIsBuffering(true);
                  }
                }, 200);
              }}
              onSeeked={() => {
                if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
                setIsBuffering(false);
              }}
              onEnded={() => {
                setIsPlaying(false);
                setIsBuffering(false);
                setShowControls(true);
              }}
              className={`absolute inset-0 w-full h-full ${
                isVertical ? "object-cover" : "object-contain"
              } bg-black transition-opacity duration-300 ${
                isVideoReady ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Premium Buffering / Loading Spinner */}
            {(isBuffering || !isVideoReady) && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30">
                <div className="relative flex items-center justify-center">
                  {/* Outer pulsing ring */}
                  <div
                    className="absolute w-20 h-20 rounded-full border-2 border-[#C9A86A] video-buffer-pulse"
                  />
                  {/* Spinning loader */}
                  <Loader2
                    className="w-10 h-10 text-[#C9A86A] video-buffer-spin"
                  />
                </div>
              </div>
            )}

            {/* Tap to Unmute Banner */}
            {needsTapToUnmute && (
              <button
                onClick={handleUnmute}
                type="button"
                className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-[#C9A86A] text-black font-bold text-xs tracking-wider shadow-lg flex items-center space-x-2 hover:bg-[#E0C487] transition-colors"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>TAP FOR SOUND</span>
              </button>
            )}

            {/* Center Play/Pause Quick Feedback */}
            {showCenterIcon && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div
                  className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm text-[#C9A86A] flex items-center justify-center border border-[#C9A86A]/30 video-center-icon-pop"
                >
                  {showCenterIcon === "play" ? (
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  ) : (
                    <Pause className="w-7 h-7 fill-current" />
                  )}
                </div>
              </div>
            )}

            {/* Center Play Overlay when Paused */}
            {!isPlaying && !isBuffering && isVideoReady && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-200">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C9A86A] text-black flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(201,168,106,0.4)] transform group-hover:scale-105 transition-transform duration-300">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                </div>
              </div>
            )}

            {/* Video Controls Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className={`absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 pt-8 sm:pt-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 transition-opacity duration-300 ${
                showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Timeline Progress */}
              <div className="relative mb-1.5 sm:mb-2.5 flex items-center group/timeline">
                {/* Buffer bar */}
                <div className="absolute left-0 right-0 h-1 bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/25 rounded-full transition-all duration-200"
                    style={{ width: `${bufferedPercent}%` }}
                  />
                </div>
                {/* Progress bar */}
                <div className="absolute left-0 right-0 h-1 rounded-full overflow-hidden pointer-events-none">
                  <div
                    className="h-full bg-[#C9A86A] rounded-full"
                    style={{
                      width: `${progress}%`,
                      transition: isScrubbing ? "none" : "width 0.15s linear",
                    }}
                  />
                </div>
                {/* Thumb dot */}
                <div
                  className="absolute h-3 w-3 rounded-full bg-[#C9A86A] shadow-md pointer-events-none z-10 opacity-0 group-hover/timeline:opacity-100 transition-opacity duration-200"
                  style={{
                    left: `calc(${progress}% - 6px)`,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeekInput}
                  onMouseDown={() => setIsScrubbing(true)}
                  onMouseUp={handleSeekCommit}
                  onTouchEnd={handleSeekCommit}
                  className="relative w-full h-5 opacity-0 cursor-pointer z-10"
                  aria-label="Seek video progress"
                />
              </div>

              {/* Control Actions */}
              <div className="flex items-center justify-between text-white text-[10px] sm:text-xs">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    onClick={handlePlayPause}
                    className="text-white hover:text-[#C9A86A] transition-colors p-0.5 sm:p-1 cursor-pointer"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current" />
                    )}
                  </button>

                  <span className="text-[10px] sm:text-[11px] font-mono text-white/80 tabular-nums">
                    {currentTime} / {duration}
                  </span>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                  {/* Volume Slider Group */}
                  <div className="hidden sm:flex items-center space-x-1.5 group/vol">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-[#C9A86A] transition-colors p-1 cursor-pointer"
                      aria-label={isMuted ? "Unmute" : "Mute"}
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
                      className="w-16 h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-[#C9A86A] opacity-0 group-hover/vol:opacity-100 transition-opacity duration-200"
                      aria-label="Volume"
                      style={{
                        background: `linear-gradient(to right, #C9A86A ${
                          (isMuted ? 0 : volume) * 100
                        }%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`,
                      }}
                    />
                  </div>

                  {/* Mobile Mute Toggle */}
                  <button
                    onClick={toggleMute}
                    className="sm:hidden text-white hover:text-[#C9A86A] transition-colors p-1 cursor-pointer"
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
                    className="text-white hover:text-[#C9A86A] transition-colors p-1 cursor-pointer"
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
            </div>
          </div>
        </div>

        {/* ====================================================================
            PROJECT INFORMATION CARD
           ==================================================================== */}
        <div
          className={`flex-1 w-full ${
            isLight
              ? "bg-white/95 border-black/[0.08] text-[#151412] shadow-xl"
              : "bg-[#141413]/95 border-white/10 text-[#F5F2EA] shadow-2xl"
          } border rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-7 backdrop-blur-xl text-left space-y-3 sm:space-y-5 ${
            isVertical ? "max-w-[280px] sm:max-w-md lg:max-w-lg" : "max-w-[960px]"
          } transition-colors duration-300`}
        >
          {/* Header & Category */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center space-x-2.5">
              <span className={`w-2 h-2 rounded-full ${isLight ? "bg-[#9C7428]" : "bg-[#C9A86A]"}`} />
              <span
                className={`text-[11px] font-bold tracking-[0.2em] ${
                  isLight ? "text-[#9C7428]" : "text-[#C9A86A]"
                } uppercase`}
              >
                {project.category}
              </span>
            </div>

            {project.isClientProject && (
              <span
                className={`text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                  isLight
                    ? "bg-[#9C7428]/10 text-[#9C7428] border border-[#9C7428]/25"
                    : "bg-[#C9A86A]/15 text-[#E0C487] border border-[#C9A86A]/30"
                }`}
              >
                Client Project
              </span>
            )}
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              {project.title}
            </h3>
            <p className={`text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed ${isLight ? "text-[#57544C]" : "text-[#A7A39A]"}`}>
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Duration & Format */}
          <div
            className={`grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t ${
              isLight ? "border-black/[0.08]" : "border-white/10"
            } text-xs`}
          >
            <div>
              <span className={`text-[10px] uppercase tracking-widest ${isLight ? "text-[#827E74]" : "text-[#77736C]"}`}>
                Duration
              </span>
              <p className="font-semibold mt-0.5">{project.duration || "N/A"}</p>
            </div>
            <div>
              <span className={`text-[10px] uppercase tracking-widest ${isLight ? "text-[#827E74]" : "text-[#77736C]"}`}>
                Format
              </span>
              <p className="font-semibold mt-0.5">
                {isVertical ? "Vertical (9:16 Mobile)" : "Widescreen (16:9)"}
              </p>
            </div>
          </div>

          {/* Tools Used */}
          <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
            <span className={`text-[10px] uppercase tracking-widest ${isLight ? "text-[#827E74]" : "text-[#77736C]"}`}>
              Tools Used
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className={`text-xs px-2.5 py-1 rounded-md ${
                    isLight
                      ? "bg-[#FAF8F5] border border-black/[0.08] text-[#9C7428]"
                      : "bg-white/5 border border-white/10 text-[#C9A86A]"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div
            className={`pt-3 sm:pt-4 flex items-center justify-between border-t ${
              isLight ? "border-black/[0.08]" : "border-white/10"
            }`}
          >
            <button
              onClick={handleExit}
              className={`text-xs font-semibold tracking-wider uppercase ${
                isLight ? "text-[#57544C] hover:text-[#151412]" : "text-[#A7A39A] hover:text-[#C9A86A]"
              } transition-colors cursor-pointer`}
            >
              ← Back to site
            </button>

            <a
              href="#contact"
              onClick={handleExit}
              className={`inline-flex items-center text-xs font-bold tracking-wider uppercase ${
                isLight ? "text-[#9C7428] hover:text-[#7C5A18]" : "text-[#C9A86A] hover:text-[#E0C487]"
              } transition-colors`}
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
