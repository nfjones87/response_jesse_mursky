// components > FlexBox
import React from "react";
import PropTypes from "prop-types";
// import styles from "./style.css";

/**
 * generates a className string for the root div dependent on the props;
 */
// function classNames({ className, ...props }) {
//   const accumulator = className ? ["flex-box", className] : ["flex-box"]; // start with the passed className in the array if one was passed

//   // add in all the property based class names
//   const array = accumulator.concat(
//     Object.keys(props).reduce((acc, cur) => {
//       let str = "";

//       // generate the class name from the key and value pair
//       switch (cur) {
//         case "container":
//           if (props[cur]) str = styles.container;
//           break;
//         default:
//           str = styles[cur + "-" + props[cur]]; // using additive string concat instead of backtick as backtick is not fully compatibile with IE
//       }

//       // push the resulting class name onto the accumulator
//       acc.push(str);

//       return acc;
//     }, accumulator)
//   );

//   // return the string equivalent
//   return array.join(" ").trim();
// }

const cssKeys = {
  wrap: "flexWrap",
  direction: "flexDirection",
  grow: "flexGrow",
  shrink: "flexShrink"
};

function styleGenerator({ className, ...props }) {
  const final = Object.keys(props).reduce(function(acc, k) {
    switch (k) {
      case "container":
        if (props[k]) {
          acc.display = "flex";
          acc.flexGrow = 1;
        }
        break;
      default:
        const key = cssKeys[k] || k;
        acc[key] = props[k];
    }

    return acc;
  }, {});

  // return the string equivalent
  return final;
}

/**
 * Functional component for css flex-box display
 * @param {*} props
 */
const FlexBox = ({ id, children, className, style, ...rest }) => {
  // const classNames = classNames(rest); // css and classNames is the preferred method, but was running into issues with outdated packages. Will either have to eject or overhaul some of the untouchable code to make this work
  const rootStyles = Object.assign({}, style, styleGenerator(rest));
  const classNames = className ? `${className} flex-box` : "flex-box";

  return (
    <div id={id} className={classNames} style={rootStyles}>
      {children}
    </div>
  );
};

FlexBox.propTypes = {
  // container props
  id: PropTypes.string,
  container: PropTypes.bool,
  direction: PropTypes.oneOf([
    "row",
    "row-reverse",
    "column",
    "column-reverse"
  ]),
  wrap: PropTypes.oneOf(["nowrap", "wrap", "wrap-reverse"]),
  justifyContent: PropTypes.oneOf([
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly"
  ]),
  alignItems: PropTypes.oneOf([
    "stretch",
    "flex-start",
    "flex-end",
    "center",
    "baseline"
  ]),
  alignContent: PropTypes.oneOf([
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "stretch"
  ]),

  // item props; not currently implementing order, flex-basis or flex
  grow: PropTypes.number,
  shrink: PropTypes.number,
  alignSelf: PropTypes.oneOf([
    "auto",
    "flex-start",
    "flex-end",
    "center",
    "baseline"
  ]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

FlexBox.defaultProps = {
  // container props
  container: false,
  flexBasis: 0
  // direction: "row",
  // wrap: "wrap"
  // justifyContent: "flex-start",
  // alignItems: "flex-start",
  // alignContent: "flex-start",

  // // item props; not currently implementing order, flex-basis or flex
  // alignSelf: "auto"
};

export default FlexBox;
