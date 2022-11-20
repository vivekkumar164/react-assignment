import React, { useState } from 'react'

const Navbar = ({searchPokeMon}) => {
    const [name,setName] = useState('');

  
    return (
        <>
            <div>
                <nav>
                    <h2>PokeMon Library</h2>
                    <div className="input">
                        <input type="text" onChange={(e)=>setName(e.target.value)} />
                        <button disabled={!name} onClick={()=>searchPokeMon(name)}>Search</button>
                    </div>
                    
                </nav>
            </div>
        </>
    )
}

export default Navbar