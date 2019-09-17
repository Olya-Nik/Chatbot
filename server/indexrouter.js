const express = require('express');
let router = express.Router();
const path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser');

router.get('/', (req, res)=>{
    res.send("hi")
}
)


router.get('/chatbot', async (req, res)=> {
    const resp = await fetch('https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.init', {
      method: 'POST',
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({"uuid": "772c9859-4dd3-4a0d-b87d-d76b9f43cfa4"})
      
    });
    const json = await resp.json()
    const cuid = json.result.cuid
    console.log(cuid)
    res.json({cuid: cuid})
})

router.post('/request', async (req, res) => {
    console.log(req.body)
    const resp2 = await fetch('https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.request', {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({cuid: req.body.cuid, text: req.body.text})     
    });
    const json = await resp2.json()
    const bot = json.result.text.value
    const id = json.result.id
    
    res.json({bot: bot, id: id})
})

module.exports = router;