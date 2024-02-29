import React, { useState, useEffect } from "react";
import "./todoApp.css";

export default function todoApp() {
  const [item, setItem] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("todoListStore"));
    console.log("count", storedTodo);

    if (storedTodo) {
      setTodo(storedTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoListStore", JSON.stringify(todo));
  }, [todo]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const submitList = (e) => {
    e.preventDefault();
    if (!item || !item.trim()) return;
    setTodo([...todo, { list: item, checked: false }]);
    setItem("");
  };

  const editItem = (index) => {
    if (!item) {
      setItem(todo[index].list);
      setTodo(todo.filter((data, key) => key !== index));
      console.log("editItem", todo);
    }
  };

  const deleteItem = (index) => {
    setTodo(todo.filter((data, key) => key !== index));
    console.log("deleteItem", todo);
  };

  const toggleChecked = (index) => {
    const updatedTodo = todo.map((value, key) => {
      if (key === index) {
        value.checked = !value.checked;
      }
      return value;
    });

    setTodo(updatedTodo);

    console.log("toggleChecked", todo[index].checked);
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
        {todo &&
          todo.map((value, index) => (
            <li key={index}>
              <div className="list-section">
                <input
                  type="checkbox"
                  checked={value.checked}
                  onChange={() => toggleChecked(index)}
                />
                <div className="value">{value.list}</div>
              </div>
              <div className="action-bar">
                <i className="fas fa-edit" onClick={() => editItem(index)}></i>
                <i
                  className="fa fa-trash-alt"
                  onClick={() => deleteItem(index)}
                ></i>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
