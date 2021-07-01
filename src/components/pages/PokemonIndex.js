import axios from "axios"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { addFav, removeFav } from "../../util/util"
import HomeSection from "../layout/HomeSection"

const Pokemon = ({ history }) => {
  const [sdata, setFavorite] = useState([])
  const [next, setNextData] = useState("")
  const [prev, setPrevData] = useState("")
  const [loading, setLoadingData] = useState(true)
  const [pokeman, setPokeman] = useState([])

  const getPokemon = async (url = "https://pokeapi.co/api/v2/pokemon") => {
    const { data } = await axios.get(url)
    localStorage.setItem("pokemon-url", JSON.stringify(data.results))
    setNextData(data.next)
    setPrevData(data.previous)
    await loadPokeman(data.results)
    setLoadingData(false)
    return data
  }
  const getPok = async (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data)
          setFavorite(data)
        })
    })
  }
  const nextData = async () => {
    setLoadingData(true)
    let data = await getPokemon(next)
    console.log(next)
    if (data === undefined) return
    await loadPokeman(data.results)
    setPrevData(data.previous)
    setLoadingData(false)
  }
  const prevData = async () => {
    setLoadingData(true)
    let data = await getPokemon(prev)
    if (data === undefined) return
    await loadPokeman(data.results)
    setNextData(data.next)
    setLoadingData(false)
  }

  const loadPokeman = async (data) => {
    let pokemon = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRec = await getPok(pokemon.url)
        return pokemonRec
      })
    )
    setPokeman(pokemon)
  }
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pokemon-url"))
    console.log(data)
    async function getCache() {
      if (data) {
        await loadPokeman(data)
        setLoadingData(false)
        return
      }
    }
    getCache()
    getPokemon()
  }, [])

  const addFavoriteHandler = () => {
    addFav(sdata)
    history.push("/favorites")
  }
  const removeFavHandler = () => {
    removeFav(pokeman)
  }
  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <Wrapper>
            {pokeman.map((poke) => (
              <HomeSection
                Remove={() => removeFavHandler()}
                Add={() => addFavoriteHandler()}
                id={poke.id}
                name={poke.name}
              />
            ))}
          </Wrapper>
          <ButtonWrapper>
            <button
              style={{
                height: "30px",
                width: "100px",
                backgroundColor: "pink",
                color: "black",
              }}
              onClick={() => prevData()}
            >
              Previous
            </button>
            <button
              style={{
                height: "30px",
                width: "100px",
                backgroundColor: "#ddd",
                color: "black",
              }}
              onClick={() => nextData()}
            >
              Next
            </button>
          </ButtonWrapper>
        </>
      )}
    </>
  )
}
const Wrapper = styled.div`
  margin-top: 5em;
  display: grid;
  grid-template-columns: repeat(4, auto);
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 3rem;
`
export default Pokemon
