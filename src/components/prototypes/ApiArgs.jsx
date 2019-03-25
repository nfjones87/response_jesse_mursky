// components > prototypes > ApiArgs
class ApiArgs {
  static baseUrl = "https://api.themoviedb.org/3/";

  constructor(args) {
    // to handle what might be any legacy requests being made
    if (Array.isArray(args)) {
      //args[0] is 'movie', args [1] is 'batman'..
      console.warn("legacy search request being made");
      this._endPointPath = ApiArgs.legacyEndPointPath(args);
    } else {
      this._endPointPath = ApiArgs.buildEndPointPath(args);
    }
  }

  static buildEndPointPath({ path, ...rest }) {
    console.log(path, rest);
    if (!path || (path.startsWith("search") && !rest.query)) {
      console.warn("search type and query must be provided");
      return "";
    }

    let apiKey = "40c781f4f82334b037fc6d9c33cc1c58";

    return `${path}?api_key=${apiKey}${ApiArgs.urlParams(rest)}`;
  }

  static legacyEndPointPath(args) {
    // TODO not sure if these args are being presented as words in an array, or different url params in an array as the example
    // involved a one-word movie title
    return ApiArgs.buildEndPointPath({
      path: `search/${args[0]}`,
      query: args[1]
    });
  }

  static urlParams(obj) {
    return Object.keys(obj).reduce((acc, cur) => {
      if (obj[cur]) {
        acc += `&${cur}=${encodeURIComponent(obj[cur])}`;
      }

      return acc;
    }, "");
  }

  get requestUrl() {
    if (!this.endPointPath) {
      throw new Error("Invalid endpoint request");
    }

    return ApiArgs.baseUrl + this.endPointPath;
  }

  get endPointPath() {
    return this._endPointPath;
  }
}

export default ApiArgs;
