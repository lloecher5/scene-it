//selects the appropriate elements from the DOM
const movieContainer = document.querySelector(".movies-container");
const form = document.getElementById("search-form");

//function that takes in array of movies and renders them
const renderMovies = (movieArray) => {
  //creates HMTL element for each movie in the input array
  const movieHTMLArray = movieArray.map((currentMovie) => {
    return `<div class="movie">
    <img
      src="${currentMovie.Poster}"
    />
    <div class="bottom">
      <h4 id="title">${currentMovie.Title}</h4>
      <p id="release-date">${currentMovie.Year}</p>
    </div>

    <div class="button">
      <button class ="add-button" id="add" data-imdb = "${currentMovie.imdbID}" = >Add</button>
    </div>
  </div>`;
  });

  //converts the array into one large string
  return movieHTMLArray.join("");
};
//event listener that listens to the search submit button
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //selects text from search bar
    const searchString = document.querySelector(".search-bar").value;
    //cleans up the url
    const urlEncodedSearchString = encodeURIComponent(searchString);

    //fetch the data from the url with the typed in text
    fetch("http://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //function that needs the data from the API
        const saveToWatchList = (movieID) => {
          console.log(movieID);

          //this gives you the entire movie object that matches the selected ID.

          const movie = data.Search.find((currentMovie) => {
            return currentMovie.imdbID == movieID;
          });

          let watchlistJSON = localStorage.getItem("watchlist");
          //converts the watchlist object from JSON into an array
          let watchlist = JSON.parse(watchlistJSON);

          //if the watchlist is empty to begin with, it creates an empty array.
          if (!watchlist) {
            watchlist = [];
          }

          //pushes the selected movie into the watchlist array
          watchlist.push(movie);
          //converts watchlist back into JSON
          watchlistJSON = JSON.stringify(watchlist);
          //adds new movie to the local storage
          localStorage.setItem("watchlist", watchlistJSON);
        };
        //renders movies with key words that were typed in
        movieContainer.innerHTML = renderMovies(data.Search);

        //add event listener to add buttons after the submit button is clicked
        document.addEventListener("click", (e) => {
          //if the target contains the class 'add-button', the function will be called.
          if (e.target.classList.contains("add-button")) {
            // this gives the value of any 'data' attributes added to the class
            const movieID = e.target.dataset.imdb;
            //this gives you the entire movie object that matches the elected ID.
            const movie = data.Search.find((currentMovie) => {
              return currentMovie.imdbID == movieID;
            });

            //sends alert notifying user that the proper movie has brrn added to the watchlist
            alert(`${movie.Title} has been added to your watch list!.`);
            //saves appropriate movie to the watchlist
            saveToWatchList(movieID);
          }
        });
      });
  });
}

export { renderMovies };
