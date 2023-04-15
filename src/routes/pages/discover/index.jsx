import React, { useEffect, useRef, useState } from 'react';
import './discover.css';
import onplay from '../../../assets/icons/onplay.png';
import jsmediatags from 'jsmediatags-web';
import { useDispatch } from 'react-redux';
import { setMusicList } from '../../../actions/actions';

const Discover = () => {
  const [files, setFiles] = useState([]);
  const [musicFiles, setMusicFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const musicExtensions = ['.mp3', '.flac', '.m4a'];
  const videoExtensions = ['.mp4', '.mkv', '.avi'];
  const [currentPlayName, setCurrentPlayName] = useState();
  const [dragOver, setDragOver] = useState(false);
  const [artistName, setArtistName] = useState();
  const [audioPicture, setAudioPicture] = useState();

  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);
    const newMusicFiles = newFiles.filter((file) => {
      return (
        !musicFiles.find((existingFile) => existingFile.name === file.name) &&
        musicExtensions.includes(file.name.substr(-4).toLowerCase())
      );
    });

    const updatedMusicList = [...musicFiles, ...newMusicFiles];

    setFiles([...files, ...newFiles]);
    setMusicFiles([...musicFiles, ...newMusicFiles]);

    dispatch(setMusicList(updatedMusicList));
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleChoose = (file) => {
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        const picture = tag.tags.picture;
        const base64String = picture.data.reduce(
          (acc, byte) => acc + String.fromCharCode(byte),
          '',
        );
        const imageUrl = `data:${picture.format};base64,${window.btoa(
          base64String,
        )}`;
        setCurrentPlayName(tag.tags.title);
        setArtistName(tag.tags.artist);
        setAudioPicture(imageUrl);
      },
      onError: function (error) {
        console.log(':(', error.type, error.info);
      },
    });
    handlePause();
    audioRef.current.src = URL.createObjectURL(file);
    handlePlay();
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (musicFiles.length > 0 && !audioRef) {
      audioRef.current.src = URL.createObjectURL(musicFiles[0]);
    }
    dispatch(setMusicList(musicFiles));
  }, [musicFiles]);

  const fixName = (name) => {
    return name
      .replace(
        new RegExp(
          [...musicExtensions, '320', '(1)', '(', ')', '()'].join('|'),
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
          <label for="file">
            Select file
            <p className="file-name"></p>
          </label>
        </div>
        <br />
        {musicFiles.length > 0 && <h2>Music Files:</h2>}
        <ul>
          {musicFiles.map((file, index) => (
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
                {currentPlayName === fixName(file.name) && (
                  <img src={onplay} alt="onplay" className="ml-2 mr-2" />
                )}
                <span
                  className={`${
                    currentPlayName === fixName(file.name) ? '' : 'ml-8'
                  }`}
                >
                  {index + 1} -{' '}
                </span>
                {fixName(file.name)}

                <img
                  src=""
                  alt=""
                  className="object-scale-down h-12 w-24 rounded-md"
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
                      onError: function (error) {
                        console.log('Error reading tags:', error);
                      },
                    });
                  }}
                />
              </button>
            </li>
          ))}
        </ul>
        {videoFiles.length > 0 && <h2>Video Files:</h2>}
        <ul>
          {videoFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>
      <br />
      {isPlaying && (
        <div className="playing-song">
          <audio src="" autoPlay={true} ref={audioRef} onEnded={handlePause} />
          <div className=" flex flex-row playing-song-details">
            {audioPicture && (
              <img
                src={audioPicture}
                className="ml-2 object-scale-down h-24 w-48 rounded-md"
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
      {musicFiles.length > 0 && <audio ref={audioRef} />}
      {musicFiles.length > 0 && (
        <div>
          <button onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Discover;
