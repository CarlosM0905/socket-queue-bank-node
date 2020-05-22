var socket = io();
var label = $('small');

// Cuando un usario se conecta al servidor
socket.on('connect', function () {
    console.log('Conectado al servidor');
})
// Cuando se pierde la conexion al servidor
socket.on('disconnect', function () {
    console.log('Se perdio la conexion con el servidor')
})

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', function () {
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
        // console.log(resp);
        if(resp === 'No hay tickets'){
            alert(resp);
        }
        else{
            label.text(`Ticket ${resp.numero}`)
        }
    })
})