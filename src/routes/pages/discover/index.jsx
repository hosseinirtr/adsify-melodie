import React, { useEffect, useRef, useState } from 'react';
import './discover.css';
import onplay from '../../../assets/icons/onplay.png';
import jsmediatags from 'jsmediatags-web';
import { useDispatch } from 'react-redux';
import { setMusicList } from '../../../actions/musicActions';
import { setCurrentPlay } from '../../../actions/currentPlayActions';
import { handleImageError } from '../../../utils/files';
import { useSelector, shallowEqual } from 'react-redux';

const Discover = () => {
  const musics = useSelector((data) => data.musicList, shallowEqual);
  const video = useSelector((data) => data.videoList, shallowEqual);

  const musicExtensions = useSelector(
    (musicExtensions) => musicExtensions.extensions.musicExtensions,
    shallowEqual,
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const selectedRef = useRef(null);
  const [currentPlayName, setCurrentPlayName] = useState();
  const [dragOver, setDragOver] = useState(false);
  const [artistName, setArtistName] = useState();
  const [audioPicture, setAudioPicture] = useState();

  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    dispatch(setMusicList(event));
  };

  const handleChoose = (file) => {
    console.log('checkItem', file);
    dispatch(
      setCurrentPlay({
        file,
      }),
    );
  };

  useEffect(() => {
    if (musics?.length > 0 && !audioRef) {
      audioRef.current.src = URL.createObjectURL(musics[0]);
    }
  }, [musics]);

  const fixName = (name) => {
    return name
      .replace(
        new RegExp(
          [...musicExtensions, '320', '(1)', '( 1 )', '(', ')', '()'].join('|'),
          'g',
        ),
        '',
      )
      .replace(/[-_]/g, ' ');
  };

  const handleDrop = (event) => {
    console.log('event', event);
    event.preventDefault();
    setDragOver(false);
    handleFileSelect(event);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  return (
    <div onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}>
      <div className="banner">
        <div className="banner-badge">{`//`} TRENDING</div>
        <div className="quote">
          I can’t fall back, I came too far. Hold myself up, and love my scars.
        </div>
        <div className="quote-user"> - Linkin Park</div>
      </div>
      <div
        className={`user-song ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {' '}
        <br />
        <div className="file-input">
          <input
            type="file"
            webkitdirectory="true"
            directory="true"
            multiple={true}
            onChange={handleFileSelect}
            className="file custom-file-input"
            id="file"
          />
          <label htmlFor="file">
            Select file
            <p className="file-name"></p>
          </label>
        </div>
        <br />
        {musics?.length > 0 && <h2>Music Files:</h2>}
        <ul>
          {musics?.map((file, index) => (
            <li
              className={`song-list ${
                currentPlayName === fixName(file.name) ? 'onplay' : ''
              }`}
              key={file.name}
            >
              <button
                onClick={() => handleChoose(file)}
                className="song-item-btn flex items-center"
              >
                {currentPlayName === fixName(file.name) ? (
                  <img src={onplay} alt="onplay" className="ml-2 mr-2" />
                ) : (
                  <div className="ml-4 mr-4" />
                )}
                <img
                  src=""
                  alt=""
                  className="object-scale-down w-12 h-12 rounded-md"
                  onError={handleImageError}
                  ref={(img) => {
                    // Load the cover art for the current file
                    jsmediatags.read(file, {
                      onSuccess: function (tag) {
                        const picture = tag.tags.picture;
                        if (picture) {
                          const base64String = btoa(
                            String.fromCharCode(...picture.data),
                          );
                          img.src = `data:${picture.format};base64,${base64String}`;
                        }
                      },
                      // onError: function (error) {
                      //   console.log('Error reading tags:', error);
                      // },
                    });
                  }}
                />

                <span
                  className={`${
                    currentPlayName === fixName(file.name) ? '' : 'ml-8'
                  }`}
                >
                  {index + 1} -{' '}
                </span>
                {fixName(file.name)}
              </button>
            </li>
          ))}
        </ul>
        {video?.length > 0 && <h2>Video Files:</h2>}
        <ul>
          {video?.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>
      <br />
      {isPlaying && (
        <div className="playing-song">
          <div className=" flex flex-row playing-song-details">
            {audioPicture && (
              <img
                onError={handleImageError}
                src={audioPicture}
                className="ml-2 object-scale-down h-16 w-16 rounded-md"
                alt="audio cover"
              />
            )}
            {currentPlayName && (
              <div className="song-artist flex ">
                Artist name: {artistName}
                <br />
                <p>Now playing: {currentPlayName}</p>
                <br />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
