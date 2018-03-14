/**
 * 
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('customcache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/serviceWorker.js',
        '/main.js',
        '/main.css',
        '/main_offline.css'
      ])
    })
  )
})

/**
 * 
 */
self.addEventListener('fetch', (event) => {
  console.log('Fetch ', event.request)
  let slugUrl = event.request.url.replace(event.request.referrer, '')

  switch (slugUrl) {
    case 'main.css':
      if (navigator.onLine) {
        return getCacheOrRemoteRessource(event)
      } else {
        return event.respondWith(caches.match('/main_offline.css').then((response) => {
          if (response !== undefined) {
            return response
          }
        }))
      }
      break
    default:
      return getCacheOrRemoteRessource(event)
      break
  }

})

function getCacheOrRemoteRessource(event, cacheName = 'customCache') {
  return event.respondWith(caches.match(event.request).then((response) => {
    if (response !== undefined) {
      // Value in cache
      return response
    } else {
      // Value not in cache
      return fetch(event.request).then((response) => {
        let responseCloned = response.clone()
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, responseCloned)
        })
        return response
      })
    }
  }))
}