self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('date-app').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './cards.js',
        './cardsWhoKnows.js', // ✅ הוספנו רק כאן
        './script.js',
        './script-who-knows-turns.js', // אולי גם את זה
        './style.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request);
    })
  );
});