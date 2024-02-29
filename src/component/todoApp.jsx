import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "./todoApp.css";

export default function todoApp() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState("");

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todoListStore"));

    if (storedTodoList) {
      setTodoList(storedTodoList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoListStore", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = ({ target: { value } }) => {
    setTask(value);
  };

  const submitList = (e) => {
    e.preventDefault();

    if (!task || !task.trim()) return;

    if (editIndex !== "") {
      const updatedTodoList = todoList.map((item, index) => {
        if (index === editIndex) {
          item.list = task;
          setEditIndex("");
        }
        return item;
      });

      setTodoList(updatedTodoList);
    } else {
      setTodoList([...todoList, { list: task, checked: false }]);
    }

    setTask("");
  };

  const editItem = (index) => {
    if (!task) {
      setTask(todoList[index].list);
      setEditIndex(index);
    }
  };

  const deleteItem = (index) => {
    setTodoList(todoList.filter((data, key) => key !== index));
  };

  const toggleChecked = (index) => {
    const updatedTodo = todoList.map((value, key) => {
      if (key === index) {
        value.checked = !value.checked;
      }
      return value;
    });

    setTodoList(updatedTodo);
  };

  return (
    <div className="todo-container">
      <form className="input-container" onSubmit={submitList}>
        <h1>To-Do List</h1>

        <div className="input-section">
          <input
            type="text"
            name="input"
            value={task}
            onChange={handleChange}
            placeholder="Enter task..."
          />
          <button type="submit">Add</button>
        </div>
      </form>
      <ul>
        {todoList &&
          todoList.map(({ list, checked }, index) => (
            <li key={index}>
              <div className="list-section">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleChecked(index)}
                />
                <div className="value">{list}</div>
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
