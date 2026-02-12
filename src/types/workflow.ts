export type FormInputParam = {
  type:
    | "string"
    | "number"
    | "boolean"
    | "options"
    | "multiOptions"
    | "json"
    | "array"
    | "date"
    | "datetime";
  label: string;
  name: string;
  addOptions?: Array<{ option: string }> | string;
  description?: string;
  required?: boolean;
  optional?: boolean;
  default?: string | number | boolean | string[] | Record<string, unknown>[];
  multiline?: boolean;
  rows?: number;
  array?: FormInputParam[];
};

export type FormInputValue =
  | string
  | number
  | boolean
  | string[]
  | Record<string, unknown>[]
  | Record<string, unknown>
  | null;

export type FormInputValues = Record<string, FormInputValue>;
