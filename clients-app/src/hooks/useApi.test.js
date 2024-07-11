import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApiProvider, useApiContext } from "../context/context";
import useApi from "./useApi";
import * as service from "../service/allFetch";

jest.mock("../service/allFetch");

const TestComponent = () => {
  const { handleSubmit, handleDelete, handleClose, handleClickOpen } = useApi();

  const { users, name, experience, setName, setExperience } = useApiContext();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="experience">Experience</label>
        <input
          id="experience"
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => handleClickOpen({ id: 1, name: "Test User" })}>
        Open
      </button>
      <button onClick={() => handleClose()}>Close</button>
      <button onClick={() => handleDelete({ id: 1 })}>Delete</button>
      <div data-testid="users">
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
};

test("useApi hook works correctly", async () => {
  const mockCandidates = [{ id: 1, name: "John Doe" }];
  service.getCandidates.mockResolvedValueOnce(mockCandidates);
  service.saveCandidate.mockResolvedValueOnce({});
  service.deleteCandidate.mockResolvedValueOnce({});

  render(
    <ApiProvider>
      <TestComponent />
    </ApiProvider>
  );

  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Jane Doe" },
  });
  fireEvent.change(screen.getByLabelText("Experience"), {
    target: { value: "5 years" },
  });
  fireEvent.submit(screen.getByText("Submit"));

  await waitFor(() => {
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Delete"));

  await waitFor(() => {
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
