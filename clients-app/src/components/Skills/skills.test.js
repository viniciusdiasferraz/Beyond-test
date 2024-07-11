import React from "react";
import { render, screen } from "@testing-library/react";
import Skills from "./index";
import { useApiContext } from "../../context/context";

jest.mock("../../context/context", () => ({
  useApiContext: jest.fn(),
}));

describe("Modal Component", () => {
  beforeEach(() => {
    useApiContext.mockReturnValue({
      skills: ["React", "CSS"],
      setSkills: jest.fn(),
    });
  });

  test("renders modal with candidate details", () => {
    render(<Skills initialSkills={["React", "CSS"]} />);

    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByLabelText("React")).toBeChecked();
    expect(screen.getByLabelText("CSS")).toBeChecked();
  });
});
