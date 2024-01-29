// import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";


const NoteState =(props)=>{
   
    const noteInitial=[
        {
          "_id": "65b7567b90a86a6b137e7448",
          "user": "65b73b6f6d3d25a30626b1d9",
          "title": "this is a new note",
          "discription": "kya karega description leke",
          "tag": "for testing purpose",
          "data": "2024-01-29T07:40:43.324Z",
          "__v": 0
        },
        {
          "_id": "65b7845b5727ea8a0b8b2ea3",
          "user": "65b73b6f6d3d25a30626b1d9",
          "title": "error",
          "discription": "error kyu aa rha hai bro please tell abou that",
          "tag": "love errors",
          "data": "2024-01-29T10:56:27.230Z",
          "__v": 0
        },
        {
          "_id": "65b784835727ea8a0b8b2ea5",
          "user": "65b73b6f6d3d25a30626b1d9",
          "title": "title is herer",
          "discription": "description is here but is not useful",
          "tag": "fcu",
          "data": "2024-01-29T10:57:07.575Z",
          "__v": 0
        },
        {
          "_id": "65b784aa5727ea8a0b8b2ea8",
          "user": "65b73b6f6d3d25a30626b1d9",
          "title": "fouth times",
          "discription": "what should i do i feel like i want to die",
          "tag": "fcu",
          "data": "2024-01-29T10:57:46.225Z",
          "__v": 0
        }
      ]

    const [notes,setNotes] =useState(noteInitial)
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )


}

export default NoteState
