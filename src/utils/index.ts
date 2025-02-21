export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: state.isFocused ? "2px solid #6366F1" : "1px solid #DBD3FF",
    borderRadius: "8px",
    boxShadow: state.isFocused ? "0 0 5px rgba(99, 102, 241, 0.5)" : "none",
    "&:hover": {
      borderColor: "#6366F1",
    },
    padding: "6px",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#7B70AF",
    fontStyle: "italic",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#6366F1" : state.isFocused ? "#E0E7FF" : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#7B70AF",
    padding: "10px",
    cursor: "pointer",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#4F46E5", 
  }),
};
