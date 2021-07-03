import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { removeFav } from "../../util/util"

const Favorites = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites"))
    setData(data)
  }, [])
  const removeFavHandler = () => {
    removeFav(data)
  }

  return (
    <div
      style={{ marginTop: "150px", display: "flex", justifyContent: "center" }}
    >
      {data.length === 0 ? (
        <h1>No Favorites to show</h1>
      ) : (
        <div>
          {data &&
            data.map((d, index) => (
              <ContentWrapper key={index}>
                <Wrapper key={d.index}>
                  <Link key={d.index} to={`/pokemon/${d.name}`}>
                    <TextWrapper key={d.index}>
                      <Title key={d.index}>{d.name}</Title>
                    </TextWrapper>
                  </Link>
                  <button onClick={() => removeFavHandler()}>RemoveFave</button>
                </Wrapper>
              </ContentWrapper>
            ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
const ContentWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
