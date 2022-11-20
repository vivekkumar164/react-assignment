import React, { useEffect, useState, CSSProperties } from 'react'
import Card from './Card'
import PokemonInfo from './PokemonInfo'
import axios from 'axios'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";





const Main = () => {
    const [pokeMonData, setPokeMonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const [name, setName] = useState('pikachu');

    const getPokeData = async () => {
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        additionalDetails(res.data.results);
        setLoading(false);
    }

    const additionalDetails = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url)
                .catch(function (error) {
                    console.log(error.toJSON());
                    setLoading(false);
                });
            setPokeMonData(state => {
                state = [...state, result.data];
                state.sort((a, b) => a.id - b.id)
                return state;
            });
        })
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        getPokeData();
    }, [url]);

    useEffect(() => {
        getSearchedPokeMon();
    }, [name]);

    const getSearchedPokeMon = async () => {
        setLoading(true);
        let url1 = url + name.toLocaleLowerCase();
        const result = await axios.get(url1)
            .catch(function (error) {
                console.log(error.toJSON());
                toast.error('Incorrect Name', {
                    position: 'top-center'
                });
                setLoading(false);
            });
        setPokeDex(result.data);
        setLoading(false);
    }


    return (
        <>

            {
                loading ?
                    <div className='loader'>
                        <ClipLoader
                            color={'#D0021B'}
                            loading={loading}
                            size={100}
                          
                        />
                    </div>

                    :
                    <div className="container">
                        <Navbar searchPokeMon={poke => setName(poke)} />
                        <div className="leftPanel">
                            <Card pokeMon={pokeMonData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

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
            }


            <ToastContainer />


        </>
    )
}

export default Main