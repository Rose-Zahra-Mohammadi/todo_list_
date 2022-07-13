import React, {useState} from "react";
import './App.css';
import Todo from "./components/Todo";

function App() {
  /*
  Below array destructure syntax is equivalent to:
  const newTodo = newTodoStateArr[0];
  const setnewTodo = newTodoStateArr[1];
  */
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodosSubmit =(event) =>{
    event.preventDefault();

    if (newTodo.length === 0) {
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false
    }
    // setTodos and pass in a brand new array containing all current tools plus 1 more.
    setTodos([...todos, todoItem]);
    setNewTodo("");
  };

  const handleTodoDelete = (delId) => {
    const filteredTodos = todos.filter((todo, i) =>{
      return i != delId;
    });
    setTodos(filteredTodos);
  };

  const handleToggleComplete = (idx) =>{
    const updatedTodos = todos.map((todo,i) =>{
      if (idx === i) {
        todo.complete = !todo.complete;

        // To avoid mutating the todo directly. do this:
        // const updatedTodo = {...todo, complete: !todo.complete};
        // return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div style={{textAlign: "center"}}>
      <form onSubmit={(event) =>{
        handleNewTodosSubmit(event);
      }}>
        <input onChange={(event) => {
          setNewTodo(event.target.value);
        }}type= "text" value={newTodo}/>
        <div>
          <button>Add</button>
        </div>
      </form>

      <hr/>

      {todos.map((todo, i) =>{
        
          return (
            <Todo key ={i} i={i} todo = {todo} handleToggleComplete ={handleToggleComplete} handleTodoDelete ={handleTodoDelete}/>
 
          );
        })}
    </div>
  );
}

export default App;
