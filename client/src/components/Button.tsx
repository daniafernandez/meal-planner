interface Props {
  buttonLabel: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success'|'close';
  onClick: () => void;
}


export const Button = ({ buttonLabel, onClick, color = 'primary'}: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={onClick}
    >
      {buttonLabel}
    </button>
  );
};

export default Button;
