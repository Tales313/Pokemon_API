// https://pokeapi.co/api/v2/pokemon/1/
//link das infos do bulbasauro. Pra mudar o pokemon
//é só mudar o id no final do link

const pokemonsG1 = 'https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0'
const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/'
const pkm_click_audio = document.querySelector('#pkm-click-audio')
let sectionPokemons = document.querySelector('#pokemons')
let infosEimg = document.querySelector('#infosEimg')
let body = document.querySelector('body')
let is_box_visible = false

// INICIO DAS CHAMADAS DE FUNCOES
gerarPokemons()
$('.fa-bars').click(function(){
  if(!is_box_visible){
    body.style = "overflow: hidden;"
    is_box_visible = true
  }else{
    body.style = "overflow: visible;"
    is_box_visible = false
  }
})
//FIM DAS CHAMADAS DE FUNCOES

function gerarPokemons(){
  fetch(pokemonsG1).then(r => r.json()).then(function(data){
    let array = []
    let i = 1
    for(let pkm of data['results']){ // do bulbasauro até o mew
      array.push(`<div class="pokemon">
        <img class="img-pokemon" data-id="${i}" src="imgs/sprites/default/${i}.png">
        <span>${pkm['name']}</span>
        </div>`)
      i++
    }
    sectionPokemons.insertAdjacentHTML('afterbegin', array.join(''))
    $('.img-pokemon').click(function(){
      mudarLightBox($(this).attr('data-id'))
    })
  })
}

function mudarLightBox(id){
  pkm_click_audio.play()
  fetch(pokemonUrl+id).then(res => res.json())
  .then(function(data){
    let str = lightBoxHtml(data, id)
    infosEimg.innerHTML = ""
    infosEimg.insertAdjacentHTML('afterbegin', str)
  })
}

function lightBoxHtml(data, id){
  let tipos = data['types'].map(tipo => tipo['type']['name']).join('/')
  return `<div id="infos">
    <p>Nome: ${data['name']}</p>
    <p>Id: ${id}</p>
    <p>Peso: ${data['weight']}</p>
    <p>Tipo(s): ${tipos}</p>
  </div>
  <div id="box-img-div">
    <img class="box-img" src="imgs/sprites/default/${id}.png">
    <img class="box-img" src="imgs/sprites/back/${id}.png">
  </div>`
}
