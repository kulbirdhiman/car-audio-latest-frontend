interface ValidationError {
  path: string;
  msg: string;
}

export const mapServerErrors = (
  errors: ValidationError[] | unknown,
  setErrors: (errors: Record<string, string>) => void
): void => {
  if (!Array.isArray(errors)) {
    setErrors({});
    return;
  }
  const formattedErrors = errors.reduce((acc, error) => {
    if (
      typeof error === "object" &&
      error !== null &&
      "path" in error &&
      "msg" in error
    ) {
      acc[error.path as string] = error.msg as string;
    }
    return acc;
  }, {} as Record<string, string>);

  setErrors(formattedErrors);
};

export const addSlugField = (
  fields: {
    name: string;
    type: string;
    label: string;
    placeholder: string;
    options?: any[];
  }[]
) => {
  const newFields = [...fields]; // Create a copy of the array
  newFields.splice(1, 0, {
    name: "slug",
    type: "text",
    label: "Slug",
    placeholder: "Enter slug...",
  });
  return newFields;
};
