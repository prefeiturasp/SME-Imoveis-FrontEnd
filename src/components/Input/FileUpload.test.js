import React from "react";
import { mount } from "enzyme";

import { required } from "helpers/fieldValidators";
import { FileUpload } from "./FileUpload";

describe("test <FileUpload>", () => {
  let wrapper;
  let onChange = jest.fn();
  let input = { onChange, value: "" };

  beforeEach(() => {
    const props = {
      meta: {
        touched: true,
        error: "This field is required"
      }
    };
    wrapper = mount(
      <FileUpload
        className="teste"
        name="myCombo"
        input={input}
        label="mylabel"
        required
        value=""
        validate={required}
        {...props}
      />
    );
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
