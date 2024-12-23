const omdbApiKey = "b2fbbe57"
// const searchTerm = "batman"

const pokemonDemo = { 
    Title: "Pokémon: Detective Pikachu", 
    Year: "2019", 
    imdbID: "tt5884052", 
    Type: "movie", 
    Poster: "https://m.media-amazon.com/images/M/MV5BNDU4Mzc3NzE5NV5BMl5BanBnXkFtZTgwMzE1NzI1NzM@._V1_SX300.jpg" 
}

const searchForm = document.getElementById("search-form")
const searchResults = document.getElementById("search-results")
console.log(searchResults)
searchForm.addEventListener("submit", async (e)=> {
    e.preventDefault()
    const formData = new FormData(searchForm)
    const searchTerm = formData.get("search-name")

    if(searchTerm) {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchTerm}`)
        const data = await res.json()
        displaySearchResults(data.Search)
        searchForm.reset() 
    }
})

function displaySearchResults( searchResultsArr) {

    if(searchResultsArr) {
        getMoviesHtml(searchResultsArr)
    } else {
        searchResults.innerHTML = `<h2>Unable to find what you’re looking for. Please try another search.</h2>`
    }
}

function getMoviesHtml(searchResultsArr) {
    console.log(searchResultsArr)
}
