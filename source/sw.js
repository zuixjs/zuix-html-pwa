self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('app-cache').then(cache =>
        {
            return cache.addAll([
                'index.html',
                'index.css',
                'index.js',
                'sw.js'
            ])
        })
    )
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
