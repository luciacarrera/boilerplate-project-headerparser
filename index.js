// index.js
// where your node app starts

// init project
require('dotenv').config();
const fs = require('fs')
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));



let whoami= "??"

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  const ipaddress  = req.ip
  const language = req.headers["accept-language"]        
  const software = req.headers["user-agent"]        
  whoami = {ipaddress, language, software}
  console.log(whoami)
  res.json(whoami);
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  const absolutePath = __dirname +'/views/index.html'
  fs.readFile(absolutePath, 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        res.status(500).send('Error reading the HTML file.');
        return;
    }

    // Replace the {{name}} placeholder with the dynamic variable
    const result = data.replace('{{whoami}}', JSON.stringify(whoami));

    // Send the modified HTML content as the response
    res.send(result);
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
