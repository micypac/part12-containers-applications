import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import ToDo from "./ToDo";

test("todo renders text", () => {
  const todoObj = {
    text: "Complete containers",
    done: false,
  };

  const deleteTodo = jest.fn();
  const completeTodo = jest.fn();

  render(
    <ToDo todo={todoObj} deleteTodo={deleteTodo} completeTodo={completeTodo} />
  );

  const element = screen.getByText("Complete containers");
  expect(element).toBeDefined();
});
