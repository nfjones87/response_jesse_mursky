// components > MovieResult
import React from "react";
import PropTypes from "prop-types";
import FlexBox from "../FlexBox";
import Text from "../Text";
import FilmStripSVG from "./FilmStripIcon";

// using a Pure Component for a default shallow compare on props.
// example custom component specific comparison provided below
class MovieResult extends React.PureComponent {
  // ** example shouldComponentUpdate shallow check of props
  // shouldComponentUpdate(nextProps, nextState) {
  //   const propsResult = Object.keys(nextProps).some(function(k) {
  //     return this.props[k] !== nextProps[k];
  //   });

  //   const stateResult = Object.keys(nextState).some(function(k) {
  //     return this.state[k] !== nextState[k];
  //   });

  //   return propsResult && stateResult;
  // }

  render() {
    const { title, posterUrl, releaseDate, overview } = this.props;

    return (
      <FlexBox container direction="column">
        <FlexBox container grow={0} alignItems="baseline">
          <Text variant="h3" className="title">
            {title}
          </Text>{" "}
          <Text variant="p">({releaseDate.toLocaleDateString()})</Text>
        </FlexBox>
        <FlexBox container>
          <FlexBox style={{ minWidth: 185, height: 278 }}>
            {posterUrl ? (
              <img alt={`${title} movie poster`} src={posterUrl} />
            ) : (
              <FilmStripSVG />
            )}
          </FlexBox>
          <FlexBox grow={1}>
            <Text variant="p" className="overview">
              {overview}
            </Text>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    );
  }
}

MovieResult.propTypes = {
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string,
  releaseDate: PropTypes.instanceOf(Date),
  overview: PropTypes.string
};

export default MovieResult;
