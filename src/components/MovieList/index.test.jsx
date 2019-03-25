// components > MovieList > tests
import React from "react";
import MovieList from "./index";
import MovieResult from "../MovieResult";
import Text from "../Text";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import dummyData from "./dummyData";
import Movie from "../prototypes/Movie";

configure({ adapter: new Adapter() });

let wrapper = shallow(
  <MovieList data={dummyData.map(item => new Movie(item))} />
);
describe("MovieList", () => {
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays correct number of results", () => {
    const results = wrapper.find(MovieResult);

    expect(results).toHaveLength(3);
  });

  it("displays no results message", () => {
    wrapper.setProps({ data: [] });

    expect(wrapper.find(Text)).toHaveLength(1);
  });
});
