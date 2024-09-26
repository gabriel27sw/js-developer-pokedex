const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadNegativeButton = document.getElementById('loadNegativeButton')
const e = document.querySelector('#loadNegativeButton');

const maxRecords = 151
const limit = 1
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <div class="top-card" >
                <div class="detail">
                    <span class="name">${pokemon.name}</span>
                    <ol class="types">

                        ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                    </ol>
                </div>
                <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
            </div>      
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            <div class="card-pokemon">
                <div class="card-name">
                    <p>experience</p>
                    <p>weight</p>
                    <p>height</p>
                    <p>abilities</p>
                </div>
                <div class="card-status">
                    <span>${pokemon.experience} </span>
                    <span>${pokemon.weight} </span>
                    <span>${pokemon.height} </span>
                    <div><span>${pokemon.abilities.map((ability) => `${ability}`).join(', ')}</span></div>
                </div>
            </div>   
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newHtml

        if (offset === 0) {
            e.classList.add('hidden')
            e.classList.remove('show')
        } else {
            e.classList.add('show')
            e.classList.remove('hidden')
        };
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
        loadPokemonItens(offset, limit)
})

loadNegativeButton.addEventListener('click', () => {

    offset = offset - limit

    loadPokemonItens(offset, limit)
});