import React, { useEffect, useState } from 'react'
import Card from './Card'
import PokemonInfo from './PokemonInfo'
import axios from 'axios'
import Navbar from './Navbar'
const Main = () => {
    const [pokeMonData, setPokeMonData] = useState([]);
    const [load, setLoad] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const [name, setName] = useState('pikachu');

    const getPokeData = async () => {
        setLoad(true);
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        additionalDetails(res.data.results);
        setLoad(false);
    }

    const additionalDetails = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url)
                .catch(function (error) {
                    console.log(error.toJSON());
                });
            setPokeMonData(state => {
                state = [...state, result.data];
                state.sort((a, b) => a.id - b.id)
                return state;
            });
        })
    }

    useEffect(() => {
        getPokeData();
    }, [url]);

    useEffect(() => {
        getSearchedPokeMon();
    }, [name]);

    const getSearchedPokeMon = async () => {
        let url1 = url + name.toLocaleLowerCase();
        const result = await axios.get(url1)
            .catch(function (error) {
                console.log(error.toJSON());
            });
        setPokeDex(result.data)
    }


    return (
        <>
            <div className="container">
                <Navbar searchPokeMon={poke => setName(poke)} />
                <div className="leftPanel">
                    <Card pokeMon={pokeMonData} load={load} infoPokemon={poke => setPokeDex(poke)} />

                    <div className="btn-group">
                        {prevUrl && <button onClick={() => {
                            setPokeMonData([])
                            setUrl(prevUrl)
                        }}>Previous</button>}

                        {nextUrl && <button onClick={() => {
                            setPokeMonData([])
                            setUrl(nextUrl)
                        }}>Next</button>}
                    </div>
                </div>
                <div className="rightPanel">
                    <PokemonInfo data={pokeDex} />
                </div>
            </div>
        </>
    )
}

export default Main