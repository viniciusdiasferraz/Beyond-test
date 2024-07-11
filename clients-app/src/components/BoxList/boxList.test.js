import React from "react";
import { render, screen } from "@testing-library/react";
import BoxList from "./index";

describe("BoxList Component", () => {
  test("renders BoxList component with title and items", () => {
    const title = "Skills";
    const items = ["React", "Typescript", "CSS", "JavaScript", "HTML"];

    render(<BoxList title={title} items={items} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    items.forEach((item) => {
      const itemElement = screen.getByText(item);
      expect(itemElement).toBeInTheDocument();
    });
  });

  test("renders BoxList component without items", () => {
    const title = "Skills";
    const items = [];

    render(<BoxList title={title} items={items} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

  });
});
