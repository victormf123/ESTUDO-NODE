function UsuariosDAO(connection) {
  this.__connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
  console.log(usuario);
  this.__connection.open(function (err, mongoclient) {
    mongoclient.collection('usuarios', function (err, collection) {
      collection.insert(usuario);

      mongoclient.close();
    });
  });
};

UsuariosDAO.prototype.autenticar = function (usuario, req, res) {
  // console.log(usuario);
  this.__connection.open(function (err, mongoclient) {
    mongoclient.collection('usuarios', function (err, collection) {
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
