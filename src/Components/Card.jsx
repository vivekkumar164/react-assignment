import React from 'react'

const Card = ({ pokeMon, load, infoPokemon }) => {
    return (

        <>

            {
                load ? <h1>Loading...</h1> :
                    pokeMon.map((item) => {
                        return (
                            <>
                                <div className="card" key={item.id} onClick={() => infoPokemon(item)}>

                                    <img src={item.sprites.front_default} alt="" />
                                    <h2>{item.name}</h2>
                                </div>
                            </>
                        )
                    })
            }

        </>
    )
}

export default Card