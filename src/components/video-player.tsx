"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, RotateCw } from "lucide-react"

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function VideoPlayer({
  src,
  poster,
  title,
}: {
  src: string
  poster?: string
  title?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }, [])

  const skip = useCallback((seconds: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.min(Math.max(v.currentTime + seconds, 0), v.duration || 0)
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleVolumeChange = (value: number) => {
    const v = videoRef.current
    if (!v) return
    v.volume = value
    v.muted = value === 0
    setVolume(value)
    setMuted(value === 0)
  }

  const handleSeek = (value: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = value
    setCurrentTime(value)
  }

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) el.requestFullscreen?.()
    else document.exitFullscreen?.()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onTimeUpdate = () => setCurrentTime(v.currentTime)
    const onLoadedMetadata = () => setDuration(v.duration || 0)
    const onVolume = () => {
      setVolume(v.volume)
      setMuted(v.muted)
    }

    v.addEventListener("play", onPlay)
    v.addEventListener("pause", onPause)
    v.addEventListener("timeupdate", onTimeUpdate)
    v.addEventListener("loadedmetadata", onLoadedMetadata)
    v.addEventListener("volumechange", onVolume)
    v.addEventListener("ended", onPause)

    return () => {
      v.removeEventListener("play", onPlay)
      v.removeEventListener("pause", onPause)
      v.removeEventListener("timeupdate", onTimeUpdate)
      v.removeEventListener("loadedmetadata", onLoadedMetadata)
      v.removeEventListener("volumechange", onVolume)
      v.removeEventListener("ended", onPause)
    }
  }, [])

  useEffect(() => {
    const onFsChange = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", onFsChange)
    return () => document.removeEventListener("fullscreenchange", onFsChange)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!containerRef.current) return
      const active = document.activeElement
      const withinPlayer = active === document.body || containerRef.current.contains(active)
      if (!withinPlayer) return

      if (e.key === " " || e.key.toLowerCase() === "k") {
        e.preventDefault()
        togglePlay()
      } else if (e.key === "ArrowRight") {
        skip(10)
      } else if (e.key === "ArrowLeft") {
        skip(-10)
      } else if (e.key.toLowerCase() === "m") {
        toggleMute()
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [togglePlay, skip, toggleMute, toggleFullscreen])

  const wakeControls = useCallback(() => {
    setShowControls(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowControls(false)
    }, 2500)
  }, [])

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={wakeControls}
      onMouseLeave={() => playing && setShowControls(false)}
      className="group/player relative aspect-video w-full overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={title}
        className="h-full w-full object-contain"
        onClick={togglePlay}
        playsInline
      />

      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/20"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform hover:scale-105">
            <Play className="ml-1 h-6 w-6" fill="currentColor" />
          </span>
        </button>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-2 pt-8 transition-opacity duration-300 sm:px-4 ${
          showControls || !playing ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={(e) => handleSeek(Number(e.target.value))}
          style={{ accentColor: "#fff" }}
          className="h-1 w-full cursor-pointer"
          aria-label="Seek"
        />

        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="rounded-full p-2 text-white hover:bg-white/10"
            >
              {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="h-4 w-4" fill="currentColor" />}
            </button>
            <button
              type="button"
              onClick={() => skip(-10)}
              aria-label="Back 10 seconds"
              className="rounded-full p-2 text-white hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => skip(10)}
              aria-label="Forward 10 seconds"
              className="rounded-full p-2 text-white hover:bg-white/10"
            >
              <RotateCw className="h-4 w-4" />
            </button>
            <span className="ml-1 hidden font-mono text-xs text-white/80 sm:inline">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="rounded-full p-2 text-white hover:bg-white/10"
            >
              {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              style={{ accentColor: "#fff" }}
              className="hidden h-1 w-16 cursor-pointer sm:block"
              aria-label="Volume"
            />
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
              className="rounded-full p-2 text-white hover:bg-white/10"
            >
              {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}