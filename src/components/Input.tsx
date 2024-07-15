import { ChangeEvent, KeyboardEvent } from "react";

const Input = ({
  placeholder = "",
  onchange = () => {},
  reference = null,
  save = () => {},
}: {
  placeholder?: string;
  onchange?: (event: ChangeEvent<HTMLInputElement>) => any;
  reference?: React.MutableRefObject<HTMLInputElement | null> | null;
  save?: (event: KeyboardEvent<HTMLInputElement>) => any;
}) => {
  return (
    <div className="input-wrapper">
      <input
        ref={reference != null ? reference : undefined}
        type="text"
        placeholder={placeholder}
        onChange={onchange}
        onKeyUp={save}
      />
    </div>
  );
  onchange;
};

export default Input;
