import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage.jsx";

describe("ErrorMessage", () => {
  it("displays an error for a required field", () => {
    const errors = {
      name: {
        type: "required",
      },
    };
    render(<ErrorMessage errors={errors} name="name" />);
    const element = screen.getByTestId("error-message");
    expect(element).toHaveTextContent("This field is required");
  });

  it("displays a unknown error", () => {
    const errors = {
      name: {
        type: "unknown",
      },
    };
    render(<ErrorMessage errors={errors} name="name" />);
    const element = screen.getByTestId("error-message");
    expect(element).toHaveTextContent("This field is invalid");
  });

  it("displays an error with a message", () => {
    const errors = {
      name: {
        type: "error",
        message: "Name should be less than 256 characters long",
      },
    };
    render(<ErrorMessage errors={errors} name="name" />);
    const element = screen.getByTestId("error-message");
    expect(element).toHaveTextContent(
      "Name should be less than 256 characters long",
    );
  });
});
