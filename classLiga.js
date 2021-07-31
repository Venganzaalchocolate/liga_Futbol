import {grupitos} from './classGrupo.js'
import {ordeno} from './funciones.js'   

class Liga {
    constructor (nombre, grupitos) {
        this.nombre=nombre;
        this.grupitos=grupitos;
        this.participantes = [];
    }

    addparticipantes (participantes) {
        this.participantes=participantes;
    }

    clasificar = () => {
        let locales=[]
        let visitantes=[]
        
        let segundos=[]
        let terceros=[]

        // Clasifico los equipos por los locales, segundos y terceros clasificados
        for (let i= 0; i < this.grupitos.length; i++) {
            const grup = this.grupitos[i].equipos;
            let grupitoOrdenado= ordeno(grup)
        
        // Los meto en sus respectivos arrays y luego los vuelvo a ordenar por puntaciones. 
            locales.push(grupitoOrdenado[0])
            ordeno(locales)
            segundos.push(grupitoOrdenado[1])
            ordeno(segundos)
            terceros.push(grupitoOrdenado[2])
            ordeno(terceros)
        }

        //Le doy la vuelta al array para seguir el orden establecido en la práctica. Q1-Q6
        locales.reverse();
        //let segundosCopy = [...segundos]

        // Cogemos los dos equipos de segundos que coinciden con la letra de terceros que esta en la pisición 4 y 5 es decir los que no se clasifican. 
        segundos.forEach(x=>{
            if (x.grupo===terceros[4].grupo || x.grupo===terceros[5].grupo){
                // Los meto en locales ya tenemos a Q7 y Q8
                locales.push(x)
            }
        })

        // filtro los elementos para que solo me queden 4 segundos restantes
        let segundosCuatro = segundos.filter(equipo => equipo !== locales[6] & equipo !== locales[7])
        
        //Elimino a los terceros que no se clasifican
        terceros.pop();
        terceros.pop();

        // evito las repeticiones de grupo (con terceros) y los meto en el array de visitantes
        for (let index = 0; visitantes.length<4; index++) {
            terceros.find(elemento=> {
                // busco en el array terceros un equipo que no sea del grupo locales[index] y que no este todavía en el array visitantes
                if (elemento.grupo !== locales[index].grupo && visitantes.includes(elemento)===false)
                {
                    visitantes.push(elemento)
                }
            })
        }
        
        // evito las repeticiones de grupo (con segundosCuatro) y los meto en el array de visitantes
        for (let index = 4; visitantes.length<8; index++) {
            segundosCuatro.find(elemento=> {
                if (elemento.grupo !== locales[index].grupo && visitantes.includes(elemento)===false)
                {
                    visitantes.push(elemento)
                }
            })
        }

        // junto el array locales con visitantes
        let participantes=locales.concat(visitantes)

        // lo añado a la liga
        this.addparticipantes(participantes)

    }

    playoff () {
        this.clasificar();
        this.mostrarPantalla();
        let participantes=this.participantes
        

        let jugarPlayoff= (participantes, nombre) =>{
            let lista=[]
            console.log(
`
-----------JUGANDO ${nombre}-----------
`)

                // Puse una condición para poder jugar el tercer y cuarto puesto, se crea una copia de lista, se juega cuartos, se compara con la copia y se extrae los dos participantes. Entonces se juega con esos dos
            if (participantes.length===4){
                let listaControl = [...participantes]
                for (let index = 0; index < participantes.length/2; index++) {
                    lista.push(participantes[index].jugar(participantes[(index+(participantes.length/2))]));
                }
                let tercerCuarto=listaControl.filter(el => !lista.includes(el))
                
                console.log(
`
-----------JUGANDO TERCER Y CUARTO PUESTO-----------
`
                )
                tercerCuarto[0].jugar(tercerCuarto[1]);

                // Se juega las playoff. Si solo quedan dos participantes se muestra al ganador de una forma especial      
            } else if (participantes.length===2) 
                { let ganador=(participantes[0].jugar(participantes[1])); 
                console.log(`
==========================================
¡${ganador.nombre} campeon de la EURO!
==========================================`)} 
                // Se juega las playoff cogiendo el primer y octavo (ya que se juntaron los dos arrays)
            else {
                for (let index = 0; index < participantes.length/2; index++) {
                    lista.push(participantes[index].jugar(participantes[(index+(participantes.length/2))]));
                    }
                }

            return lista
        }
        
        let octavos = jugarPlayoff(participantes, 'OCTAVOS')
        let cuartos = jugarPlayoff(octavos, 'CUARTOS')
        let semifinales = jugarPlayoff(cuartos, 'SEMIFINALES')
        let final = jugarPlayoff(semifinales, 'FINAL')

        return final


    };

    mostrarPantalla () {
        console.log (
`===============================================
==== COMIENZO DE LA FASE DE ELIMINATORIAS =====
===============================================`
        )

    }
}

export const eurocopa= new Liga('Eurocopa', grupitos);