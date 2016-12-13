console.debug('Service started...')

// importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', e => {
    console.debug('Service install')

    function onCacheOpen(cache) {
        console.debug('Service cache')
        return cache.addAll([
            '/',
            '//cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.19.0/babel.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/mode/javascript/javascript.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.css',
            '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/neo.min.css'
        ]);
    }

    e.waitUntil(caches.open('inferno-cache').then(onCacheOpen));
});

self.addEventListener('activate',  e => {
    console.debug('activate');
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
    console.debug('fetch:', e.request.url);
    e.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
