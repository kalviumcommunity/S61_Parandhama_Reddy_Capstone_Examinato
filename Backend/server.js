const express = require('express')
const app = express()
const port = 8000

app.get('/recieve', (req, res) => {
  res.send('This is get request')
})

app.listen(port,()=>{
    console.log(`app is listening at http://localhost:${port}`);
})


module.exports = app