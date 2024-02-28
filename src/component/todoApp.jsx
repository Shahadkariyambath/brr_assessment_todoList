import React from "react";
import "./todoApp.css";

export default function todoApp() {
  const [item, setItem] = React.useState("");
  const [list, setList] = React.useState([]);

  const handleChange = (e) => {
    // console.log(input);
    setItem(e.target.value);
  };

  const submitList = (e) => {
    e.preventDefault();
    if (!item) return;
    setList([...list, item]);
    setItem("");
  };

  console.log(list);
  return (
    <div className="todo-container">
      <form className="input-section" onSubmit={(e) => submitList(e)}>
        <h1>Todo List</h1>

        <input
          type="text"
          name="input"
          value={item}
          onChange={(e) => handleChange(e)}
          placeholder="Enter items..."
        />
      </form>
      <ul>
        {list &&
          list.map((value, key) => (
            <li key={key}>
              <div className="list-section">
                <input type="checkbox" />
                <div className="value">{value}</div>
              </div>
              <div className="action-bar">
                <i className="fas fa-edit editIcon"></i>
                <i className="fa fa-trash-alt" aria-hidden="true"></i>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
