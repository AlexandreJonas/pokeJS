let offset = 0
let limit = 5

const maxRecords = 11

function convertPokemonToHtml(pokemon) {
    return `
     <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name"> ${pokemon.name} </span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src=${pokemon.photo} alt=${pokemon.name}>
                </div>
                
            </li>`
}

function loadPokemonItens(offset, limit) {
    PokeApi.GetPokemons(offset, limit)
        .then((pokemonList = []) => {

            pokemonHtmlList = document.getElementById('pokemonList')
            pokemonHtmlList.innerHTML += pokemonList.map(convertPokemonToHtml).join('')
        })
        .catch((error) => console.log(error))
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords)
    {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItens(offset, limit)
    }
    
})