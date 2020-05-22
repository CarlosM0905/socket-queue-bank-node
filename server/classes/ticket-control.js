
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        // Si sigue siendo el mismo dia
        // Pero capaz se cayo el sistema
        if(data.hoy === this.hoy){
            // Obtener el ultimo ticket generado
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }
        else{
            // Pero si es otro dia, es decir
            // ya paso al dia siguiente, reiniciar todo
            this.reiniciarConteo();
        }
    }

    siguiente(){
        this.ultimo += 1;

        // Crear un nuevo ticket
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        console.log(this.tickets)

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        
        this.ultimos4.unshift(atenderTicket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1); // Borra el ultimo
        }

        console.log('Ultimos', this.ultimos4)
        this.grabarArchivo()

        return atenderTicket;
    }

    reiniciarConteo(){
        this.ultimo = 0;
        console.log('Se ha inicializado el sistema')
        this.grabarArchivo();
        this.tickets = [];
        this.ultimos4 = [];
    }



    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}