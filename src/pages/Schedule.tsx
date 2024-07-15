import { useRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Popup from "../components/Popup";
import Checkbox from "../components/Checkbox";

const Schedule = () => {
  const [data, setdata] = useState<
    { status: boolean; title: string; id: number }[]
  >([]);
  const [title, setTitle] = useState("");
  const [isopen, setopen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleClose = () => {
    if (ref.current) {
      ref.current.value = "";
    }
    setopen(false);
    setTitle("");
  };
  const handleAdd = () => {
    setdata([...data, { status: false, title, id: data.length + 1 }]);
    handleClose();
  };
  return (
    <>
      <div className="schedule-container">
        <div className="tablewrap">
          <table>
            <tbody>
              {data.map((item, index) => (
                <Element key={index} item={item} />
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="add-todo"
          onClick={() => {
            setopen(true);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z" />
            <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z" />
          </svg>
          <p>Add item</p>
        </div>
      </div>
      <Popup onclose={handleClose} state={isopen}>
        <h2>Add Todo</h2>
        <Input
          reference={ref}
          placeholder="Enter Todo"
          save={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
          onchange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className="input-flexbox">
          <Button title="Cancel" onclick={handleClose} />
          <Button title="Save" disabled={!title} onclick={handleAdd} />
        </div>
      </Popup>
    </>
  );
};
const Element = ({
  item,
  handleUpdate = () => {},
  handleDelete = () => {},
}: {
  item: { status: boolean; id: number; title: string };
  handleUpdate?: (val: number, e: object) => void;
  handleDelete?: (val: number) => void;
}) => {
  const [visible, setvisible] = useState(true);
  return (
    <tr className={visible ? "" : "hidden"}>
      <td>
        <Checkbox
          value={item.status}
          onchange={(val) => handleUpdate(item.id, { status: val })}
        />
      </td>
      <td>
        <p>{item.title}</p>
      </td>
      <td>
        <svg
          onClick={() => {
            handleDelete(item.id);
            setvisible(false);
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.7123 16.7729L7.22699 8.28765C6.93708 7.99773 6.93708 7.5169 7.22699 7.22699C7.51691 6.93707 7.99774 6.93707 8.28765 7.22699L16.7729 15.7123C17.0628 16.0022 17.0628 16.483 16.7729 16.7729C16.483 17.0628 16.0022 17.0628 15.7123 16.7729Z"
            fill="#292D32"
          />
          <path
            d="M7.22706 16.7729C6.93715 16.483 6.93715 16.0022 7.22706 15.7123L15.7123 7.22699C16.0023 6.93707 16.4831 6.93707 16.773 7.22699C17.0629 7.5169 17.0629 7.99773 16.773 8.28765L8.28772 16.7729C7.99781 17.0628 7.51698 17.0628 7.22706 16.7729Z"
            fill="#292D32"
          />
        </svg>
      </td>
    </tr>
  );
};
export default Schedule;
