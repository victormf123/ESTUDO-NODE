var app = require('./config/server');
//Modo de carregar sem o Consign
// var rotaNoticias = require('./app/routes/noticias')(app);
// var rotaHome = require('./app/routes/home')(app);
// var rotaformulario = require('./app/routes/formulario_inclusao_noticia')(app);

app.listen(3000, function () {
  console.log('SERVER ON');
});
