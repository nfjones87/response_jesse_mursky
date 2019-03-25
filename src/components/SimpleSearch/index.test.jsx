// components > SimpleSearch > tests
import React from "react";
import SimpleSearch from "./index";
import { mount, shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

configure({ adapter: new Adapter() });

const onChange = jest.fn();
const mockChangeEvent = {
  preventDefault() {},
  target: { value: "test value" }
};
const onSubmit = jest.fn();
const mockSubmitEvent = { preventDefault() {} };

let wrapper = shallow(
  <SimpleSearch
    value="some value"
    progress={false}
    error=""
    onChange={onChange}
    onSubmit={onSubmit}
  />
);

describe("SimpleSearch", () => {
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("calls onChange", () => {
    wrapper.find("input").simulate("change", mockChangeEvent);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith(mockChangeEvent);
  });

  it("calls onSubmit", () => {
    wrapper.find("form").simulate("submit", mockSubmitEvent);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables button", () => {
    wrapper.setProps({ progress: true });
    wrapper.update();

    expect(wrapper.find("button").prop("disabled")).toBe(true);
  });

  it("displays error", () => {
    wrapper.setProps({ error: "test error" });

    expect(wrapper.find(Text)).toHaveLength(1);
  });
});
