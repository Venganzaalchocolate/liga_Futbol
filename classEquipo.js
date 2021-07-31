import {equipos} from './equipos.js'

// Constructor de equipo
class Equipo {
    constructor (nombre) {
        this.nombre=nombre;
        this.golesM=0;
        this.golesR=0;
        this.puntos_totales=0;
        this.diferenciaT=0; 

        // No me gusta esto, no creo que deba estar aquí pero no se me ocurria otra forma para que se mostrará en pantalla con un console.table()
        this.goles_marcados=0;
        this.goles_recibidos=0;
        this.diferencia=0;

        // añadido de última hora para conseguir clasificar los grupos en la clase Liga
        this.grupo='';
    };

    // En un principio el constructor esto no era de esta manera, sino así:
        // constructor (nombre, puntuaciones={}) {
        //     this.nombre=nombre;
        //     this.config=this.puntuacion(puntuaciones) 
        // };
    
        // puntuacion(puntuaciones){
        //     const defaultconfig = {
        //         puntos_totales:0,
        //         golesM:0,
        //         golesR:0
        //     }
        //     return Object.assign(defaultconfig,puntuaciones)
        // }; 
    // Pero no conseguí hacer la tabla como querías que se mostrará en pantalla, así que lo cambié. 
    addGrupo(letra){
        this.grupo=letra;
    }

    addGolesMarcados(goles){
        // Esta función añade los goles marcados.
        this.golesM+=goles;

        // En tu tabla muestras los resultados de los goles marcados y recibidos de cada partido, no el total de goles de todas las jornadas, así que he creado una variable solo con los goles de marcados y recibidos de cada partido que se irán sobreescribiendo
        this.goles_marcados=goles;
    }

    addGolesRecibido(goles){
        // Esta función añade los goles recibidos.
        this.golesR+=goles;

        // // En tu tabla muestras los resultados de los goles marcados y recibidos de cada partido, no el total de goles de todas las jornadas, así que he creado una variable solo con los goles de marcados y recibidos de cada partido que se irán sobreescribiendo
        this.goles_recibidos=goles;
    }

    addDireferencia(goles){
        // Esta función añade la diferencia total.
        this.diferenciaT+=goles;

        // Añade la diferencia solo del partido
        this.diferencia=goles;
    }

    partidoJugado(gM,gR){
        // Esta función añade los goles y los puntos_totales si se gana o se empata (si pierde no hace falta porque es 0p)
        this.addGolesMarcados(gM);
        this.addGolesRecibido(gR);
        this.addDireferencia(gM-gR)
        if (gM>gR) {
            this.puntos_totales+=3;
        } else if (gR===gM){
            this.puntos_totales+=1;
        }
    }

    jugar(equipoContrario){
        // Como su nombre indica es una función que hace "jugar" a los equipos, el limite de goles lo he establecido en 10. 
        let tusGoles= Math.round(Math.random()*6);
        let susGoles= Math.round(Math.random()*6);

        // Apunta los resultados del primer equipo
        this.partidoJugado(tusGoles,susGoles);

        // Apunta los resultados del equipo contrario
        equipoContrario.partidoJugado(susGoles,tusGoles);

        // Lo añadí a posteriori para poder saber quién era el ganador 
        let quienGanador = () => {
            let diferencia = tusGoles-susGoles; 
            if( diferencia < 0 ) {
                console.log(`${this.nombre} ${tusGoles} - ${susGoles} ${equipoContrario.nombre} => ${equipoContrario.nombre}`)
                return equipoContrario}
            else if (diferencia === 0 ) {return this.jugar(equipoContrario)}
            else {
                console.log(`${this.nombre} ${tusGoles} - ${susGoles} ${equipoContrario.nombre} => ${this.nombre}`)
                return this} }

        let ganador = quienGanador();
    return ganador
    }

};

// Función que crea los equipos
const creaEquipos = (equipos) =>{
    let clasEquipos=[];

    equipos.forEach(element => {
    element = new Equipo(`${element}`)
    clasEquipos.push(element)
    });
    return clasEquipos
}


export const equiposFutbol=creaEquipos(equipos);
