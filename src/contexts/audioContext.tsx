"use client";

import { createContext, useState } from "react";

export type AudioContextType = {
  isPlaying: boolean;
  handlePlaying: () => void;
};

export const AudioContext = createContext<AudioContextType | null>(null);

const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  return <AudioContext.Provider value={{ isPlaying, handlePlaying }}>{children}</AudioContext.Provider>;
};

export default AudioProvider;
