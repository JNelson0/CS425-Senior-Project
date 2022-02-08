import React from 'react';
import "./Workout.scss"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Workout({name, sets, reps, handleDelete}) {


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
          
          <DeleteForeverIcon className="trash" onClick={handleDelete} />
      </div>
  );
}
