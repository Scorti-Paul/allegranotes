export interface InputProps {
  label: string;
  optionalLabel?: boolean;
  type: string | undefined;
  field: InputType;
  required?: boolean;
  name: string;
  value?: string;
  autoComplete?: string;
  placeholder?: string;
  onChange?: (e, params = {}) => void;
  handleShowHidePassword?: (e, params = {}) => void;
  hasShowPassword?: InputHasShowPassword;
  inputLength?: InputLength;
  selectOptions?: Array;
  id?: string;
  disable?: boolean;
  desc?: string;
  children?: JSX.Element;
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number
  // onChange: function
}

type InputType =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "upload";

type InputLength = "small" | "medium" | "large";

type InputHasShowPassword = true | false | "disable";

export interface InputFProps {
  label?: string;
  name?: string;
  value: any;
  onChange: any;
  placeholder: string;
}