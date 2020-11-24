import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import Exercise from "./Exercise"

const ExercisesList = () => {
    const [state, setState] = useState({
        exercises: []
    })

    useEffect(()=> {
        axios.get("http://localhost:5000/exercices/")
          .then(res => {
              setState({
                  exercises:res.data
              })
              console.log("exercises have been loaded")
              console.log(state.exercises, res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },[])

    function deleteExercise(id){
        axios.delete("http://localhost:5000/exercices/"+id)
          .then(res => console.log(res.data))
          .catch((err) => {
            console.log(err)
          })
          setState({
              exercises: state.exercises.filter(el => el._id !== id)
          })
    }
    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-list">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {state.exercises.map(currentExercise => {
                        return (
                            <Exercise
                                exercises={currentExercise}
                                deleteExercise={deleteExercise}
                                key={currentExercise._id}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList
