import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApiProvider } from "../context/context";
import useApi from "./useApi";
import * as service from "../service/allFetch";

jest.mock("../service/allFetch");

const TestComponent = () => {
  const { handleSubmit, handleDelete, handleClose, handleClickOpen } = useApi();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
        <label htmlFor="experience">Experience</label>
        <input id="experience" type="text" />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => handleClickOpen({ id: 1, name: "Test User" })}>
        Open
      </button>
      <button onClick={() => handleClose()}>Close</button>
      <button onClick={() => handleDelete({ id: 1 })}>Delete</button>
    </div>
  );
};

test("useApi hook works correctly", async () => {
  service.getCandidates.mockResolvedValueOnce([]);
  service.saveCandidate.mockResolvedValueOnce({});
  service.deleteCandidate.mockResolvedValueOnce({});

  render(
    <ApiProvider>
      <TestComponent />
    </ApiProvider>
  );

  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Experience")).toBeInTheDocument();
  expect(screen.getByText("Submit")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Jane Doe" },
  });
  fireEvent.change(screen.getByLabelText("Experience"), {
    target: { value: "5 years" },
  });
  fireEvent.submit(screen.getByText("Submit"));

  fireEvent.click(screen.getByText("Delete"));

  await waitFor(() => {
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
  });
});
