var socket = io();

var label = $('#lblNuevoTicket');

// Cuando un usario se conecta al servidor
socket.on('connect', function(){
    console.log('Conectado al servidor');
})
// Cuando se pierde la conexion al servidor
socket.on('disconnect', function(){
    console.log('Se perdio la conexion con el servidor')
})

// Cuando el servidor emite el evento estado actual
socket.on('estadoActual', function(resp) {
    label.text(resp.actual)
});

// Cuando el usuario de click a cualquier boton de la pantalla
$('button').on('click', function(){
    console.log('Click')

    // El cliente emite el evento sigiente ticket al servidor
    socket.emit('SiguienteTicket', 
    {
        message: 'Necesito el siguiente ticket'
    },
    // Lo recibe y lo establece en el label
    function(siguienteTicket){
        label.text(siguienteTicket)
        
    })
})