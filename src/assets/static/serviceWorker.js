console.debug('Service started...')

// importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', e => {
    console.debug('Service install')

    e.waitUntil(
        caches.open('inferno-cache').then(cache => {
            console.debug('Service cache')
            return cache.addAll([
                '/',
                '//cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.19.0/babel.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/mode/javascript/javascript.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.css',
                '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/neo.min.css'
            ]);
        })
    );
});

self.addEventListener('activate',  e => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
    console.debug(e.request.url);
    e.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
