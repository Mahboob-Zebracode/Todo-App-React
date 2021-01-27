import React, { useState, useEffect } from "react";
import "./App.css";
//Importing Components
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodos, setFilterTodos] = useState([]);
  //Run once ater load
  useEffect(() => {
    getLocalTodos();
  }, []);
  // Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //Funcitons
  const filterHandler = ()=>{
    switch(status) {
      case 'completed':
        setFilterTodos(todos.filter(todo=> todo.completed === true));
        break;
      case 'uncompleted' :
        setFilterTodos(todos.filter(todo=> todo.completed === false))
        break;
      default: 
        setFilterTodos(todos)
        break;
    }
  };

  // Save to Local
  const saveLocalTodos = () =>{
      localStorage.setItem('todos', JSON.stringify(todos))
  }
  const getLocalTodos = ()=>{
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    }else {
     let todoLocal = JSON.parse(localStorage.getItem('todos'));
     setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1> My Todo List</h1>{" "}
      </header>{" "}
      <Form 
      todos={todos} 
      setInputText={setInputText} 
      inputText={inputText} 
      setTodos={setTodos} 
      setStatus = {setStatus}
      />
      <TodoList  
      setTodos={setTodos} 
      todos={todos} 
      filterTodos= {filterTodos}
      />
    </div>
  );
}

export default App;
