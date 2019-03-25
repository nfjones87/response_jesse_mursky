// components > SimpleSearch
import React from "react";
import FlexBox from "../FlexBox";
import Text from "../Text";
import PropTypes from "prop-types";
import "./styles.css";

/**
 * controlled search form for use in larger components
 */
class SimpleSearch extends React.PureComponent {
  handleChange = event => {
    event.preventDefault();

    this.props.onChange(event);
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(event);
  };

  handleClear = event => {
    event.preventDefault();

    this.props.onClear();
  };

  render() {
    const { value, error, progress } = this.props;

    return (
      <form className="simple-search" onSubmit={this.handleSubmit}>
        <FlexBox container>
          <input
            type="text"
            placeholder="Search for a movie"
            value={value}
            onChange={this.handleChange}
            aria-required="true"
            className="input"
          />
          <button
            type="submit"
            disabled={progress || !value}
            className="button submit"
          >
            Search
          </button>
          <button
            disabled={progress || !value}
            onClick={this.handleClear}
            className="button clear"
          >
            Clear
          </button>
        </FlexBox>
        {error && <Text variant="error">{error}</Text>}
      </form>
    );
  }
}

SimpleSearch.propTypes = {
  value: PropTypes.string.isRequired,
  progress: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

SimpleSearch.defaultProps = {
  error: ""
};

export default SimpleSearch;
