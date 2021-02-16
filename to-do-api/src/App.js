import "./css/App.css";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";

function App() {
//1. Create a new user
let createNewUser = async () => {

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([])
  }
  const url = "https://assets.breatheco.de/apis/fake/todos/user/francisco"
  const request = await fetch(url, settings)
  
  const json = await request.json()
  const user = json
  console.log(user, "<-create a new user")
  }

//2. Get list of todo's for a particular user
let getListToDo = async () => {

  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  }
  const url = "https://assets.breatheco.de/apis/fake/todos/user/francisco"
  const request = await fetch(url, settings)
  
  const json = await request.json()
  const toDoList = json
  setList(toDoList)
  console.log(toDoList, "<-to do list")
  }
  

//3. Update the entire list of todo's of a particular user
let updateTheToDo = async () => {

  const settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(list)
  }
  const url = "https://assets.breatheco.de/apis/fake/todos/user/francisco"
  const request = await fetch(url, settings)

  const json = await request.json()
  const updateTodo = json
  console.log(updateTodo, "<-update to do list")
  getListToDo()  
  }
 

//4. Delete a user and all of their todo's
let deleteUserAndToDo = async () => {

  const settings = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }
  const url = "https://assets.breatheco.de/apis/fake/todos/user/francisco"
  const request = await fetch(url, settings)
  
  const json = await request.json()
  const deleteUser = json
  createNewUser()
  getListToDo()
  console.log(deleteUser, "<-delete user and todos")
  }

  const [list, setList] = useState([]);
  const [task, setTask] = useState({label:"", done:false});  
  
  // remove one task
  const removeTask = async (item) => {
    console.log("-Delete-Task-:", item)
    const arrayFilter = await list.filter((i) => i.label !== item)
    setList(arrayFilter)
  }

  useEffect( ()=> {
    createNewUser()
    getListToDo()
  }, [])
 
  return (
    <div className="container">
      <h1>ToDos-API</h1>
      <h4>User: <i>francisco</i></h4>
      <form
        onSubmit={(event) => {
          list.push(task);
          setTask({label:"", done:false});  
          event.preventDefault();
          updateTheToDo()
        }}
      >
        <input
          type="text"
          value={task.label}   
          onChange={(event) => {
            setTask({label:event.target.value, done:false})
          }}
          className="input"
          placeholder="What needs to be done?">
        </input>
      </form>
      <div className="task-list">
        <hr></hr>
        <ul className="list-group list-group-flush">
        {Array.isArray(list) ? (list.map((item, index) => {
          return (
          <li key={index} className="list-group-item">
            {item.label}
              <a type="button" onClick={() => {removeTask(item.label)}}>
                <i className="fa fa-times"/>
              </a> 
          </li>
        );
        })) : (<h3>"No Task, Add a new Task"</h3>)}
        </ul>
        <hr></hr>
        <a type="button" className="btn btn-primary" onClick={() => 
         updateTheToDo()}>Save your Task(s)</a>
         <hr></hr>
        <div className="last" style={{fontSize: "20px"}}>
          <strong>{list.length}</strong>{" "}
          {`${list.length === 1 ? "Element" : "Elements"} left`}
        </div>
        <br></br>
        <a type="button" className="btn btn-danger" onClick={() => 
         deleteUserAndToDo()}>Delete User and To do<i className="fa fa-bomb"></i></a>
      </div>
    </div>
  );
}

export default App;