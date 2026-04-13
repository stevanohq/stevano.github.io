const CACHE_NAME = 'nexus-burn-serverless-v1';
const ASSETS = [
'./',
'./index.html',
'./manifest.json',
'./icon-192.png',
'./icon-512.png'
];
self.addEventListener('install', (e) => {
e.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
);
self.skipWaiting();
});
self.addEventListener('activate', (e) => {
e.waitUntil(
caches.keys().then((keys) => {
return Promise.all(
keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
);
})
);
self.clients.claim();
});
self.addEventListener('fetch', (e) => {
e.respondWith(
caches.match(e.request).then((res) => res || fetch(e.request))
);
});
