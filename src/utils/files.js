import defaultImage from '../assets/noCoverImg.jpg';

export const handleImageError = (event) => {
  event.target.onerror = null; // Prevent infinite loop
  event.target.src = defaultImage; // Replace broken image with default image
};

export const handleImageErrorWithNull = (event) => {
  event.target.onerror = null;
  event.target.src = '';
};