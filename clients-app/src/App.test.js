import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { ApiProvider } from "./context/context";

jest.mock("./components/FormCandidate/index", () => () => (
  <div>FormCandidate</div>
));
jest.mock("./components/ListCandidates/index", () => () => (
  <div>ListCandidates</div>
));
jest.mock("./components/Modal", () => () => <div>Modal</div>);

test("renders App with all components", () => {
  render(
    <ApiProvider>
      <App />
    </ApiProvider>
  );

  expect(screen.getByText("FormCandidate")).toBeInTheDocument();
  expect(screen.getByText("ListCandidates")).toBeInTheDocument();
  expect(screen.getByText("Modal")).toBeInTheDocument();
});
