
// función que uso tanto en grupos como en Liga para ordenar los equipos
export const ordeno = (grup) => {
    // primero quién tiene más puntos
    let g=grup.sort((a,b)=>(a.puntos_totales < b.puntos_totales) 
                        ? 1 : (a.puntos_totales === b.puntos_totales) 
                            // Si tienen los mismos se mira quién tiene más diferentcia de goles
                            ?((a.diferencia<b.diferencia) 
                                ?1 :(a.diferencia === b.diferencia)
                                    // Si tienen los mismos se ordena por orden alfabético
                                    ?((a.nombre>b.nombre)?1 :-1 ) :-1):-1) 
    return g
}


