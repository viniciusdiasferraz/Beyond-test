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
      isFormValid: false,
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
      handleNameChange: jest.fn(),
      handleExperienceChange: jest.fn(),
    });
  });

  it("renders with form fields and submit button", () => {
    render(<FormCandidate />);

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Experiência \(em anos\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar/i)).toBeInTheDocument();
  });

  it("updates name and experience fields correctly", () => {
    const handleNameChange = jest.fn();
    const handleExperienceChange = jest.fn();

    useApi.mockReturnValue({
      handleSubmit: jest.fn(),
      handleNameChange: handleNameChange,
      handleExperienceChange: handleExperienceChange,
    });

    useApiContext.mockReturnValue({
      name: "",
      experience: "",
      isFormValid: false,
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

    render(<FormCandidate />);

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Experiência \(em anos\)/i), {
      target: { value: "5" },
    });

    expect(handleNameChange).toHaveBeenCalled();
    expect(handleExperienceChange).toHaveBeenCalled();
  });

  it("submits the form when button is clicked", () => {
    const handleSubmit = jest.fn();
    useApi.mockReturnValue({
      handleSubmit: handleSubmit,
      handleNameChange: jest.fn(),
      handleExperienceChange: jest.fn(),
    });

    useApiContext.mockReturnValue({
      name: "John Doe",
      experience: "5",
      isFormValid: true,
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

    render(<FormCandidate />);

    fireEvent.click(screen.getByText(/Adicionar/i));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
