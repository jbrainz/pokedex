import React, { Fragment, useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { addFav, removeFav } from "../../util/util"

const Pokemondetails = ({ match }) => {
  const [pokemonDetails, setPokemonDetails] = useState()
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [message, setMessage] = useState("")
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [fav, setFav] = useState(false)

  const id = match.params.id

  const getPokemon = async (id) => {
    const details = await getPokemonData(id)
    setPokemonDetails(details.data)
    setLoading(false)
  }
  /**
   *
   * @param {} id
   * @returns returns a response object from the api call
   */
  const getPokemonData = async (id) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      localStorage.setItem("pokemon-details-url", JSON.stringify(res))
      return res
    } catch (error) {
      alert(error.message)
    }
  }
  const handleAddFavorite = () => {
    addFav(pokemonDetails)
    setFav(true)
  }
  const handleRemoveFav = () => {
    removeFav(pokemonDetails)
  }

  /**
   * @description this function adds the user comment to the localstorage
   * @param {*} name
   * @param {*} number
   * @param {*} message
   * @param {*} date
   *
   */
  const addItem = (name, number, message, date) => {
    const oldItems = JSON.parse(localStorage.getItem("pokemon")) || []
    const newItems = {
      name: name,
      number: number,
      message: message,
      date: date,
    }
    oldItems.push(newItems)
    localStorage.setItem("pokemon", JSON.stringify(oldItems))
  }

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("pokemon-details-url"))
    async function getCache() {
      if (details) {
        await setPokemonDetails(details.data)
        setLoading(false)
        return
      }
    }
    getCache()
    getPokemon(id)
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * @description handles submit events from the comment from,
   * @description and handles the data to show the comments on the screen
   */
  const handler = async () => {
    const today = new Date()
    const date = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`
    addItem(name, number, message, date)
    setName("")
    setNumber("")
    setMessage("")
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pokemon"))
    if (data) {
      setComments(data)
    }
  }, [])
  return (
    <Main>
      <Container>
        {loading ? (
          <h1>Loadin...</h1>
        ) : (
          <>
            <TextWrapper>
              <ImageHolder>
                <img
                  src={
                    !loading
                      ? pokemonDetails.sprites.back_default
                      : "/images/placecholder.jpg"
                  }
                  alt={pokemonDetails.name}
                />
              </ImageHolder>
              <Title>Name: {pokemonDetails.name}</Title>
              <Title>Weight: {pokemonDetails.weight}</Title>
              <Title>Height: {pokemonDetails.height}</Title>
            </TextWrapper>
            <TextWrapper>
              {pokemonDetails.stats.map((pokemon) => (
                <div key={pokemon.name}>
                  <Title key={pokemon.stat.name}>
                    Name: {pokemon.stat.name}
                  </Title>
                  <Title key={pokemon.base_stat}>
                    Stat: {pokemon.base_stat}
                  </Title>
                </div>
              ))}
            </TextWrapper>
            <TextWrapper>
              {pokemonDetails.moves.slice(0, 3).map((pokemon) => (
                <>
                  <Title key={pokemon.move.name}>
                    Name Of Move: {pokemon.move.name}
                  </Title>
                </>
              ))}
            </TextWrapper>
          </>
        )}
      </Container>
      <ButtonWrapper>
        <Button onClick={() => handleAddFavorite()} disabled={fav}>
          AddFav
        </Button>
        <Button onClick={() => handleRemoveFav()}>removeFav</Button>
      </ButtonWrapper>
      {comments.length !== 0 && (
        <CommentSection>
          {comments.map((comment) => (
            <div key={comment.name}>
              <p key={comment.name}>
                <strong>name</strong>: {comment.name}
              </p>
              <p key={comment.name}>
                {" "}
                <strong key={comment.name}>number: </strong>
                {comment.number}
              </p>
              <p key={comment.name}>
                {" "}
                <strong key={comment.name}>message: </strong>
                {comment.message}
              </p>
              <strong key={comment.name}>{comment.date}</strong>
              <div
                key={comment.name}
                style={{ height: "5px", background: "#333" }}
              />
            </div>
          ))}
        </CommentSection>
      )}
      <FormGroup>
        <Form>
          <Heading>Comments Sections</Heading>
          <div>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="name"
              type="text"
            />
          </div>
          <div>
            <Input
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              placeholder="number"
              type="number"
            />
          </div>
          <div>
            <TextArea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="message"
            ></TextArea>
          </div>
          <Button type="button" onClick={() => handler()}>
            Submit
          </Button>
        </Form>
      </FormGroup>
    </Main>
  )
}
const Main = styled.div`
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`
const Container = styled.div`
  margin-top: 5em;
  display: grid;
  grid-template-columns: repeat(4, auto);
`
const TextWrapper = styled.div`
  display: grid;
  padding: 20px;
  background-color: #ccc;
  gap: 4px;
  margin-top: 10px;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
`
const Title = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-transform: uppercase;
  color: black;
`
const ImageHolder = styled.div`
  height: 100%;
  width: 100px;
  justify-content: center;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`
const FormGroup = styled.div`
  height: 50px;
  margin-top: 10px;
`
const Form = styled.form`
  background: #fff;
  box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
  border-radius: 5px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  left: 0;
  right: 0;
  position: absolute;
`
const Heading = styled.p`
  display: block;
  font-family: sans-serif;
  margin: 10px auto 5px;
  width: 300px;
  font-size: 1.2em;
  font-weight: bold;
`
const Input = styled.input`
  display: block;
  margin: 30px auto;
  min-width: 300px;
  padding: 10px;
  border-radius: 2px;
  border: none;
  transition: all 0.5s ease 0s;
  background-color: #ebebeb;
  color: black;
`
const TextArea = styled.textarea`
  background-color: #ebebeb;
  overflow: hidden;
  height: 10rem;
  display: block;
  margin: 30px auto;
  min-width: 300px;
  padding: 10px;
  border-radius: 2px;
  border: none;
  transition: all 0.5s ease 0s;
  background-color: #ebebeb;
  color: black;
`
const Button = styled.button`
  box-shadow: 15px 15px 15px 5px rgba(78, 72, 77, 0.219);
  transform: translateY(-3px);
  width: 300px;
  border-top: 5px solid #0e3750;
  border-radius: 0%;
  display: block;
  margin: 30px auto;
  min-width: 300px;
  padding: 10px;
  border-radius: 2px;
  border: none;
  transition: all 0.5s ease 0s;
  background-color: #0e3750;
  color: white;
  cursor: pointer;
`
const CommentSection = styled.div`
  box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
  border-radius: 5px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 10px;
`
export default Pokemondetails
