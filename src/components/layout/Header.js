import { Link } from "react-router-dom"
import styled from "styled-components"

/**
 * @param no params required to use this component
 * @returns JSX react component
 */
const Header = () => {
  return (
    <Wrapper>
      <MenuWrapper>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <p>Pokedex</p>
        </Link>
        <Link
          to="/favorites"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <p>Favorites</p>
        </Link>
      </MenuWrapper>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: black;
  display: grid;
  grid-template-columns: 44px auto;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
  }
`
const MenuWrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(2, auto);
  @media (max-width: 768px) {
    > a {
      display: none;
    }
    grid-template-columns: auto;
  }
`
export default Header
