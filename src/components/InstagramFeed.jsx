import { useEffect } from 'react';
import { CONFIG } from '../config';

import pieceGoldenBreath from '../assets/artwork/piece-golden-breath.jpg';
import pieceManifestation from '../assets/artwork/piece-manifestation.jpg';
import pieceGoldLeaf from '../assets/artwork/piece-gold-leaf.jpg';

const PROFILE_URL = `https://www.instagram.com/${CONFIG.INSTAGRAM_USERNAME}/`;
const EMBED_SCRIPT = 'https://www.instagram.com/embed.js';

// Curated fallback shown until real post URLs are configured — keeps the section
// on-brand (matches the dark theme) and never empty.
const FALLBACK = [pieceGoldenBreath, pieceManifestation, pieceGoldLeaf];

// Move a tile's spotlight to follow the cursor (matches the rest of the site).
const handleSpotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

// Render the official Instagram embed cards for a list of public post URLs.
function PostEmbeds({ posts }) {
  useEffect(() => {
    const process = () => window.instgrm?.Embeds?.process();
    if (window.instgrm) {
      process();
      return;
    }
    let script = document.getElementById('instagram-embed-script');
    if (!script) {
      script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = EMBED_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', process);
    return () => script.removeEventListener('load', process);
  }, [posts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center">
      {posts.map((url) => (
        <blockquote
          key={url}
          className="instagram-media w-full"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ margin: 0, maxWidth: 540, minWidth: 0, width: '100%' }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            View this post on Instagram
          </a>
        </blockquote>
      ))}
    </div>
  );
}

export default function InstagramFeed() {
  const posts = CONFIG.INSTAGRAM_POSTS;

  if (posts && posts.length) {
    return <PostEmbeds posts={posts} />;
  }

  // Curated fallback grid.
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-7">
      {FALLBACK.map((img, i) => (
        <a
          key={i}
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleSpotlight}
          className="specimen group relative overflow-hidden aspect-square"
        >
          <img src={img} alt="Recent work on Instagram" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-[3]">
            <span className="material-symbols-outlined text-gold text-3xl">photo_camera</span>
          </div>
        </a>
      ))}
    </div>
  );
}
