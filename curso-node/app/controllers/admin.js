module.exports.formulario_inclusao_noticia = function (application, req, res) {
  res.render('admin/form_add_noticia', { validacao: {}, noticia: {} });
};
module.exports.noticias_salvar = function (application, req, res) {
  var noticia = req.body;

  req.assert('titulo', 'Título é obrigadorio').notEmpty();
  req.assert('resumo', 'Resumo é obrigadorio').notEmpty();
  req
    .assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres')
    .len(10, 100);
  req.assert('autor', 'Autor é obrigadorio').notEmpty();
  req
    .assert('data_noticia', 'Data é obrigadorio')
    .notEmpty()
    .isDate({ format: 'YYYY-MM-DD' });
  req.assert('noticia', 'Noticia é obrigadorio').notEmpty();

  var erros = req.validationErrors();

  if (erros) {
    res.render('admin/form_add_noticia', {
      validacao: erros,
      noticia: noticia,
    });
    return;
  }

  var connection = application.config.connMySQL();
  var noticiasDAO = new application.app.models.NoticiasDAO(connection);

  noticiasDAO.salvarNoticia(noticia, function (error, result) {
    res.redirect('/noticias');
  });
};
