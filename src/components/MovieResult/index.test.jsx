// components > MovieResult > tests
import React from "react";
import MovieResult from "./index";
import Text from "../Text";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

configure({ adapter: new Adapter() });

const data = {
  title: "Test Title",
  posterUrl: "h://blah.com/poster",
  releaseDate: new Date("1989-06-23"),
  overview:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam urna enim, ornare quis ex ut, euismod pretium augue. Quisque eget malesuada elit. Cras ut arcu risus. Etiam placerat, dui ac mattis fermentum, tortor diam laoreet nisl, sit amet ultrices nibh orci at ex. Nam fermentum sem aliquam felis tempor, in luctus eros vehicula. Pellentesque at mattis lacus."
};

let wrapper = shallow(<MovieResult {...data} />);
describe("MovieResult", () => {
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays title, release date, and overview", () => {
    const displayedText = wrapper.find(Text);
    expect(displayedText).toHaveLength(3);
  });

  it("displays image", () => {
    const img = wrapper.find("img");

    expect(img).toHaveLength(1);
  });

  // it("displays poster image", () => {
  //   const poster = wrapper.find("img");
  //   expect(poster).toHaveLength(1);
  //   expect(poster.prop("src")).toBe(data.posterUrl);
  // });

  // it("displays release date", () => {
  //   const releaseDate = wrapper.find("p.release-date");
  //   expect(releaseDate).toHaveLength(1);
  //   expect(releaseDate.text()).toBe(data.releaseDate);
  // });

  // it("displays overview", () => {
  //   const overview = wrapper.find("p.overview");
  //   expect(overview).toHaveLength(1);
  //   expect(overview.text()).toBe(data.overview);
  // });
});
