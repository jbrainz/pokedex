import { BrowserRouter, Route } from "react-router-dom"
import Header from "./components/layout/Header"
import Favorites from "./components/pages/Favorites"
import Pokemon from "./components/pages/Pokemon"
import Pokemondetails from "./components/pages/Pokemondetails"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Pokemon} />
      <Route path="/pokemon/:id" component={Pokemondetails} />
      <Route exact path="/favorites" component={Favorites} />
    </BrowserRouter>
  )
}

export default App
