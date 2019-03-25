// components > FlexBox > tests
import React from "react";
import FlexBox from "./index.jsx";
import { mount, shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

configure({ adapter: new Adapter() });

let wrapper, rootStyle;

const propertyValues = {
  direction: ["row", "row-reverse", "column", "column-reverse"],
  wrap: ["nowrap", "wrap", "wrap-reverse"],
  justifyContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly"
  ],
  alignItems: ["stretch", "flex-start", "flex-end", "center", "base-line"],
  alignContent: [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "stretch"
  ],
  alignSelf: ["auto", "flex-start", "flex-end", "center", "baseline", "center"]
};

describe("FlexBox", () => {
  beforeAll(() => {
    wrapper = mount(<FlexBox />);
  });

  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  // this test is if css files are being used
  // it("is a container", () => {
  //   wrapper.setProps({ container: true });

  //   expect(wrapper.find("div.container")).toHaveLength(1);
  // });

  // checks every possible prop derived className
  // this test is if css files are being used
  // it("sets classes correctly", () => {
  //   // TODO iterating like this doesn't give great info when one of them fails
  //   Object.keys(propertyValues).forEach(k => {
  //     const values = propertyValues[k];

  //     values.forEach(v => {
  //       wrapper.setProps({ [k]: v });
  //       wrapper.update();

  //       expect(wrapper.find("div." + k + "-" + v)).toHaveLength(1);
  //     });
  //   });
  // });
});
