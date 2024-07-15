import { useRef, useState } from "react";
import Popup from "../components/Popup";
import Table from "../components/Table";
import { LearningDB } from "../LocalStorageManager";
import Input from "../components/Input";
import Button from "../components/Button";

const Problems = () => {
  const [selectedTable, setSelectedTable] = useState("");
  const [ItemAdder, setItemAdder] = useState({
    name: "",
    value: {
      name: "",
      link: "",
    },
    bool: false,
  });
  const [isTablePopupOpen, setIsTablePopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [placeholder, setplaceholder] = useState("Enter Name");
  const ref = useRef<HTMLInputElement>(null);
  const Nameref = useRef<HTMLInputElement>(null);
  const Linkref = useRef<HTMLInputElement>(null);

  const handleAddPopupClose = () => {
    setIsAddPopupOpen(false);
    setNewTableName("");
    setplaceholder("Enter Name");
    if (ref.current) {
      ref.current.value = "";
    }
  };

  const handleTablePopupClose = () => {
    setIsTablePopupOpen(false);
    setSelectedTable("");
  };

  const handleAddTable = () => {
    if (newTableName) {
      try {
        LearningDB.createTable({ tableName: newTableName, primaryKey: "id" });
        handleAddPopupClose();
      } catch (error: any) {
        setplaceholder(error.message);
      } finally {
        if (ref.current) ref.current.value = "";
      }
    }
  };

  const handleAdd = () => {
    setItemAdder({ ...ItemAdder, name: selectedTable, bool: true });
    setIsTablePopupOpen(false);
    if (Nameref.current) {
      Nameref.current.focus();
    }
  };
  const handleAddClose = () => {
    setItemAdder({
      name: "",
      value: {
        name: "",
        link: "",
      },
      bool: false,
    });
    setIsTablePopupOpen(true);
    if (Nameref.current && Linkref.current) {
      Nameref.current.value = "";
      Linkref.current.value = "";
    }
  };
  const handleAddEntry = () => {
    LearningDB.insert(ItemAdder.name, { ...ItemAdder.value, status: false });
    handleAddClose();
  };
  return (
    <div className="container">
      {LearningDB &&
        LearningDB.listTables().map((tableName, index) => {
          const tableData = LearningDB.select(tableName);
          return (
            <div
              className="item"
              key={index}
              onClick={() => {
                setSelectedTable(tableName);
                setIsTablePopupOpen(true);
              }}
            >
              <h2>{tableName}</h2>
              <p>
                {tableData.filter((item) => item.status).length}/
                {tableData.length}
              </p>
            </div>
          );
        })}

      <div
        className="item item-add"
        onClick={() => {
          setIsAddPopupOpen(true);
          setTimeout(() => {
            if (ref.current) {
              ref.current.focus();
            }
          }, 200);
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z" />
          <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z" />
        </svg>
      </div>

      <Popup onclose={handleAddPopupClose} state={isAddPopupOpen}>
        <h2>Add Path</h2>
        <Input
          reference={ref}
          placeholder={placeholder}
          save={(e) => {
            if (e.key === "Enter") {
              handleAddTable();
            }
          }}
          onchange={(e) => {
            setNewTableName(e.target.value);
          }}
        />
        <div className="input-flexbox">
          <Button title="Cancel" onclick={handleAddPopupClose} />
          <Button
            title="Save"
            disabled={!newTableName}
            onclick={handleAddTable}
          />
        </div>
      </Popup>

      <Popup onclose={handleAddClose} state={ItemAdder.bool}>
        <h2>{ItemAdder.name}: Add Item</h2>
        <Input
          placeholder="Enter Name"
          reference={Nameref}
          onchange={(e) => {
            setItemAdder({
              ...ItemAdder,
              value: { ...ItemAdder.value, name: e.target.value },
            });
          }}
        />
        <Input
          reference={Linkref}
          placeholder="Enter Link"
          onchange={(e) => {
            setItemAdder({
              ...ItemAdder,
              value: { ...ItemAdder.value, link: e.target.value },
            });
          }}
        />
        <div className="input-flexbox">
          <Button title="Cancel" onclick={handleAddClose} />
          <Button
            title="Add"
            disabled={ItemAdder.value.name == "" || ItemAdder.value.link == ""}
            onclick={handleAddEntry}
          />
        </div>
      </Popup>

      <Popup onclose={handleTablePopupClose} state={isTablePopupOpen}>
        <div className="close" onClick={handleTablePopupClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
            />
            <path d="M16.773 15.7124L13.0607 12 16.773 8.28773C17.0629 7.99782 17.0629 7.51699 16.773 7.22707C16.4831 6.93716 16.0022 6.93716 15.7123 7.22707L12 10.9394 8.28769 7.22707C7.99778 6.93716 7.51694 6.93716 7.22703 7.22707C6.93712 7.51699 6.93712 7.99782 7.22703 8.28773L10.9393 12 7.22703 15.7124C6.93712 16.0023 6.93712 16.4831 7.22703 16.773C7.51694 17.0629 7.99778 17.0629 8.28769 16.773L12 13.0607 15.7123 16.773C16.0022 17.0629 16.4831 17.0629 16.773 16.773C17.0629 16.4831 17.0629 16.0023 16.773 15.7124Z" />
          </svg>
        </div>
        <h2>{selectedTable}</h2>
        <Table
          database={LearningDB}
          onadditem={handleAdd}
          tablename={selectedTable}
        />
      </Popup>
    </div>
  );
};

export default Problems;
