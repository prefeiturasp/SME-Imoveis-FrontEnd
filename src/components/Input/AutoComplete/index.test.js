import { mount } from "enzyme";
import React from "react";
import { AutoComplete } from "./index";

describe("test <AutoComplete>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AutoComplete value="" input={{ value: "" }} />);
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
