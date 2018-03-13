// Check if serviceWorker is available
if (navigator.serviceWorker) {
  console.log('INFO: Service worker is available with this navigator.')
  // Register the serviceWorker
  navigator.serviceWorker.register('./serviceWorker.js', {
    scope: '/tw_serviceWorker/'
  }).then((registration) => {
    console.log('registration ', registration)
  }).catch((error) => {
    console.log('error ', error)
  })
} else {
  console.log('ERROR: Service worker is not available with this navigator.')
}