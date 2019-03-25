// components > pages > testpage
import React from "react";
import "./testpage.css";
import dispatcher from "libraries/bevent.js";
import MovieList from "../../MovieList";
import FlexBox from "../../FlexBox";
import SimpleSearch from "../../SimpleSearch";
import ApiArgs from "../../prototypes/ApiArgs";

// ******************** START HERE ***********************

//this is the call for data:
//   dispatcher.trigger('fetchAPI', ['movie','batman']);
//movie and batman are example search parameters and
//should both be changeable via UI

// *******************************************************

class Test extends React.Component {
  popular = new ApiArgs({ path: "movie/popular" }); // this is the default request to show items at beginning and when search is cleared
  searchTypes = ["company", "collection", "keyword", "movie", "person", "tv"]; // these are the different search types, not currently allowing 'multi', because not sure if it requires different request info

  // default state used in constructor and on clearing the search form
  defaultState = Object.freeze({
    data: [],
    type: this.searchTypes[3],
    genre: -1,
    value: "",
    page: 1,
    progress: false,
    genres: [],
    error: ""
  });

  // set the state to the frozen default state to start
  state = this.defaultState;

  componentDidMount() {
    dispatcher.trigger("fetchApi", this.popular);

    //this sets up an event which re-renders this component when called
    dispatcher.on("updateTestPage", () => {
      const theUpdate = { progress: false };

      // if the state has a value check for the memd response
      // otherwise default to
      const data = this.state.value
        ? this.memdResponse()
        : this.memdResponse(this.popular);

      if (data) {
        theUpdate.data = data;
      }

      //am empty set state will simply trigger a re-render of the page
      this.setState(theUpdate);
    });

    dispatcher.on("updateGenreData", () => {
      const { type } = this.state;
      const store = window.stores.genreData;

      // if the selected search type has generes, then set them to state for use
      if (store[type]) {
        const genres = store[type];
        this.setState({ genres });
      }
    });
  }

  /**
   * changes the controlled state value for the search field
   */
  handleSearchChange = event => {
    const { target } = event;
    const { value } = target;

    this.setState({ value });
  };

  /**
   * processes a search request
   */
  handleSearchSubmit = event => {
    // check to see if the form is valid
    const error = this.validateForm();

    // if not set the message to the state for display
    if (error) {
      this.setState({ error });
    } else {
      // otherwise build the request obj
      const argsInstance = this.buildArgsInstance();

      // get memoized results if they exist
      const data = this.memdResponse(argsInstance);

      // if a memoized response exists for this exact request use it
      if (data) {
        this.setState({ data });
      } else {
        // otherwise init the search request
        this.setState({ progress: true }, () => {
          dispatcher.trigger("fetchApi", argsInstance);
        });
      }
    }
  };

  /**
   * resets the search form and results to the original state
   */
  handleClear = () => {
    const data = this.memdResponse(this.popular);

    this.setState(Object.assign({}, this.defaultState, { data }));
  };

  /**
   * checks to see if the results for the request already exist and returns them or undefined
   */
  memdResponse = obj => {
    if (!!obj && !(obj instanceof ApiArgs)) {
      throw new Error(
        "argument must be an instance of ApiArgs, if no argument is provided the instance will be created from the values stored in state"
      );
    }

    const apiArgs = obj || this.buildArgsInstance();

    return window.stores.movieData[apiArgs.requestUrl];
  };

  /**
   * uses a built request obj to create an instance of ApiArgs
   */
  buildArgsInstance = () => {
    return new ApiArgs(this.buildRequestObj());
  };

  /**
   * takes values from state to create an object used for search fetch requests
   */
  buildRequestObj = () => {
    const { type, genre, value: query, page } = this.state;

    const obj = { path: `search/${type}`, page, query };

    // since the 'fetchSearch' would add a -1 urlParam only add the genre to the obj
    // if it has been selected
    if (genre > -1) {
      obj.genre = genre;
    }

    return obj;
  };

  /**
   * validates the form, returning an error message if needed
   */
  validateForm = () => {
    let message = "";
    const { value } = this.state;

    if (!value) {
      message += "Search terms are required";
    }

    return message;
  };

  render() {
    const { data, value, progress, error } = this.state;

    return (
      <FlexBox id="test" container direction="column">
        <div className="search-wrapper">
          <SimpleSearch
            value={value}
            progress={progress}
            error={error}
            onChange={this.handleSearchChange}
            onSubmit={this.handleSearchSubmit}
            onClear={this.handleClear}
          />
        </div>
        {progress & (data.length === 0) ? (
          <Text>Loading</Text>
        ) : (
          <MovieList data={data} />
        )}
      </FlexBox>
    );
  }
}

export default Test;
