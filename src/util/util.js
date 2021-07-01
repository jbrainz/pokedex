/**
 * @description this function persist local state data on the localstorage
 * @param {data to persist on localstore} param0
 * @returns
 */
export const addFav = ({ sprites, name, height, weight }) => {
  const oldItems = JSON.parse(localStorage.getItem("favorites")) || []
  const newItems = {
    name: name,
    height: height,
    weight: weight,
    sprites: sprites,
  }
  const data = Object.values(oldItems)
  const ds = data.map((d) => d.name)
  if (ds.name === name) {
    return
  } else {
    oldItems.push(newItems)
    localStorage.setItem("favorites", JSON.stringify(oldItems))
  }
}

/**
 * @description this function removes local state data on the localstorage
 * @param {nameof object to remove on localstore} param0
 * @returns
 */
export const removeFav = ({ name }) => {
  let oldItems = JSON.parse(localStorage.getItem("favorites")) || []
  const newitems = Object.values(oldItems)
  newitems.splice(newitems.indexOf(name), 1)
  localStorage.setItem("favorites", JSON.stringify(newitems))
}
