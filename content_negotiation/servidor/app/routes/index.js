module.exports = function(application){
	application.get('/', function(req, res){
		res.format({
			html: function(){
				res.send('Bem vindo a sua app NodeJS!');
			},
			json: function(){
				var retorno = {
					body: 'Bem vindo a sua app NodeJS!'
				}
				res.json(retorno)
			},
		})
	});
	application.get('/teste_erro_500', function(req, res){
		res.render('xyz')
	});
	application.post('/', function(req, res){
		var dados = req.body;
		res.send(dados)
	});
}