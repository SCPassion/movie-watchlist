const omdbApiKey = "b2fbbe57"
// const searchTerm = "batman"

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
    console.log(searchResultsArr)

}