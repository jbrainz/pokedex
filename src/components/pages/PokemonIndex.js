import axios from "axios"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { addFav, removeFav } from "../../util/util"
import HomeSection from "../layout/HomeSection"

/**
 * @descrheiption The index component, of the landing page of the Pokedex app
 * @param {} history
 * @returns JSX
 */
const Pokemon = ({ history }) => {
  const [sdata, setFavorite] = useState([])
  const [next, setNextData] = useState("")
  const [prev, setPrevData] = useState("")
  const [loading, setLoadingData] = useState(true)
  const [pokeman, setPokeman] = useState([])

  /**
   * @description handle fetching all data from the mock api
   * @param {*} url
   * @returns response on a succesfull api call
   */
  const getPokemon = async (url = "https://pokeapi.co/api/v2/pokemon") => {
    try {
      const { data } = await axios.get(url)
      localStorage.setItem("pokemon-url", JSON.stringify(data.results))
      setNextData(data.next)
      setPrevData(data.previous)
      await loadPokeman(data.results)
      setLoadingData(false)
      return data
    } catch (error) {
      alert(error.message)
    }
  }
  /**
   * @description this function handles fetching an object of a pokedex
   * @param {*} url
   * @returns an object
   */
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

  /**
   * @description the next page from the api call
   * @returns next 20 items
   */
  const nextData = async () => {
    setLoadingData(true)
    let data = await getPokemon(next)
    if (data === undefined) return
    await loadPokeman(data.results)
    setPrevData(data.previous)
    setLoadingData(false)
  }
  /**
   * @description the next page from the api call
   * @returns prev 20 items
   */
  const prevData = async () => {
    setLoadingData(true)
    let data = await getPokemon(prev)
    if (data === undefined) return
    await loadPokeman(data.results)
    setNextData(data.next)
    setLoadingData(false)
  }
  /**
   * @description
   * @returns load 20 poke items
   */
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
    async function getCache() {
      if (data) {
        await loadPokeman(data)
        setLoadingData(false)
        return
      }
    }
    getCache()
    getPokemon()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
                key={poke.id}
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
