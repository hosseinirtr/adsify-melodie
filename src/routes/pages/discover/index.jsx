import React, { useEffect, useRef, useState } from "react";
import "./discover.css";
import onplay from "../../../assets/icons/onplay.png";

const Discover = () => {
  const [files, setFiles] = useState([]);
  const [musicFiles, setMusicFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const musicExtensions = [".mp3", ".flac", ".m4a"];
  const videoExtensions = [".mp4", ".mkv", ".avi"];
  const [currentPlayName, setCurrentPlayName] = useState();
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (event) => {
    console.log("event", event);
    const newFiles = Array.from(event.target.files);
    console.log("newFiles", newFiles);

    setFiles([...files, ...newFiles]);

    setMusicFiles([
      ...musicFiles,
      ...newFiles.filter((file) => {
        return (
          !musicFiles.find((existingFile) => existingFile.name === file.name) &&
          musicExtensions.includes(file.name.substr(-4).toLowerCase())
        );
      }),
    ]);

    console.log(
      "files",
      newFiles.filter((file) => {
        return (
          !musicFiles.find((existingFile) => existingFile.name === file.name) &&
          musicExtensions.includes(file.name.substr(-4).toLowerCase())
        );
      })
    );

    setVideoFiles([
      ...videoFiles,
      ...newFiles.filter((file) => {
        return (
          !videoFiles.find((existingFile) => existingFile.name === file.name) &&
          videoExtensions.includes(file.name.substr(-4).toLowerCase())
        );
      }),
    ]);
  };

  const handleChoose = (file) => {
    setCurrentPlayName(fixName(file?.name));
    handlePause();
    audioRef.current.src = URL.createObjectURL(file);
    handlePlay();
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (musicFiles.length > 0 && !audioRef) {
      audioRef.current.src = URL.createObjectURL(musicFiles[0]);
    }
  }, [musicFiles]);

  const fixName = (name) => {
    return name
      .replace(
        new RegExp(
          [...musicExtensions, "320", "(1)", "(", ")", "()"].join("|"),
          "g"
        ),
        ""
      )
      .replace(/[-_]/g, " ");
  };

  const handleDrop = (event) => {
    console.log("event", event);
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
        className={`user-song ${dragOver ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {" "}
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
                currentPlayName === fixName(file.name) ? "onplay" : ""
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
                    currentPlayName === fixName(file.name) ? "" : "ml-8"
                  }`}
                >
                  {index + 1} -{" "}
                </span>
                {fixName(file.name)}
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
          <div className="playing-song-details">
            <div className="song-name">{currentPlayName}</div>
            <div className="song-artist">Artist Name</div>
          </div>
        </div>
      )}

      {musicFiles.length > 0 && <audio ref={audioRef} />}
      {musicFiles.length > 0 && (
        <div>
          {currentPlayName && <p>Now playing: {currentPlayName}</p>}
          <button onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Discover;
