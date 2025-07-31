// worker.js  — injects API URL into the HTML
import html from './index.html';   // Wrangler can import static files

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve the main page with the placeholder replaced
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(
        html.replace('__API__', env.VITE_API_BASE),
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    // Everything else (CSS, JS, images) comes from the static bundle
    return env.ASSETS.fetch(request);
  }
};
