import { mount } from "enzyme";
import React from "react";
import { AppSubmenu, AppMenu } from "./AppMenu";

describe("test <AppSubmenu>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AppSubmenu />);
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("test <AppMenu>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AppMenu />);
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
