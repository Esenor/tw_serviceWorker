self.addEventListener('install', (event) => {
  console.log('install event ', event)
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/tw_serviceWorker/',
        '/tw_serviceWorker/index.html'
      ])
    })
  )
})

self.addEventListener('activate', (event) => {
  console.log('activate event ', event)
})

self.addEventListener('fetch', (event) => {
  console.log('fetch ', event.request.url)
})