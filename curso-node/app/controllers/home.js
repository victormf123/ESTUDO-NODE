module.exports.index = function (application, req, res) {
  var connection = application.config.connMySQL();
  var noticiasDAO = new application.app.models.NoticiasDAO(connection);

  noticiasDAO.get5UltimasNoticias(function (error, result) {
    console.log(result);
    res.render('home/index', { noticias: result });
  });
};
