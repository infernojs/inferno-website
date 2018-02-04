const CACHE_NAME = 'inferno-cache';
// importScripts('serviceworker-cache-polyfill.js');
/*
self.addEventListener('install', e => {
    function onCacheOpen(cache) {
        console.debug('Service cache')
        return cache.addAll([
            '//cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.19.0/babel.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/mode/javascript/javascript.min.js',
            '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.css',
            '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/neo.min.css'
        ]);
    }
    e.waitUntil(caches.open(CACHE_NAME).then(onCacheOpen));
});

self.addEventListener('activate',  e => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
    const isCDN = e.request.url.includes('://cdnjs');
    if (!isCDN) {
        return; // e.respondWith(fetch(e.request.url, { mode: 'no-cors' }));
    }

    e.respondWith(
        caches.match(e.request).then(response => {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            let fetchRequest = e.request.clone();

            return fetch(fetchRequest).then(function(response) {

                // Check if we received a valid response
                // Don't cache non-CDN requests
                const isInvalid = !response || response.status !== 200 || response.type !== 'basic';
                if (isInvalid) {
                    console.debug('Fetch: excluded', e.request.url)
                    return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                let responseToCache = response.clone();

                caches.open(CACHE_NAME)
                      .then(function(cache) {
                          cache.put(e.request, responseToCache);
                      });

                return response;
            });
        })
    );
});
*/
