export const setMusicList = (event) => (dispatch, getState) => {
  const { musicList, videoList, extensions } = getState();
  const newFiles = Array.from(event.target.files);

  console.log("first", extensions.musicExtensions);

  const completedMusic = ([
    ...musicList,
    ...newFiles.filter((file) => {
      if (Array.isArray(musicList)) {
        return (
          !musicList.find((existingFile) => existingFile.name === file.name) &&
          extensions.musicExtensions.includes(file.name.substr(-4).toLowerCase())
        );
      } else {
        return extensions.musicExtensions.includes(file.name.substr(-4).toLowerCase());
      }
    }),
  ]);

  const completedVideo = ([
    ...videoList,
    ...newFiles.filter((file) => {
      return (
        !videoList.find((existingFile) => existingFile.name === file.name) &&
        extensions.videoExtensions.includes(file.name.substr(-4).toLowerCase())
      );
    }),
  ]);

  console.log("old list", musicList, videoList);
  console.log("completedMusic", completedMusic, completedVideo);
  dispatch({ type: 'SET_MUSIC_LIST', payload: completedMusic });
  // dispatch({ type: 'SET_VIDEO_LIST', payload: completedVideo });
};
