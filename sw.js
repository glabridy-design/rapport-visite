const CACHE_NAME = 'chantier-v1';
const ASSETS = [
  './index.html',
  './manifest.json'
];

// Installation : Mise en cache des fichiers principaux
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// Stratégie : Réseau d'abord, sinon Cache (pour avoir toujours la dernière version si connecté)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});