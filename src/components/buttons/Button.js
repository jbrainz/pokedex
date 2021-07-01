import React from "react"
import styled from "styled-components"

const Button = ({ title, item, onClick }) => {
  return <MenuItem onClick={onClick}>{title}</MenuItem>
}
const MenuItem = styled.div`
  color: rgba(255, 255, 255, 0.4);
  display: grid;
  grid-template-columns: 24px auto;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
`
export default Button
