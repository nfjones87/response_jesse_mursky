import Promise from "promise-polyfill";
if (!window.Promise) {
  window.Promise = Promise;
}
import "whatwg-fetch";
import ApiArgs from "../components/prototypes/ApiArgs";

// ************** DOCS HERE ******************

//https://developers.themoviedb.org/3/getting-started/introduction

// *******************************************

// example successfull call -> https://api.themoviedb.org/3/search/movie?api_key=40c781f4f82334b037fc6d9c33cc1c58&query=batman

function fetchWrapper(argsInstance) {
  var endPoint = argsInstance.requestUrl; //<- create the endpoint call here

  console.log(endPoint);
  var request = new Request(endPoint);
  var fPointer = fetch(request)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json());
  return { endPoint, fPointer };
}

// WINDOW.ORIGINALDATA
// originalData is meant to be a perfect copy of the data from the server
// originalData gets assigned to the window in windowDataObject
var originalData = {};

// get from an endpoint and store it
if (!originalData["movieData"]) originalData["movieData"] = null;
originalData["_getMovieData"] = searchQuery => {
  let obj = fetchWrapper(searchQuery);
  obj.fPointer.then(data => {
    originalData["movieData"] = data;
  });

  return obj;
};

// genre data
if (!originalData["genreData"]) originalData["genreData"] = null;
originalData["_getGenreData"] = type => {
  if (type !== "movie" && type !== "tv") {
    throw new Error("Invalid genre type request");
  }

  let obj = fetchWrapper(new ApiArgs({ path: `genre/${type}/list` }));
  obj.fPointer.then(data => {
    originalData["genreData"] = data;
  });

  return { type, fPointer: obj.fPointer };
};

module.exports = originalData;
