import { mount } from "enzyme";
import React from "react";
import { InputText } from "./InputText";

describe("test <InputText>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<InputText />);
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
