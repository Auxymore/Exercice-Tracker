import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const EditExercise = (props) => {

    const [exercise, setExercise] = useState({
        username:"",
        description: "",
        duration: 0,
        date: new Date(),
        users:[]
    })

    const {username, description, duration, date, users} = exercise
    const userEl = useRef(null)

    const fetchUsers = () => {
      return axios.get('http://localhost:5000/users/')
    } 
    const fetchExercises = () =>{
      return axios.get('http://localhost:5000/exercices/'+props.match.params.id)
    }

    useEffect(() => {
      let mounted = true; 
      if(mounted){ 
        axios.all([fetchUsers(), fetchExercises()])
          .then(axios.spread((getUser, getExercice) =>{
            console.log(getUser)
            console.log(getExercice.data)
            setExercise({
              username: getExercice.data.username,
              description: getExercice.data.description,
              duration: getExercice.data.duration,
              date: new Date(getExercice.data.date),
              users: getUser.data.map(user => user.username)
            })  
      })
      )
      .catch((error) =>{
        console.log(error)
      })
        console.log("has been called");
      }
      return () => mounted = false;  
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
        console.log(exercises)
         
        axios.post("http://localhost:5000/exercices/update/"+props.match.params.id, exercises)
          .then(res => console.log(res.data))
          window.location = "/"
    }
    
    return ( 
        <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
              ref={userEl}
              required
              className="form-control"
              value={username || ""}
              onChange={handleUsername}>
              {
                users.map(function(user) {
                  console.log(users)
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
              value={description || ""}
              onChange={handleDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={duration || 0}
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
                 value="Edit  Exercise Log" 
                 className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
}

export default EditExercise


// axios.get('http://localhost:5000/exercices/'+props.match.params.id)
//         .then(response => {
//           setExercise({
//             username: response.data.username,
//             description: response.data.description,
//             duration: response.data.duration,
//             date: new Date(response.data.date)
//           })   
//         })
//         .catch(function (error) {
//           console.log(error);
//         })
          
//       axios.get('http://localhost:5000/users/')
//           .then(response => {
//             if (response.data.length > 0) {
//               setExercise({
//                 users: response.data.map(user => user.username),
//               })
//             }
//           })
//           .catch((error) => {
//             console.log(error);
//           })