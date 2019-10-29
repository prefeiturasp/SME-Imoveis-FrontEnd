import { mount } from "enzyme";
import React from "react";
import { HashRouter } from "react-router-dom";
import { AppMenu } from "./AppMenu";

describe("test <AppMenu>", () => {
  let wrapper;
  let onMenuItemClick = jest.fn();
  let menu = [
    {
      label: "Cadastro de Imoveis",
      icon: "pi pi-fw pi-file",
      to: "/"
    },
    {
      label: "Components",
      icon: "pi pi-fw pi-globe",
      badge: "9",
      items: [
        { label: "Sample Page", icon: "pi pi-fw pi-th-large", to: "/sample" }
      ]
    }
  ];

  beforeAll(() => {
    wrapper = mount(
      <HashRouter>
        <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
      </HashRouter>
    );
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
