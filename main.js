// Check if serviceWorker is available
if (navigator.serviceWorker) {
  // Register the serviceWorker
  navigator.serviceWorker.register('./serviceWorker.js', {
    scope: '/tw_serviceWorker/'
  }).then((registration) => {
    console.log(registration)
  }).catch((error) => {
    console.error(error)
  })
} else {
  console.error('Service worker is not available with this navigator.')
  window.alert('Service worker is not available with this navigator.')
}