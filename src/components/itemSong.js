import React from 'react'

export default function ItemSong({file}) {
  return (
    <div>  <li
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
  </li></div>
  )
}
