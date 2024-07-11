import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import APIsCandidate from "./index";
import { ApiProvider } from "../../context/context";

describe("APIsCandidate Component", () => {
  test("renders APIs checkboxes correctly", () => {
    render(
      <ApiProvider>
        <APIsCandidate />
      </ApiProvider>
    );

    const restfulCheckbox = screen.getByLabelText("RESTful");
    const graphqlCheckbox = screen.getByLabelText("GraphQL");
    const grpcCheckbox = screen.getByLabelText("gRPC");

    expect(restfulCheckbox).toBeInTheDocument();
    expect(graphqlCheckbox).toBeInTheDocument();
    expect(grpcCheckbox).toBeInTheDocument();
  });

  test("renders with initial APIs checked", () => {
    const initialAPIs = ["RESTful", "GraphQL"];

    render(
      <ApiProvider>
        <APIsCandidate initialAPIs={initialAPIs} />
      </ApiProvider>
    );

    const restfulCheckbox = screen.getByLabelText("RESTful");
    const graphqlCheckbox = screen.getByLabelText("GraphQL");
    const grpcCheckbox = screen.getByLabelText("gRPC");

    expect(restfulCheckbox.checked).toBe(true);
    expect(graphqlCheckbox.checked).toBe(true);
    expect(grpcCheckbox.checked).toBe(false);
  });

  test("handles checkbox change correctly", () => {
    const initialAPIs = ["RESTful", "GraphQL"];

    render(
      <ApiProvider>
        <APIsCandidate initialAPIs={initialAPIs} />
      </ApiProvider>
    );

    const grpcCheckbox = screen.getByLabelText("gRPC");

    fireEvent.click(grpcCheckbox);

    expect(grpcCheckbox.checked).toBe(true);
  });

  test("disables checkboxes when disabled prop is true", () => {
    const initialAPIs = ["RESTful", "GraphQL"];

    render(
      <ApiProvider>
        <APIsCandidate initialAPIs={initialAPIs} disabled={true} />
      </ApiProvider>
    );

    const restfulCheckbox = screen.getByLabelText("RESTful");
    const graphqlCheckbox = screen.getByLabelText("GraphQL");

    expect(restfulCheckbox.disabled).toBe(true);
    expect(graphqlCheckbox.disabled).toBe(true);
  });
});
