console.warn('service worker')

// importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
    console.warn('service worker')

    e.waitUntil(caches.open('airhorner').then(function(cache) {
        console.warn('service caches')
        return cache.addAll([
            '/',
            'https://unpkg.com/babel-standalone@6/babel.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/mode/javascript/javascript.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/neo.min.css'
        ]);
    }));
});
