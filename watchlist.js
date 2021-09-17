//imports the render movie function from index.js
import { renderMovies } from "./index.js";
//selects the appropriate elements from the DOM
const movieContainer = document.querySelector(".movies-container");

//adds event listener that triggers each time the page is loaded
document.addEventListener("DOMContentLoaded", (e) => {
  //gets the watchlist from the local storage
  const watchList = JSON.parse(localStorage.getItem("watchlist"));
  //sets the HTML to the movies stored in local storage
  movieContainer.innerHTML = renderMovies(watchList);
  //selects the add buttons on the movies
  const addButtons = document.querySelectorAll("button");
  //removes the add buttons. We no longer need them because they were already added to watchlist
  addButtons.forEach((button) => {
    button.remove();
  });
});
