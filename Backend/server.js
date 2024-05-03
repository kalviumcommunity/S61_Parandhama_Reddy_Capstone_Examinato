const express = require('express')
const app = express()
const port = 8000

app.use(express.json())
app.get('/recieve', (req, res) => {
  res.send('This is get request')
})

app.post('/send',(req,res)=>{
    res.send(req.body)
})

app.listen(port,()=>{
    console.log(`app is listening at http://localhost:${port}`);
})


module.exports = app