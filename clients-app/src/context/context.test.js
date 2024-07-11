import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ApiProvider, useApiContext } from "./context";

const MockComponent = () => {
  const { name, experience, skills, setName, setExperience, setSkills } =
    useApiContext();

  return (
    <div>
      <span data-testid="name">{name}</span>
      <span data-testid="experience">{experience}</span>
      <ul>
        {skills.map((skill, index) => (
          <li key={index} data-testid={`skill-${index}`}>
            {skill}
          </li>
        ))}
      </ul>
      <button onClick={() => setName("John Doe")}>Set Name</button>
      <button onClick={() => setExperience("5 anos")}>Set Experience</button>
      <button onClick={() => setSkills(["React", "Node.js"])}>
        Set Skills
      </button>
    </div>
  );
};

test("ApiProvider fornece valores iniciais corretos e funções de atualização", () => {
  render(
    <ApiProvider>
      <MockComponent />
    </ApiProvider>
  );

  expect(screen.getByTestId("name")).toHaveTextContent("");
  expect(screen.getByTestId("experience")).toHaveTextContent("");

  fireEvent.click(screen.getByText("Set Name"));
  fireEvent.click(screen.getByText("Set Experience"));
  fireEvent.click(screen.getByText("Set Skills"));

  expect(screen.getByTestId("name")).toHaveTextContent("John Doe");
  expect(screen.getByTestId("experience")).toHaveTextContent("5 anos");
  expect(screen.getByTestId("skill-0")).toHaveTextContent("React");
  expect(screen.getByTestId("skill-1")).toHaveTextContent("Node.js");
});
