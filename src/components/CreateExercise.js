import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const CreateExercise = () => {

    const [exercise, setExercise] = useState({
        username:"",
        description: "",
        duration: 0,
        date: new Date(),
        users:[]
    })

    const {username, description, duration, date, users} = exercise
    const inputEl = useRef(null)
  
    const loadDefaultUser = () => {
      axios.get("http://localhost:5000/users")
        .then(res => {
          if(res.data.length > 0){
            setExercise(() => {
              return {
                users: res.data.map(user => user.username),
                username: res.data[0].username
          }
              }) 
          }
        })    
    }
    useEffect(() => {
      loadDefaultUser()
      console.log("has been called")
    },[])

    const handleUsername = (event) => {
        let value = event.target.value;
        setExercise(prevState=>{
          return {...prevState, username:value}
          })
    }
    const handleDescription = (event) => {
        let value = event.target.value;
        setExercise(prevState=>{
          return {...prevState, description:value}
          })
    }
    const handleDuration = (event) => {
        let value = event.target.value;
        setExercise(prevState=>{
          return {...prevState, duration:value}
          })
    }
    const handleDate = (date) => {
        setExercise(prevState =>{
          return{...prevState, date: date}
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const exercises = {
          username,
          description,
          duration,
          date
        }
        axios.post("http://localhost:5000/exercices/add", exercises)
          .then(res => console.log(res.data)) 

          window.location = "/"
    }
    
    return ( 
        <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
              ref={inputEl}
              required
              className="form-control"
              value={username}
              onChange={handleUsername}>
              {
                users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input type="text"
              required
              className="form-control"
              value={description}
              onChange={handleDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={duration}
              onChange={handleDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={handleDate} />     
          </div>
        </div>
        <div className="form-group">
          <input type="submit" 
                 value="Create Exercise Log" 
                 className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
}

export default CreateExercise
