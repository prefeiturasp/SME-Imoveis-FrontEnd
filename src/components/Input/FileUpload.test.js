import React from "react";
import { mount } from "enzyme";
import { FileUpload } from "./FileUpload";

describe("test <FileUpload>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<FileUpload input={{ value: "" }} />);
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
