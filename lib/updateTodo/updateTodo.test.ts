import updateTodo from "./updateTodo";

import { useMockServer } from "@/__tests__/__mocks__/server";
import { todoFailHandlers } from "@/__tests__/__mocks__/todoFailHandlers";
import { todoSuccessHandlers } from "@/__tests__/__mocks__/todoSuccessHandlers";

const mockTodo = {
  userId: 1,
  title: "Wave hello! 👋",
  completed: false,
  id: 1,
};

describe("updateTodo lib function", () => {
  useMockServer(todoSuccessHandlers);

  it("should return the updated todo item", async () => {
    const updatedTodo = await updateTodo(mockTodo);
    expect(updatedTodo).toEqual({
      userId: 1,
      title: "Wave hello! 👋",
      completed: true,
      id: 1,
    });
  });
});

describe("failed updateTodo lib function", () => {
  useMockServer(todoFailHandlers);

  it("should fail with an error", async () => {
    expect.assertions(1);
    try {
      await updateTodo(mockTodo);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual("Failed to update todo");
      }
    }
  });
});
