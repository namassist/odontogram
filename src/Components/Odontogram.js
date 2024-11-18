import React, { useReducer, useCallback } from "react";
import "./Odontogram.css";
import Teeth from "./Teeth";


function createInitialState() {
  const state = {};
  // Initialize state for all possible tooth numbers (1-85)
  for (let i = 1; i <= 85; i++) {
    state[i] = {
      id: i,
      AMF: {
        center: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      GIF: {
        center: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      COF: {
        center: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      FIS: {
        center: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      INL: {
        center: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      ONL: {
        center: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      MIS: 0,
      FMC: 0,
      POC:0,
      MPC:0,
      RCT:0,
      IPX:0,
      PON:0,
      ABU:0,
      RRX: 0,
      CFR: 0,
      MEB: 0,  
      POB: 0,
      O:0,
      M:0,
      D:0,
      V:0,
      L:0,
      SOU:0,
      NON:0,
      UNE:0,
      PRE:0,
      IMV:0,
      ANO:0,
      DIA:0,
      ATT:0,
      ABR:0,
      CAR:0,
      NVT:0,
      PRD:0,
      FLD:0,
      ACR:0
    };
  }
  return state;
}

function odontogramReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TOOTH":
      console.log('Odontogram received update for tooth:', action.toothId, action.toothState);
      const newState = {
        ...state,
        [action.toothId]: action.toothState
      };
      console.log('New odontogram state after update:', newState[action.toothId]);
      return newState;
    default:
      return state;
  }
}



function Odontogram() {
  const [odontogramState, dispatch] = useReducer(odontogramReducer, null, createInitialState);

  const handleToothUpdate = useCallback((id, toothState) => {
    dispatch({
      type: "UPDATE_TOOTH",
      toothId: id,
      toothState      
    });
    console.log(`Odontogram state after update:`, odontogramState);

  }, []);

  const handleSaveOdontogram = async () => {
    try {
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(odontogramState)
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to save odontogram');
      // }
      
      // const data = await response.json();
      console.log('Odontogram saved successfully:', odontogramState);
    } catch (error) {
      console.error('Error saving odontogram:', error);
    }
  };
  return (
    <div className="Odontogram">

      <button 
        onClick={handleSaveOdontogram}
        className="save-button" // Add appropriate styling
      >
        Save Odontogram
      </button>

      <svg version="1.1" height="50%" width="100%">
        {/* upper teeth */}
        <Teeth
          labelPlacement="top"
          start={18}
          end={14}
          x={0}
          y={10}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          labelPlacement="top"
          toothType="front"
          start={13}
          end={11}
          x={100}
          y={10}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          labelPlacement="top"
          toothType="front"
          start={21}
          end={23}
          x={170}
          y={10}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          labelPlacement="top"
          start={24}
          end={28}
          x={230}
          y={10}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />

        <Teeth
          labelPlacement="top"
          start={55}
          end={54}
          x={60}
          y={50}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          labelPlacement="top"
          toothType="front"
          start={53}
          end={51}
          x={100}
          y={50}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          labelPlacement="top"
          toothType="front"
          start={61}
          end={63}
          x={170}
          y={50}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          labelPlacement="top"
          start={64}
          end={65}
          x={230}
          y={50}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />

        {/* lower teeth */}
        <Teeth
          start={85}
          end={84}
          x={60}
          y={90}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          toothType="front"
          start={83}
          end={81}
          x={100}
          y={90}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          toothType="front"
          start={71}
          end={73}
          x={170}
          y={90}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          start={74}
          end={75}
          x={230}
          y={90}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />

        <Teeth
          start={48}
          end={44}
          x={0}
          y={130}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          toothType="front"
          start={43}
          end={41}
          x={100}
          y={130}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          toothType="front"
          start={31}
          end={33}
          x={170}
          y={130}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
        <Teeth
          start={34}
          end={38}
          x={230}
          y={130}
          handleChange={handleToothUpdate}
          teethState={odontogramState}
        />
      </svg>
    </div>
  );
}

export default Odontogram;
