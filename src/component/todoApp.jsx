import React, { useState } from "react";
import "./todoApp.css";

export default function todoApp() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const submitList = (e) => {
    e.preventDefault();
    if (!item || !item.trim()) return;
    setList([...list, item]);
    setItem("");
  };

  const editItem = (index) => {
    if (!item) {
      setItem(list.slice(index, index + 1)[0]);
      const updatedList = [...list.slice(0, index), ...list.slice(index + 1)];
      setList(updatedList);
    }
  };

  return (
    <div className="todo-container">
      <form className="input-section" onSubmit={submitList}>
        <h1>Todo List</h1>

        <input
          type="text"
          name="input"
          value={item}
          onChange={handleChange}
          placeholder="Enter items..."
        />
      </form>
      <ul>
        {list &&
          list.map((value, index) => (
            <li key={index}>
              <div className="list-section">
                <input type="checkbox" />
                <div className="value">{value}</div>
              </div>
              <div className="action-bar">
                <i className="fas fa-edit" onClick={() => editItem(index)}></i>
                <i className="fa fa-trash-alt" aria-hidden="true"></i>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
