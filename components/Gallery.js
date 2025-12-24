"use client";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch("/api/images")
      .then(res => res.json())
      .then(data => {
        const imgs = (data.images || []).map(name => ({
          src: `/images/${name}`,
          name
        }));

        let loaded = 0;
        imgs.forEach(img => {
          const i = new Image();
          i.src = img.src;
          i.onload = () => {
            loaded++;
            if (loaded === imgs.length) {
              setImages(imgs);
              setReady(true);
            }
          };
        });
      });
  }, []);

  return (
    <section className="gallery">
      <h2 className="gallery-title">Photos</h2>

      {!ready && (
        <div className="grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton" />
          ))}
        </div>
      )}

      {ready && (
        <div className="grid zoom-in">
          {images.map((img, i) => (
            <img
              key={img.name}
              src={img.src}
              alt={img.name}
              className="thumb"
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}

      {active !== null && (
        <div className="lightbox">
          <button className="close" onClick={() => setActive(null)}>✕</button>

          <button
            className="nav left"
            onClick={() => setActive((active - 1 + images.length) % images.length)}
          >
            ‹
          </button>

          <img
            src={images[active].src}
            alt=""
            className="big-img"
          />

          <button
            className="nav right"
            onClick={() => setActive((active + 1) % images.length)}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
