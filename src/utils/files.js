import defaultImage from '../assets/noCoverImg.jpg';

export const handleImageError = (event) => {
  event.target.onerror = null; // Prevent infinite loop
  event.target.src = defaultImage; // Replace broken image with default image
};

export const handleImageErrorWithNull = (event) => {
  event.target.onerror = null;
  event.target.src = '';
};

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
}