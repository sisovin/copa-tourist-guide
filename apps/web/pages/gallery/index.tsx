import React from 'react';
import Image from 'next/image';

const Gallery = () => {
  const images = [
    { id: 1, src: '/images/gallery1.jpg', alt: 'Gallery Image 1' },
    { id: 2, src: '/images/gallery2.jpg', alt: 'Gallery Image 2' },
    { id: 3, src: '/images/gallery3.jpg', alt: 'Gallery Image 3' },
  ];

  return (
    <div className="gallery">
      {images.map((image) => (
        <div key={image.id} className="gallery-item">
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={500}
            quality={75}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
