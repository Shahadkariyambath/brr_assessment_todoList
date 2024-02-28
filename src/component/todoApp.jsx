import React from "react";
import "./todoApp.css";

export default function todoApp() {
  const [list, setList] = React.useState([]);

  return (
    <div className="todo-container">
      <form className="input-section">
        <h1>Todo List</h1>
      </form>
    </div>
  );
}
