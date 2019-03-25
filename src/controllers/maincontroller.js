import dispatcher from "libraries/bevent.js";
import Movie from "../components/prototypes/Movie";
import Genre from "../components/prototypes/Genre";

//   /******** CALL FOR DATA **********/

dispatcher.on("fetchApi", fetchSearch);
function fetchSearch(searchQuery) {
  const { endPoint, fPointer } = window.originalData._getMovieData(searchQuery);

  fPointer
    .catch(err => {
      console.error(err);
    })
    .then(() => {
      if (window.originalData["movieData"]) {
        console.log("call successful");
        ingest_movieData(endPoint);
      }
    });
}

dispatcher.on("fetchGenre", fetchGenreData);
function fetchGenreData(type) {
  const obj = window.originalData._getGenreData(type);

  obj.fPointer
    .catch(err => {
      console.error(err);
    })
    .then(() => {
      if (window.originalData["genreData"]) {
        console.log("genre call successful");

        ingest_genreData(obj.type);
      }
    });
}

//   /******** INGEST AND TRANSFORM DATA **********/

function ingest_movieData(endPoint) {
  var movieData = window.originalData.movieData;

  // mem the result so it can be reused without a subsequent request
  var transformedMovieData = Object.assign({}, window.stores.movieData, {
    [endPoint]: movieData.results.map(movie => new Movie(movie))
  });

  //window.stores is where this movie data is acessible from
  window.stores.movieData = transformedMovieData;

  //update the component
  dispatcher.trigger("updateTestPage");
}

function ingest_genreData(type) {
  var genreData = window.originalData.genreData;

  // mem the result since it won't change
  // TODO key might be better as a Symbol or shorter encoded string value
  var transformedGenreData = Object.assign({}, window.stores.genreData, {
    [type]: genreData.genres.map(genre => new Genre(genre))
  });

  //window.stores is where this movie data is acessible from
  window.stores.genreData = transformedGenreData;

  //update the component
  dispatcher.trigger("updateGenreData");
}

var setup = () => {
  //console.log('main controller imported')
  window.stores.movieData = {};
  window.stores.genreData = {};

  fetchGenreData("movie");
};

module.exports = {
  setup
};
