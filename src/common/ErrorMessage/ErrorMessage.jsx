import "./ErrorMessage.scss";

/**
 * Helper component for displaying form errors. It will only display if there is an error for the field with
 * the specified name.
 * @param {Object} props
 * @param {Partial<import("react-hook-form").FieldErrorsImpl<import("react-hook-form").DeepRequired<import("react-hook-form").FieldValues>>> & {root?: Record<string, import("react-hook-form").GlobalError> & import("react-hook-form").GlobalError}} props.errors The `errors` object from React Hook Forms
 * @param {string} props.name The name of the specific field we want to show the error for
 * @returns {JSX.Element|undefined}
 */
export const ErrorMessage = ({ errors, name }) => {
  if (!errors[name]?.type) {
    return;
  }
  /** @type {string|undefined} */
  // @ts-ignore
  let errorMessage = errors[name]?.message;

  if (!errorMessage) {
    if (errors[name]?.type === "required") {
      errorMessage = "This field is required";
    } else {
      errorMessage = "This field is invalid";
    }
  }
  return (
    <p data-testid="error-message" className="error">
      {errorMessage}
    </p>
  );
};
