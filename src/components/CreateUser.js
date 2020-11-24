import React from 'react'
import axios from "axios"
import { useState } from 'react'


const CreateUser = () => {

    const [state, setState] = useState({
        username:""
    })
    const {username} = state

    const handleUsername = (event) => {
        let value = event.target.value;
        setState(prevState=>{
          return {...prevState, username:value}
          })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
          username
        }
        
        axios.post("http://localhost:5000/users/add", user)
          .then(res => console.log(res.data))

        setState({username: ""})
        window.location = "/create"
         
    }
    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={handleUsername}
                    />
                </div>
                <div>
                    <input type="submit" value="Create User" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default CreateUser
