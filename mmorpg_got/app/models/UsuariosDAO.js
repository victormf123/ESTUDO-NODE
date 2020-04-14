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

module.exports = function () {
  return UsuariosDAO;
};
