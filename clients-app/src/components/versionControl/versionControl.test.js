import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VersionControl from "./index";
import { useApiContext } from "../../context/context";

jest.mock("../../hooks/useApi", () => ({
  __esModule: true,
  default: () => ({
    handleCheckboxChange: jest.fn(),
  }),
}));

jest.mock("../../context/context", () => ({
  useApiContext: jest.fn(),
}));

describe("Modal Component", () => {
  beforeEach(() => {
    useApiContext.mockReturnValue({
      versionControl: [], 
      setVersionControl: jest.fn(),
    });
  });

  test("renders VersionControl component with checkboxes", () => {
    render(<VersionControl />);

    expect(screen.getByText("Controle de Versão")).toBeInTheDocument();

    const versionControls = ["Git", "SVN", "Mercurial", "Perforce"];
    versionControls.forEach((vc) => {
      expect(screen.getByLabelText(vc)).toBeInTheDocument();
    });

    const gitCheckbox = screen.getByLabelText("Git");
    fireEvent.click(gitCheckbox);
  });
});
