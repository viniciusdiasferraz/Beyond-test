import React from "react";
import { render, screen } from "@testing-library/react";
import ListCandidates from "./index";

jest.mock("../../hooks/useApi", () => ({
  __esModule: true,
  default: () => ({
    handleClickOpen: jest.fn(),
  }),
}));

jest.mock("../../context/context", () => ({
  useApiContext: () => ({
    users: [
      {
        id: 1,
        name: "João Silva",
        experience: "5 anos",
        skills: ["React", "Typescript", "CSS", "Javascript", "HTML"],
        apis: ["RESTful", "GraphQL"],
        versionControl: ["Git"],
        testingTools: ["Jest"],
      },
      {
        id: 2,
        name: "Maria Oliveira",
        experience: "3 anos",
        skills: ["Vue", "Typescript", "CSS", "Javascript", "HTML"],
        apis: ["RESTful", "GraphQL"],
        versionControl: ["Git"],
        testingTools: ["Jest"],
      },
    ],
  }),
}));

test("renders ListCandidates component with user buttons", () => {
  render(<ListCandidates />);

  const joaoButton = screen.getByText("João Silva");
  const mariaButton = screen.getByText("Maria Oliveira");
  expect(joaoButton).toBeInTheDocument();
  expect(mariaButton).toBeInTheDocument();
});
