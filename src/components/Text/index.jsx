// components > Text
import React from "react";
import PropTypes from "prop-types";

function getColor(variant) {
  return variant === "error" ? "red" : "black";
}

function getVariant(variant) {
  let result = "p";

  // this is basically just here for the 'error' variant right now
  // but set-up to handle more
  switch (variant) {
    case "error":
      break;
    default:
      result = variant;
  }

  return result;
}

const Text = ({ variant, children, style, ...rest }) => {
  const assignedStyle = {
    color: getColor(variant),
    fontFamily: 'Bookman, Georgia, "Times New Roman", serif',
    margin: 4,
    ...style
  };

  const DynamicVariant = getVariant(variant);

  return (
    <DynamicVariant style={assignedStyle} {...rest}>
      {children}
    </DynamicVariant>
  );
};

Text.propTypes = {
  variant: PropTypes.oneOf(["p", "h1", "h2", "h3", "h4", "h5", "h6", "error"]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Text.defaultProps = {
  variant: "p"
};

export default Text;
