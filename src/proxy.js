var express = require('express'),
    request = require('request');

var app = express();  

const proxy = '/api/v1/wwos/items/50FAFDB1-29E0-4FB5-876B-1B1ABF298068/descendants?sortBy=displayDateTime&limit=50&sections=&tags=&hasMedia=true&templates=Article,Gallery'

// Forward all requests from /api to http://foo.com/api
app.use('/api', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.pipe(request('http://content.api.ninemsn.com.au' + req.url)).pipe(res);
});

app.listen(process.env.PORT || 3004);