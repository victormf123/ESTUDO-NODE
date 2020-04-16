var http = require('http');

var test = {
  hostname: 'localhost',
  port: 80,
  path: '/teste',
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
}

var opcoes_post = {
  hostname: 'localhost',
  port: 80,
  path: '/',
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
}
var opcoes_get = {
  hostname: 'localhost',
  port: 80,
  path: '/',
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
}

/** Content-trype */

/** var html = 'nome=José'; // x-www-form-urlencoded
var json = {nome: 'José'}
var string_json = JSON.stringify(json)*/

var buffer_corpo_response = []
var req = http.request(opcoes_get, function(res){
  res.on('data', function(pedaco){
    buffer_corpo_response.push(pedaco)
  })
  res.on('end', function(){
    var corpo_response = Buffer.concat(buffer_corpo_response).toString()
    console.log(corpo_response)
    
  })

  res.on('error', function(){
    
  })
})

//req.write(string_json)
req.end();