import {equiposFutbol} from './classEquipo.js'
import {ordeno} from './funciones.js'

// Contructor de Grupo
class Grupo {
    constructor(nombre, equipoCuatro=[]) {
        this.nombre=nombre;
        this.equipos=equipoCuatro;
    }

    // luchar es mandar a los equipos de cada grupo a jugar
    luchar(jornada){
        console.log(
`
Grupo ${this.nombre} - Jornada ${jornada}
----------------------`)

        switch (jornada) {
            case 1:
                // con los equipos correspondientes ejecutamos el método de equipo para que jueguen
                this.equipos[0].jugar(this.equipos[3]);
                this.equipos[1].jugar(this.equipos[2]);

                //Mostrar por tantalla la tabla de puntuaciones de ese Grupo. Jornada 1
                ordeno(this.equipos)
                console.table(this.equipos, ['nombre','puntos_totales', 'goles_marcados', 'goles_recibidos', 'diferencia'])
                break;
            case 2:
                this.equipos[3].jugar(this.equipos[2]);
                this.equipos[0].jugar(this.equipos[1]);

                //Mostrar por tantalla la tabla de puntuaciones de ese Grupo. Jornada 2
                ordeno(this.equipos)
                console.table(this.equipos, ['nombre','puntos_totales', 'goles_marcados', 'goles_recibidos', 'diferencia'])
                break;
            case 3:
                this.equipos[1].jugar(this.equipos[3]);
                this.equipos[2].jugar(this.equipos[0]);

                //Mostrar por tantalla la tabla de puntuaciones de ese Grupo. Jornada 3
                ordeno(this.equipos)
                console.table(this.equipos, ['nombre','puntos_totales', 'goles_marcados', 'goles_recibidos', 'diferencia'])
                break;
        }
        



    }

    // Muestra en pantalla la planificación de las jornadas, es meramente informativo. Lo he hecho así para que saliera exactamente igual que en el ejercicio de muestra.
    showplanificar(){
        console.log(`
Grupo ${this.nombre}
---------------------
${this.equipos[0].nombre}
${this.equipos[1].nombre}
${this.equipos[2].nombre}
${this.equipos[3].nombre}
        
Jornada 1:
- ${this.equipos[0].nombre} vs ${this.equipos[3].nombre}
- ${this.equipos[1].nombre} vs ${this.equipos[2].nombre}

Jornada 2:
- ${this.equipos[3].nombre} vs ${this.equipos[2].nombre}
- ${this.equipos[0].nombre} vs ${this.equipos[1].nombre}

Jornada 3:
- ${this.equipos[1].nombre} vs ${this.equipos[3].nombre}
- ${this.equipos[2].nombre} vs ${this.equipos[0].nombre}

`)
    }

    nombregrupo(letra){
        this.equipos[0].addGrupo(letra)
        this.equipos[1].addGrupo(letra)
        this.equipos[2].addGrupo(letra)
        this.equipos[3].addGrupo(letra)
    }


    
}


// Función que crea los grupos con los equipos que se han creado
const creaGrupos=(equiposFutbol) => {
    equiposFutbol.sort(function() { return Math.random() - 0.5 });
    const grupos=[];
    const nombresG= ['A', 'B', 'C', 'D', 'E', 'F']
    for (let index = 0; index < 6; index++) {
        let grupo= new Grupo(nombresG[index], equiposFutbol.slice(4*index,4*index+4));
        grupos.push(grupo);
    } 
    return grupos
}



// función que muestra en pantalla toda la planificación de cada grupo
const mostrarPantalla= (grupitos) => {
    console.log(`
===============================================
============== GRUPOS Y EQUIPOS ===============
===============================================`)
    // Grupos y orden de las jornadas
    for (let index = 0; index < 6; index++) {
        grupitos[index].showplanificar()
        ;
    }
    console.log(`
===============================================
============== COMIENZA LA EUROCOPA ===========
===============================================`)    
}

//función que desencadena la fase de grupos
const faseGrupos = (grupitos) =>{
    for (let index = 1; index < 4; index++) {
        grupitos.forEach(equipo=>
            {equipo.luchar(index)
            equipo.nombregrupo(equipo.nombre)});
    } 
}

// Función que crea ejecuta la fase de grupos en su totalidad
const exFaseGrupos = (equiposFutbol) => {
    const grupitos=creaGrupos(equiposFutbol);
    mostrarPantalla(grupitos);
    faseGrupos(grupitos);
    return grupitos
}; 

export const grupitos = exFaseGrupos(equiposFutbol)

