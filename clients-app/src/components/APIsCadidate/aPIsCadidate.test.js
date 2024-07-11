import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import APIsCandidate from "./index";
import { ApiProvider } from "../../context/context";

describe("APIsCandidate Component", () => {
  test("handles checkbox change correctly", () => {
    const initialAPIs = ["RESTful", "GraphQL"];

    render(
      <ApiProvider>
        <APIsCandidate initialAPIs={initialAPIs} />
      </ApiProvider>
    );

    const restfulCheckbox = screen.getByLabelText("RESTful");
    const grpcCheckbox = screen.getByLabelText("gRPC");

    expect(restfulCheckbox.checked).toBe(true);
    expect(grpcCheckbox.checked).toBe(false);

    fireEvent.click(grpcCheckbox);

    expect(grpcCheckbox.checked).toBe(true);
  });
});
