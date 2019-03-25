// prototypes > Movie
export default class Movie {
  _releaseDateInstance = undefined;

  constructor(data) {
    this._title = data.title;
    this._posterPath = data["poster_path"];
    this._releaseDate = data["release_date"];
    this._overview = data.overview;
  }

  get title() {
    return this._title;
  }

  get overview() {
    return this._overview;
  }

  /**
   * returns a Date instance for the API provided release date string YYYY-MM-DD
   */
  get releaseDate() {
    // if the date was already determined, return that
    if (this._releaseDateInstance) return this._releaseDateInstance;

    // otherwise split the string from the API and subract 1 from the month since it needs to be 0 indexed
    const dateParts = this._releaseDate.split("-");
    dateParts[1] -= 1;

    // then set the releaseDateInstance property with the new Date instance
    this._releaseDateInstance = new Date(Date.UTC(...dateParts));

    // and actually return the date
    return this._releaseDateInstance;
  }

  /**
   * combines the poster path from the API with the necessary elements to create the full url
   */
  get posterUrl() {
    // if poster url was already generated just use that
    if (this._posterUrl) return this._posterUrl;

    this._posterUrl = `https://image.tmdb.org/t/p/w185${this._posterPath}`;

    return this._posterUrl;
  }
}
