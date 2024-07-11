import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FormCandidate from "./index";
import { useApiContext } from "../../context/context";
import useApi from "../../hooks/useApi";

jest.mock("../../context/context");
jest.mock("../../hooks/useApi");

describe("FormCandidate Component", () => {
  beforeEach(() => {
    useApiContext.mockReturnValue({
      name: "",
      experience: "",
      setName: jest.fn(),
      setExperience: jest.fn(),
      skills: [],
      setSkills: jest.fn(),
      apis: [],
      setApis: jest.fn(),
      versionControl: [],
      setVersionControl: jest.fn(),
      testingTools: [],
      setTestingTools: jest.fn(),
    });

    useApi.mockReturnValue({
      handleSubmit: jest.fn(),
      handleCheckboxChange: jest.fn(),
    });
  });

  it("renders with form fields and submit button", () => {
    render(<FormCandidate />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Experiência (em anos)")).toBeInTheDocument();
    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });

  it("updates name and experience fields correctly", () => {
    const setName = jest.fn();
    const setExperience = jest.fn();
    useApiContext.mockReturnValue({
      name: "",
      experience: "",
      setName: setName,
      setExperience: setExperience,
      skills: [],
      setSkills: jest.fn(),
      apis: [],
      setApis: jest.fn(),
      versionControl: [],
      setVersionControl: jest.fn(),
      testingTools: [],
      setTestingTools: jest.fn(),
    });

    render(<FormCandidate />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Experiência (em anos)"), {
      target: { value: "5" },
    });

    expect(setName).toHaveBeenCalledWith("John Doe");
    expect(setExperience).toHaveBeenCalledWith("5");
  });

  it("submits the form when button is clicked", () => {
    const handleSubmit = jest.fn();
    useApi.mockReturnValue({
      handleSubmit: handleSubmit,
      handleCheckboxChange: jest.fn(),
    });

    render(<FormCandidate />);

    fireEvent.click(screen.getByText("Adicionar"));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
