import { CONFIG } from '../config';

/**
 * Facebook Page Plugin (timeline tab) embedded as an iframe — no FB SDK needed.
 * Only works for a public Facebook Page. Framed to sit cleanly in the dark theme;
 * the plugin's internal chrome is rendered by Facebook and can't be re-themed.
 */
export default function FacebookTimeline() {
  const src =
    'https://www.facebook.com/plugins/page.php' +
    `?href=${encodeURIComponent(CONFIG.FACEBOOK_URL)}` +
    '&tabs=timeline&width=500&height=640' +
    '&small_header=true&hide_cover=false&show_facepile=false&adapt_container_width=true';

  return (
    <div className="border border-line bg-ink-2/60 p-2 w-full max-w-[500px] mx-auto overflow-hidden">
      <iframe
        title="Shaarts on Facebook"
        src={src}
        width="500"
        height="640"
        loading="lazy"
        scrolling="no"
        frameBorder="0"
        allow="encrypted-media; clipboard-write; web-share"
        className="w-full"
        style={{ border: 'none', overflow: 'hidden', colorScheme: 'light' }}
      />
    </div>
  );
}
