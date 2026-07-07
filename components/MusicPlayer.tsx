"use client";

import { useRef, useState } from "react";


interface MusicPlayerProps {
  src: string;
  title?: string;
  artist?: string;
}

export default function MusicPlayer({
  src,
  title = "My Playlist",
  artist = "Background Music",
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (err) {
        console.error("Audio play error:", err);
      }
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || isDragging) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio * 100);
    setCurrentTime(ratio * audio.duration);
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Equalizer bar heights animation
  const bars = [3, 5, 4, 6, 3, 5, 4];

  return (
    <div className="music-player-wrapper">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      />

      <div className="music-player-card">
        {/* Left: Play Button */}
        <button
          id="music-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className={`music-play-btn ${isPlaying ? "music-play-btn--playing" : ""}`}
        >
          {/* Ripple ring when playing */}
          {isPlaying && <span className="music-ripple" />}

          {isPlaying ? (
            /* Pause icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1.5" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            /* Play icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.514.857l11-6.86a1 1 0 0 0 0-1.714l-11-6.86A1 1 0 0 0 8 5.14z" />
            </svg>
          )}
        </button>

        {/* Middle: Info + Progress */}
        <div className="music-info">
          <div className="music-meta">
            <span className="music-title">{title}</span>
            <span className="music-artist">{artist}</span>
          </div>

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="music-progress-track"
            onClick={seek}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={(e) => { setIsDragging(false); seek(e); }}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={(e) => { setIsDragging(false); seek(e); }}
            role="slider"
            aria-label="Seek music"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="music-progress-fill" style={{ width: `${progress}%` }}>
              <span className="music-progress-thumb" />
            </div>
          </div>

          {/* Time */}
          <div className="music-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Equalizer bars */}
        <div className="music-eq" aria-hidden="true">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`music-eq-bar ${isPlaying ? "music-eq-bar--active" : ""}`}
              style={{
                animationDelay: `${i * 0.13}s`,
                height: `${h * 3}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
