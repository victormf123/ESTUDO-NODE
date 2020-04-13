/** importar as configurações do servidor */

var app = require('./config/server');

/** parametrizar a porta de escuta */
var server = app.listen(80, function () {
  console.log('Servidor online');
});

var io = require('socket.io').listen(server);
app.set('io', io);

/** criar a conecão por websocket */
io.on('connection', function (socket) {
  console.log('Usuario conectou');

  socket.on('disconnect', function () {
    console.log('Usuario desconectou');
  });

  /** dialogo */
  socket.on('msgParaServidor', function (data) {
    socket.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });

    socket.broadcast.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });

    /** participantes */
    if (parseInt(data.apelido_atualizado_dos_clientes) == 0) {
      socket.emit('paticipantesParaCliente', { apelido: data.apelido });

      socket.broadcast.emit('paticipantesParaCliente', {
        apelido: data.apelido,
      });
    }
  });
});
