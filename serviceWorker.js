const CACHE_NAME = 'customcache'
const BASE_PATH = '/tw_serviceWorker'
/**
 * 
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        BASE_PATH + '/',
        BASE_PATH + '/index.html',
        BASE_PATH + '/offline.html',
        BASE_PATH + '/serviceWorker.js',
        BASE_PATH + '/main.js',
        BASE_PATH + '/main.css',
        BASE_PATH + '/main_offline.css'
      ])
    })
  )
})

/**
 * 
 */
self.addEventListener('fetch', (event) => {
  let slugUrl = event.request.url.replace(event.request.referrer, '')
  console.log('Fetch ', slugUrl, event.request)
  switch (slugUrl) {
    case 'main.css':
      if (navigator.onLine) {
        return getCacheOrRemoteRessource(event)
      } else {
        return event.respondWith(caches.match(BASE_PATH + '/main_offline.css').then((response) => {
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

function getCacheOrRemoteRessource(event, cacheName = CACHE_NAME) {
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