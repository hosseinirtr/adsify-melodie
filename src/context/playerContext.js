import { createContext } from "react";

export const PlayerContext = createContext({
  play: false,
  setPlaying: () => {},
  currentList: [],
  setCurrentList: () => {},
  onAddSong: () => {},
  onRemoveSong: () => {},
  onPlayedSong: () => {},
  previewSong: [],
  onUpdatePreviewSong: () => {},
  random: false,
  setRandom: () => {},
  songSearch: () => {},
});
