if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(reg => console.log('PWA service-worker ready.', reg))
        .catch(err => console.error('Could not load service-worker.', err));
}
