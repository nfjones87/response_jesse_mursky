// components > Text > tests
import React from "react";
import Text from "./index";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

configure({ adapter: new Adapter() });

let wrapper = shallow(<Text>test text</Text>);
describe("Text", () => {
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays p", () => {
    const el = wrapper.find("p");

    expect(el).toHaveLength(1);
    expect(el.text()).toBe("test text");
  });

  it("displays h1", () => {
    wrapper.setProps({ variant: "h1" });
    const el = wrapper.find("h1");

    expect(el).toHaveLength(1);
  });

  it("displays h2", () => {
    wrapper.setProps({ variant: "h2" });
    const el = wrapper.find("h2");

    expect(el).toHaveLength(1);
  });
});
