import React from 'react';
import "./Workout.scss"

export default function Workout({name, sets, reps}) {
  return(
      <div className="workout">
          <div className="workoutName">
              {name}
          </div>
          <div className="sets">
              {sets}
          </div>
          <div className="reps">
              {reps}
          </div>
      </div>
  );
}
