import './footer.css'
import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector, } from 'react-redux';
import { Howl, } from 'howler';
import { formatTime, handleImageError } from '../../utils/files';
import jsmediatags from 'jsmediatags-web';


const sound = new Howl({
  src: ['/CLOUDS.mp3'],
  html5: true,
  autoplay: false,
  loop: true,
  volume: 1,
  preload: true,

});
export const Footer = () => {

  const musicList = useSelector(state => state.musicList);
  const audioRef = useRef(null);
  const currentItem = useSelector((data) => data.currentPlay, shallowEqual);
  const [currentPlayName, setCurrentPlayName] = useState();
  const [artistName, setArtistName] = useState();
  const [audioPicture, setAudioPicture] = useState();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = musicList?.[currentTrackIndex];

  const handlePause = () => {
    audioRef?.current?.pause();
    setIsPlaying(false);
  };

  const handlePlay = () => {
    audioRef?.current?.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      sound.play();
    } else {
      sound.pause();
    }
  }, [isPlaying]);

  sound.on('play', () => {
    setIsPlaying(true);
  });

  sound.on('pause', () => {
    setIsPlaying(false);
  });

  sound.on('end', () => {
    setIsPlaying(false);
  });

  sound.on('seek', () => {
    setCurrentTime(sound.seek());
  });

  sound.on('load', () => {
    setDuration(sound.duration());
  });

  sound.on('stop', () => {
    setIsPlaying(false);
    setCurrentTime(0);
  });


  const [imageCover, setImageCover] = useState()
  useEffect(() => {
    if (!!currentItem) {
      if (Object.keys(currentItem).length !== 0) {

        jsmediatags.read(currentItem.file, {
          onSuccess: function (tag) {
            console.log("data")
            const picture = tag.tags.picture;
            const base64String = picture.data.reduce(
              (acc, byte) => acc + String.fromCharCode(byte),
              '',
            );
            const imageUrl = `data:${picture.format};base64,${window.btoa(
              base64String,
            )}`;
            setImageCover(imageUrl)
            const Name = tag.tags.title;
            const artist = tag.tags.artist;

            setCurrentPlayName(Name);
            setArtistName(artist);
            setAudioPicture(imageUrl);
            console.log(tag.tags);
            console.log(tag);
          },
          onError: function (error) {
            console.log(':(', error.type, error.info);
          },
        });
      }
    }

  }, [currentItem])




  return (
    <div className='footer-player'>
      {console.log("currentItem Img", currentItem)}
      <img
        src={imageCover}
        alt=""
        className="object-scale-down w-12 h-12 rounded-md bg-slate-200"
        onError={handleImageError}
      />

      <div>
        {isPlaying && (
          <div className="playing-song">
            Olay
            <audio src="" autoPlay={true} ref={audioRef} onEnded={handlePause} />
            <div className=" flex flex-row playing-song-details">
              {audioPicture && (
                <img
                  onError={handleImageError}
                  src={audioPicture}
                  className="ml-2 object-scale-down h-24 w-24 rounded-md"
                  alt="audio cover"
                />
              )}
              <div className="song-artist">
                {' '}
                <br />
                Artist name: {artistName}
              </div>
              <p>Now playing: {currentPlayName}</p>
              {currentPlayName && <p>Now playing: {currentPlayName}</p>}
            </div>
          </div>
        )}
      </div>
      <button onClick={() => sound.play()}>
        Play +
      </button>
      <button onClick={() => sound.pause()}>
        Pause -
      </button>
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
