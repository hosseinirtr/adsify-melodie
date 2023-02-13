import React, { useEffect, useRef, useState } from "react";

const Discover = () => {
  const [files, setFiles] = useState([]);
  const [musicFiles, setMusicFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);
    console.log("newFiles", newFiles);

    setFiles([...files, ...newFiles]);

    const musicExtensions = [".mp3", ".flac", ".m4a"];
    const videoExtensions = [".mp4", ".mkv", ".avi"];

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
    handlePause();
    audioRef.current.src = URL.createObjectURL(file);
    handlePlay();
  };
  if (audioRef?.current?.src) {
    console.log(audioRef, audioRef?.current?.src);
  }
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

  return (
    <>
      <div>
        <input
          type="file"
          id="folderInput"
          webkitdirectory="true"
          directory="true"
          multiple={true}
          onChange={handleFileSelect}
        />
        <h2>Music Files:</h2>
        <ul>
          {musicFiles.map((file) => (
            <li className="song-list" key={file.name}>
              {" "}
              <button onClick={() => handleChoose(file)} className="">
                {file.name}
              </button>
            </li>
          ))}
        </ul>
        <h2>Video Files:</h2>
        <ul>
          {videoFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>
      {musicFiles.length > 0 && <audio ref={audioRef} />}
      {musicFiles.length > 0 && (
        <div>
          <p>Now playing: {musicFiles[0].name}</p>
          <button onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </>
  );
};

export default Discover;
