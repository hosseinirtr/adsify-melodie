import './footer.css'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Howl, Howler } from 'howler';


export const Footer = () => {
  const musicList = useSelector(state => state.musicList);
  const current = useSelector(state => state.currentPlay);

  const cur = useSelector((data) => data.currentPlay, shallowEqual);
  console.log('cur-footer', cur);



  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);


  console.log('current', current.file)


  const currentTrack = musicList?.[currentTrackIndex];

  const sound = new Howl({
    src: [cur?.file?.url],
    html5: true,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => handleEnd(),
    onload: () => setDuration(sound.duration()),
    onseek: () => setCurrentTime(sound.seek()),
  });

  console.log("sound", sound, '\n', [currentTrack?.url], '\n', currentTrack)


  useEffect(() => {
    if (musicList && musicList?.length > 0) {
      sound.unload();
      sound.load();
      if (isPlaying) {
        sound.play();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => setCurrentTime(sound.seek()), 1000);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying]);

  const handleEnd = () => {
    if (!loop) {
      if (currentTrackIndex === (musicList?.length ?? 0) - 1) {
        setIsPlaying(false);
      } else {
        setCurrentTrackIndex(currentTrackIndex + 1);
      }
    } else {
      sound.seek(0);
      sound.play();
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
  };

  const handlePrev = () => {
    if (currentTrackIndex === 0) {
      setCurrentTrackIndex((musicList?.length ?? 0) - 1);
    } else {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentTrackIndex === (musicList?.length ?? 0) - 1) {
      setCurrentTrackIndex(0);
    } else {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const handleLoop = () => {
    setLoop(!loop);
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
  };

  return (
    <div>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleLoop}>{loop ? 'Disable Loop' : 'Enable Loop'}</button>
      <button onClick={handleShuffle}>{shuffle ? 'Disable Shuffle' : 'Enable Shuffle'}</button>
      <div>{currentTrack?.name}</div>
      <div>{currentTime}</div>
      <div>{duration}</div>
    </div>
  );
};
