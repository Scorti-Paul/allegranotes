export interface Props {
  show: function;
  setShow: function;
  modalTitle?: string;
  modalDesc?: string;
  size?: number;
  children: JSX.Element;
}