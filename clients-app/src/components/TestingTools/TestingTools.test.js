import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestingTools from "./index";

jest.mock("../../hooks/useApi", () => ({
  __esModule: true,
  default: () => ({
    handleCheckboxChange: jest.fn(),
  }),
}));

jest.mock("../../context/context", () => ({
  useApiContext: () => ({
    testingTools: [],
    setTestingTools: jest.fn(),
  }),
}));

test("renders TestingTools component with checkboxes", () => {
  render(<TestingTools />);

  expect(screen.getByText("Ferramentas de Teste")).toBeInTheDocument();

  const tools = [
    "Jest",
    "Mocha",
    "Jasmine",
    "Karma",
    "QUnit",
    "Testing Library",
    "Cypress",
  ];
  tools.forEach((tool) => {
    expect(screen.getByLabelText(tool)).toBeInTheDocument();
  });

  const jestCheckbox = screen.getByLabelText("Jest");
  fireEvent.click(jestCheckbox);
});
