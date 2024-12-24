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

async function displaySearchResults(searchResultsArr) {

    if(searchResultsArr) {
        const html = await getMoviesHtml(searchResultsArr)
        searchResults.innerHTML = html
    } else {
        searchResults.innerHTML = `<h2>Unable to find what you’re looking for. Please try another search.</h2>`
    }
}

async function getMoviesHtml(searchResultsArr) {
    const searchResultsArray = searchResultsArr.slice(0, 3)
    // console.log(searchResultsArr)
    const searchResultPromises = searchResultsArray.map(async (movie)=> {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${movie.imdbID}`)
        const movieDetail = await res.json()

        return `
        <div class="movie-item">
                    <div class="poster-container">
                        <img src="${movieDetail.Poster}" alt="Movie poster" class="poster">
                    </div>
                    <div class="movie-description">
                        <div class = "movie-title">
                            <h3>${movieDetail.Title}<h3>
                            <i class="fa-solid fa-star star"></i> 
                            <p class="movie-rating">${movieDetail.imdbRating}</p>       
                        </div>
                        
                        <div class="movie-meta">
                            <p>${movieDetail.Runtime}</p>
                            <p>${movieDetail.Genre}</p>
                            <p class="add-watchlist"><i class="fa-solid fa-circle-plus"></i>  Watchlist</p>
                        </div>

                        <div class="movie-plot">
                            <article>${movieDetail.Plot}</article>
                        </div>
                    </div>
                </div>
                <hr class="divider">`
    })

    const searchResultHTML = await Promise.all(searchResultPromises)

    return searchResultHTML.join("")
}
