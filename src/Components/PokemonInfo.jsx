import React from 'react'

const PokemonInfo = ({ data }) => {
    console.log('data', data);
    return (
        <>

            {
                (!data) ? '' :
                    (
                        <>
                            <h2>{data.name}</h2>
                            <div className="image">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                            </div>
                            
                            <div className="abilities">
                            <h2 >Abilities</h2>
                                {
                                    data.abilities.map((poke) => {
                                        return (
                                            <>
                                                
                                                <div className="group">
                                                    
                                                    <h2>
                                                        {poke.ability.name}
                                                    </h2>
                                                </div>
                                            </>
                                        )
                                    })
                                }


                            </div>

                            <div className="base-state">
                            <h2>Stat</h2>
                                {
                                    data.stats.map((poke)=>{
                                         return (
                                            <>
                                                <h3>{poke.stat.name} : {poke.base_stat}</h3>
                                            </>
                                         )
                                    })
                                }
                            </div>

                        </>
                    )
            }

        </>
    )
}

export default PokemonInfo