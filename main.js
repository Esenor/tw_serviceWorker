window.alert(document.referrer)
// Check if serviceWorker is available
if (navigator.serviceWorker) {
  // Register the serviceWorker
  navigator.serviceWorker.register('./serviceWorker.js', {
    scope: '/tw_serviceWorker/'
  }).then((registration) => {
    //
  }).catch((error) => {
    console.log('error ', error)
  })
} else {
  console.log('ERROR: Service worker is not available with this navigator.')
}