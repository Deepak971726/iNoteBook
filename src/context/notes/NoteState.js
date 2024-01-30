// import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";


const NoteState =(props)=>{
   const host = "http://localhost:5000"
    const noteInitial=[]

    const [notes,setNotes] =useState(noteInitial)
    // get all notes

    const getNotes=async()=>{
      //todo api call
      const url = `${host}/api/notes/fetchallnotes`
    const respose = await fetch(url,{
      method:"GET",
      headers:{
        // "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNzNiNmY2ZDNkMjVhMzA2MjZiMWQ5In0sImlhdCI6MTcwNjUwNzY4Nn0.T_Saqw7lh3uCRgfQHdqx0DVy3M23aI05zcarMWXsu4w"
      }
      // body: JSON.stringify(e)
    })
    const json = await respose.json();
    // console.log(json);
    setNotes(json)
  //  const json= respose.json
    }
  //delete a note
  const deleteNote=async(id)=>{
    const newNotes = notes.filter((note)=>{return note._id!==id});
    // console.log("deleting the note id:"+id);
    setNotes(newNotes);
    const url = `${host}/api/notes/deletenote/${id}`
    const respose = await fetch(url,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNzNiNmY2ZDNkMjVhMzA2MjZiMWQ5In0sImlhdCI6MTcwNjUwNzY4Nn0.T_Saqw7lh3uCRgfQHdqx0DVy3M23aI05zcarMWXsu4w"
      }
      // body: JSON.stringify(e)
    })
    // const json = await respose.json();
    
  }

    



    // add a note
      const addNote=async(e)=>{
        //todo api call
        const url = `${host}/api/notes/addnote`
      const response = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNzNiNmY2ZDNkMjVhMzA2MjZiMWQ5In0sImlhdCI6MTcwNjUwNzY4Nn0.T_Saqw7lh3uCRgfQHdqx0DVy3M23aI05zcarMWXsu4w"
        },
        body: JSON.stringify(e)
      })
    //  const json= respose.json();


        
        console.log("adding a note")
        const note ={ "_id": "65b784aaa5727ea8a0b8b2ea8",
        "user": "65b73b6f6d3d25a30626b1d9",
        "title":   e.title,
        "discription": e.discription,
        "tag": "fcu",
        "data": "2024-01-29T10:57:46.225Z",
        "__v": 0}
        setNotes(notes.concat(note))
      }
    //delete a note
    
    // Edit a note
    const editNote=async(id,title,discription,tag)=>{
      //API call

       

      const url = `${host}/api/notes/updatenote/${id}`
      const response = await fetch(url,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNzNiNmY2ZDNkMjVhMzA2MjZiMWQ5In0sImlhdCI6MTcwNjUwNzY4Nn0.T_Saqw7lh3uCRgfQHdqx0DVy3M23aI05zcarMWXsu4w"
        },
        body: JSON.stringify({title,discription,tag})
      })


      let newNote = await  JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNote.length; index++) {
        if(newNote[index]._id===id){
          newNote[index].title = title
          newNote[index].discription = discription
          newNote[index].tag = tag
          break;
        }
        
      }
      setNotes(newNote);
      
    }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )


}

export default NoteState
