import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorMessageContainer } from "./ErrorMessageContainer.jsx";

describe("ErrorMessageContainer", () => {
  it("displays one error", () => {
    const errors = {
      name: {
        type: "required",
      },
    };
    render(<ErrorMessageContainer errors={errors} errorNames={["name"]} />);
    const errorMessages = screen.getAllByTestId("error-message");
    expect(errorMessages.length).toEqual(1);
    expect(errorMessages[0]).toHaveTextContent("This field is required");
  });

  it("doesn't display an error that has not been specified", () => {
    const errors = {
      name: {
        type: "required",
      },
    };
    render(<ErrorMessageContainer errors={errors} errorNames={["age"]} />);
    expect(screen.queryByTestId("error-message-container")).toBe(null);
  });

  it("displays multiple errors", () => {
    const errors = {
      name: {
        type: "required",
      },
      surname: {
        type: "custom",
        message: "surname must be less than 256 characters long",
      },
      age: {
        type: "custom",
        message: "age must be an integer",
      },
    };
    render(
      <ErrorMessageContainer
        errors={errors}
        errorNames={["name", "surname", "age"]}
      />,
    );
    const errorMessages = screen.getAllByTestId("error-message");
    expect(errorMessages.length).toEqual(3);
    expect(errorMessages[0]).toHaveTextContent("This field is required");
    expect(errorMessages[1]).toHaveTextContent(
      "surname must be less than 256 characters long",
    );
    expect(errorMessages[2]).toHaveTextContent("age must be an integer");
  });
});
