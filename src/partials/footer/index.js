import './footer.css'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Howl, Howler } from 'howler';
import { formatTime } from '../../utils/files';


export const Footer = () => {
  const musicList = useSelector(state => state.musicList);

  const cur = useSelector((data) => data.currentPlay, shallowEqual);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const currentTrack = musicList?.[currentTrackIndex];

  console.log(currentTrackIndex)


  const sound = new Howl({
    src: [cur?.src],
    html5: true,
    // onplay: () => setIsPlaying(true),
    // onpause: () => setIsPlaying(false),
    // onend: () => handleEnd(),
    onend: function () {
      console.log('Finished!');
    },
    onload: () => setDuration(sound.duration()),
    onseek: () => setCurrentTime(sound.seek()),
  });
  sound.once('load', function () {
    sound.play();
  });

  // Fires when the sound finishes playing.
  sound.on('end', function () {
    console.log('Finished!');
  });

  console.log(sound.duration())

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
    console.log("handel End")
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

    sound.duration()
    sound.play();
    setIsPlaying(true);
    return null
    // }
  };


  const handlePause = () => {
    // if (isPlaying) {
    sound.pause();
    setIsPlaying(false);
    console.log('pause')
    //   return null
  }




  console.log('The sound is', sound.playing(), ' and isPlaying is', isPlaying)
  // console.log("112", sound.play())


  return (
    <div>
      <button onClick={isPlaying ? handlePause : handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>


      <div>{currentTrack?.name}</div>
      <div>{ }
        {formatTime(currentTime)}
      </div>
      <div>{ }
        {formatTime(duration)}
      </div>
    </div >
  );
};
