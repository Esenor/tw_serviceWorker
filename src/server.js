const express = require('express')
const path = require('path')

let application = express()

application.use(express.static('static'))

application.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'view', 'index.html'))
})

application.listen(8042, function () {
  console.log('Starting server on 8042')
})
