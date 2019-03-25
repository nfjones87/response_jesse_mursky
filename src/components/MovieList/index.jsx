// components > MovieList
import React from "react";
import PropTypes from "prop-types";
import FlexBox from "../FlexBox";
import MovieResult from "../MovieResult";
import Text from "../Text";
import Movie from "../prototypes/Movie";

class MovieList extends React.PureComponent {
  /**
   * determine whether data array has items to display or not
   */
  hasData = () => {
    const { data } = this.props;

    return data.length > 0;
  };

  render() {
    const { data } = this.props;

    // returns the data items displayed as MovieResult components OR an 'end of results' message if there aren't any results
    return (
      <FlexBox container wrap="wrap">
        {this.hasData() ? (
          data.map(item => (
            <MovieResult
              key={`${item.title}-${item.releaseDate}`}
              title={item.title}
              posterUrl={item.posterUrl}
              releaseDate={item.releaseDate}
              overview={item.overview}
            />
          ))
        ) : (
          <Text>Looks like that's the end of the reel</Text>
        )}
      </FlexBox>
    );
  }
}

MovieList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Movie))
};

MovieList.defaultProps = {
  data: []
};

export default MovieList;
