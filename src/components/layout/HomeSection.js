import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const HomeSection = ({ name, id, Add, Remove }) => {
  return (
    <ContentWrapper>
      <Wrapper>
        <Link to={`/pokemon/${id}`}>
          <TextWrapper>
            <Title>{name}</Title>
          </TextWrapper>
        </Link>
        <button
          style={{ height: "25px", backgroundColor: "pink", color: "black" }}
          onClick={Add}
        >
          Add To Fav
        </button>
        <button onClick={Remove}>remFav</button>
      </Wrapper>
    </ContentWrapper>
  )
}

export default HomeSection
const ContentWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Wrapper = styled.div`
  width: 280px;
  height: 100px;
  padding: 12px;
  background: #d9dfff;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
`

const TextWrapper = styled.div`
  display: grid;
  gap: 4px;
`
const Title = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-transform: uppercase;
  color: black;
`
