/** @format */

import React, { useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children} &#x25bc;
  </a>
));
CustomToggle.displayName = "CustomToggle";

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Buscar producto..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);
CustomMenu.displayName = "CustomMenu";

export const DropDownFilter = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Ordenar
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item eventKey="1" active>
          Por Nombre
        </Dropdown.Item>
        <Dropdown.Item eventKey="2">Por Fecha (nuevo primero)</Dropdown.Item>
        <Dropdown.Item eventKey="3">Por Fecha (viejo primero)</Dropdown.Item>
        <Dropdown.Item eventKey="4">Por Precio (menor a mayor)</Dropdown.Item>
        <Dropdown.Item eventKey="5">Por Precio (mayor a menor)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
