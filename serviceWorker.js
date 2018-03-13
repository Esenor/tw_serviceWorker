/**
 * 
 */
self.addEventListener('install', (event) => {
  console.log('install event ', event)
  event.waitUntil(
    caches.open('customcache').then((cache) => {
      return cache.addAll([
        '/tw_serviceWorker/',
        '/tw_serviceWorker/index.html',
        '/tw_serviceWorker/offline.html',
        '/tw_serviceWorker/serviceWorker.js',
        '/tw_serviceWorker/main.js',
        '/tw_serviceWorker/main.css',
        '/tw_serviceWorker/main_offline.css'
      ])
    })
  )
})

/**
 * 
 */
self.addEventListener('fetch', (event) => {
  console.log('fetch ', event.request)
  
  event.respondWith(caches.match(event.request).then((response) => {
    if (response !== undefined) {
      console.log(response)
      return response
    } else {
      return fetch(event.request).then((response) => {
        let responseCloned = response.clone()
        caches.open('customcache').then((cache) => {
          cache.put(event.request, responseCloned)
        })
        return response
      })
    }
  }))
})