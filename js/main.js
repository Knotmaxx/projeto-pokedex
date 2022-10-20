const pokemonImg = document.querySelector(".pokedex__pokemon")
const pokemonName = document.querySelector(".pokedex__name")
const pokemonNumber = document.querySelectorAll(".pokedex__number")
const form = document.querySelector(".pokedex__form")
const input = document.querySelector(".pokedex__input")
const btnPrev = document.querySelector("#btn-prev")
const btnNext = document.querySelector("#btn-next")
let searchPokemon = 1

async function getPokemon(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if(response.ok){
    return await response.json()
  }
}

function colorType(cor){
  pokemonName.style.color = cor
}

const typePokemon = {
  electric: () =>{colorType("#FFFF00")},
  grass: () =>{colorType("#32cd32")},
  fire: () =>{colorType("#cc0000")},
  rock: () =>{colorType("#7a3d00")},
  ice: () =>{colorType("#87cefa")},
  flying: () =>{colorType("#5aa09f")},
  dark: () =>{colorType("#6a4366")},
  bug: () =>{colorType("#548c45")},
  normal: () =>{colorType("#333")},
  poison: () =>{colorType("#9400d3")},
  ground: () =>{colorType("#994c00")},
  ghost: () =>{colorType("#71607b")},
  psychic: () =>{colorType("#c06")},
  dragon: () =>{colorType("#4cbdb3")},
  fighting: () =>{colorType("#eead2d")},
  fairy: () =>{colorType("#be416d")},
  stell: () =>{colorType("#5f9c83")},
  water: () =>{colorType("#120a8f")}
}

function renderStyle(name,img,number){
  pokemonName.textContent = name.text
  pokemonName.style.color = name.cor
  pokemonImg.style.display = img
  pokemonNumber[0].textContent = number.id
  pokemonNumber[1].textContent = number.traco
}

async function renderPokemon(pokemon){
  renderStyle({text:"looding...",cor:"black"},"none",{id:"",traco:""})
  const data = await getPokemon(pokemon)
  if(data && data.id <= 649){
    renderStyle({text:data.name,cor:"black"},"block",{id:data.id,traco:"-"})
    pokemonImg.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    typePokemon[data.types[0].type.name]()
    searchPokemon = data.id
    
  }else{
    renderStyle({text:"Not found :c",cor:"#000"},"none",{id:"",traco:""})
  }
}


btnPrev.addEventListener("click", () => {
  if(searchPokemon > 1){
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

btnNext.addEventListener("click",()=>{
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

form.addEventListener("submit", (event)=>{
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
  input.value = ""
})

renderPokemon(searchPokemon)
