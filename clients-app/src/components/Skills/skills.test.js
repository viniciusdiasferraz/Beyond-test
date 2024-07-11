import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Skills from "./index";

jest.mock("../../hooks/useApi", () => ({
  __esModule: true,
  default: () => ({
    handleCheckboxChange: jest.fn(),
  }),
}));

jest.mock("../../context/context", () => ({
  useApiContext: () => ({
    skills: [],
    setSkills: jest.fn(),
  }),
}));

test("renders Skills component with checkboxes", () => {
  render(<Skills />);

  expect(screen.getByText("Skills")).toBeInTheDocument();

  const skills = ["React", "Typescript", "CSS", "Javascript", "HTML", "Vue"];
  skills.forEach((skill) => {
    expect(screen.getByLabelText(skill)).toBeInTheDocument();
  });

  const reactCheckbox = screen.getByLabelText("React");
  fireEvent.click(reactCheckbox);
});
