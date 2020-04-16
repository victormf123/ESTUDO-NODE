/** importar o módulo do crypto */
var crypto = require('crypto')
function UsuariosDAO(connection) {
  this.__connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
  //console.log(usuario);
  this.__connection.open(function (err, mongoclient) {
    mongoclient.collection('usuarios', function (err, collection) {
      var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest("hex");
      usuario.senha = senha_criptografada;
      collection.insert(usuario);

      mongoclient.close();
    });
  });
};

UsuariosDAO.prototype.autenticar = function (usuario, req, res) {
  this.__connection.open(function (err, mongoclient) {
    mongoclient.collection('usuarios', function (err, collection) {
      var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest("hex");
      usuario.senha = senha_criptografada;
      collection.find(usuario).toArray(function (err, result) {
        if (result[0] != undefined) {
          req.session.autorizado = true;

          req.session.usuario = result[0].usuario;
          req.session.casa = result[0].casa;
        }
        if (req.session.autorizado) {
          res.redirect('jogo');
        } else {
          res.render('index', { validacao: {} });
        }
      });
      mongoclient.close();
    });
  });
};

module.exports = function () {
  return UsuariosDAO;
};
