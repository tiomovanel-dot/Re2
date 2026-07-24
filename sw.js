const CACHE = 'tinygpt-shell-v4';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './weights-part0.js',
  './weights-part1.js',
  './weights-part2.js',
  './weights-part3.js',
  './weights-part4.js',
  './weights-part5.js',
  './weights-part6.js',
  './weights-part7.js',
  './weights-part8.js',
  './weights-part9.js',
  './weights-part10.js',
  './weights-part11.js',
  './weights-part12.js',
  './weights-part13.js',
  './weights-part14.js',
  './weights-part15.js',
  './weights-part16.js',
  './weights-part17.js',
  './weights-part18.js',
  './weights-part19.js',
  './weights-part20.js',
  './weights-part21.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request))
  );
});
