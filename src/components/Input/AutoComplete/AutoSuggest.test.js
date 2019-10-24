import { mount } from "enzyme";
import React from "react";
import AutoSuggestAddress from "./AutoSuggest";

describe("test <AutoSuggestAddress>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AutoSuggestAddress value="" />);
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
