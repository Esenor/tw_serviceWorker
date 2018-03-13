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

self.addEventListener('fetch', (event) => {
  console.log('fetch ', event.request.url)
  event.respodWith(caches.match(event.request).then((response) => {
    if (response !== undefined) {
      return response
    } else {
      return fetch(event.request).then((response) => {
        let responseCloned = response.clone()
        caches.open('v1').then((cache) => {
          cache.put(event.request, responseCloned)
        })
        return response
      })
    }
  }))
})