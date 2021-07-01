import { Link } from "react-router-dom"
import styled from "styled-components"

const Header = () => {
  return (
    <Wrapper>
      <MenuWrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Pokedex</h1>
        </Link>
        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <h1>Favorites</h1>
        </Link>
      </MenuWrapper>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: absolute;
  top: 20px;
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
