const Button = ({
  title = "",
  onclick = () => {},
  disabled = false,
}: {
  title?: string;
  onclick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`button-wrapper ${disabled ? "disabled" : ""}`}
      onClick={() => {
        if (!disabled) {
          onclick();
        }
      }}
    >
      {title}
    </div>
  );
};

export default Button;
