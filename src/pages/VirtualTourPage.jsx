// src/pages/VirtualTourPage.jsx

import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const formatTime = (sec) => {
  if (isNaN(sec)) return "00:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const VirtualTourPage = () => {
  const URL = "http://localhost:5000";
  const location = useLocation();
  const navigate = useNavigate();

  const videoUrl = location.state?.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4";

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Play/Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  // Update progress and duration on video metadata loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setDuration(video.duration);
    const onTimeUpdate = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    };
    const onEnded = () => setPlaying(false);

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  // Seek handler
  const onSeek = (e) => {
    if (!videoRef.current) return;
    const seekTo = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTo;
    setProgress(e.target.value);
  };

  // Volume control
  const onVolumeChange = (e) => {
    if (!videoRef.current) return;
    const vol = parseFloat(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
    setMuted(vol === 0);
  };

  // Mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  // Playback speed change
  const onPlaybackRateChange = (e) => {
    const rate = parseFloat(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 text-center">
          <p className="text-red-500">No video URL provided.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-semibold mb-8 text-blue-700">Virtual Tour</h1>

      <div className="relative w-full max-w-5xl bg-black rounded-lg shadow-lg select-none">
        <video
          ref={videoRef}
          src={videoUrl}
          className="rounded-t-lg w-full"
          preload="metadata"
        />

        {/* Controls */}
        <div className="bg-blue-900 bg-opacity-90 p-4 flex flex-col gap-2 rounded-b-lg">
          {/* Progress + time */}
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={onSeek}
              className="flex-grow cursor-pointer h-1 rounded bg-blue-700 accent-blue-400"
              aria-label="Video progress"
              title="Seek video"
            />
            <span className="text-white text-sm font-mono min-w-[60px] tabular-nums">
              {formatTime((progress / 100) * duration)} / {formatTime(duration)}
            </span>
          </div>

          {/* Buttons row */}
          <div className="flex items-center justify-between text-white">
            {/* Left buttons */}
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                title={playing ? "Pause" : "Play"}
                className="hover:text-blue-400 transition"
              >
                {playing ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="none"
                  >
                    <path d="M5 3v18l15-9L5 3z" />
                  </svg>
                )}
              </button>

              {/* Mute */}
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                title={muted ? "Unmute" : "Mute"}
                className="hover:text-blue-400 transition"
              >
                {muted || volume === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5v14l12-7L9 5zM5 9h2v6H5V9z"
                      fill="none"
                    />
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth={2} />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5v14l12-7L9 5z" />
                  </svg>
                )}
              </button>

              {/* Volume slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={onVolumeChange}
                className="w-24 cursor-pointer h-1 rounded bg-blue-700 accent-blue-400"
                aria-label="Volume control"
                title="Volume"
              />
            </div>

            {/* Playback speed */}
            <div className="flex items-center gap-2">
              <label htmlFor="playbackRate" className="text-sm text-blue-300">
                Speed:
              </label>
              <select
                id="playbackRate"
                value={playbackRate}
                onChange={onPlaybackRateChange}
                className="bg-blue-800 text-white rounded px-2 py-1 text-sm cursor-pointer hover:bg-blue-700 transition"
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
              title="Fullscreen"
              className="hover:text-blue-400 transition"
            >
              {fullscreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-16h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Tours
      </button>
    </div>
  );
};

export default VirtualTourPage;
