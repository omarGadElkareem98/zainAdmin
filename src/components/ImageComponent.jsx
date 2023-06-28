import React from 'react';

const ImageComponent = ({ base64Image }) => {
  return (
      <img src={`data:image/png;base64, ${base64Image}`} alt="Base64"
        style={{ width: '50px', height: '50px' }} />
  );
};

export default ImageComponent;