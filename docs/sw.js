self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('app-cache').then(cache =>
        {
            return cache.addAll([
                'service-worker.js',
                'app.bundle.js',
                'index.html',
                'index.css',
                'index.js'
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
