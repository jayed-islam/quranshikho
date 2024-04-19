/* eslint-disable react-hooks/exhaustive-deps */
// AudioPlayer.tsx
import React, { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  audioUrl: string;
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  onTimeUpdate: (currentTime: number) => void;
  onDurationChange: (duration: number) => void;
  onAudioEnd: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  isPlaying,
  onPlayPauseClick,
  onTimeUpdate,
  onDurationChange,
  audioRef,
  onAudioEnd,
}) => {
  const handleTimeUpdate = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const target = e.target as HTMLAudioElement;
    onTimeUpdate(target.currentTime);
  };

  const handleDurationChange = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const target = e.target as HTMLAudioElement;
    onDurationChange(target.duration);
  };

  //   useEffect(() => {
  //     if (audioRef.current) {
  //       if (isPlaying) {
  //         audioRef.current.play();
  //       } else {
  //         audioRef.current.pause();
  //       }
  //     }
  //   }, [audioRef, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      //   if (isPlaying) {
      //     audioRef.current.play();
      //   } else {
      //     audioRef.current.pause();
      //   }

      // Listen for the 'ended' event
      audioRef.current.addEventListener("ended", onAudioEnd);
    }

    return () => {
      // Cleanup the event listener
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", onAudioEnd);
      }
    };
  }, [audioRef, isPlaying, onAudioEnd]);

  return (
    <audio
      ref={audioRef}
      autoPlay={isPlaying}
      src={audioUrl}
      onTimeUpdate={handleTimeUpdate}
      onDurationChange={handleDurationChange}
    ></audio>
  );
};

export default AudioPlayer;
