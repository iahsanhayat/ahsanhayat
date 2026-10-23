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
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((cur / dur) * 100);
      setCurrentTime(formatTime(cur));
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
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
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " " && e.target === document.body) {
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

  // Auto-hide controls when playing and inactive
  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

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
        } bg-[#111111] border border-white/[0.08] rounded-lg shadow-2xl overflow-hidden my-auto`}
      >
        {/* Top bar with project tag and close button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-[#0E0E0E]">
          <div className="flex items-center space-x-3">
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
            className="text-[#A7A39A] hover:text-[#F5F2EA] p-1.5 rounded hover:bg-white/[0.05] transition-colors"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Canvas */}
        <div
          className={`relative bg-black flex items-center justify-center ${
            isVertical ? "aspect-[9/16] max-h-[75vh]" : "aspect-[16/9]"
          } overflow-hidden cursor-pointer group`}
          onClick={handlePlayPause}
        >
          <video
            ref={videoRef}
            src={project.video}
            poster={project.thumbnail}
            preload="metadata"
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          />

          {/* Large Center Play Overlay (when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none transition-opacity">
              <div className="w-20 h-20 rounded-full bg-[#C9A86A] text-[#0B0B0B] flex items-center justify-center pl-1 shadow-2xl transform scale-100 group-hover:scale-105 transition-transform duration-300">
                <Play className="w-8 h-8 fill-current" />
              </div>
            </div>
          )}

          {/* Minimal Custom Control Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent transition-opacity duration-300 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Timeline Progress Slider */}
            <div className="relative mb-3 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C9A86A] hover:h-1.5 transition-all"
                aria-label="Video progress timeline"
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-xs text-[#F5F2EA]">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePlayPause}
                  className="p-1 hover:text-[#C9A86A] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>

                <div className="text-[11px] font-mono tracking-wider text-[#A7A39A]">
                  {currentTime} / {duration}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Volume & Mute */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={toggleMute}
                    className="p-1 hover:text-[#C9A86A] transition-colors"
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
                    className="w-16 h-1 bg-white/20 rounded appearance-none cursor-pointer accent-[#C9A86A]"
                    aria-label="Volume slider"
                  />
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1 hover:text-[#C9A86A] transition-colors"
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
