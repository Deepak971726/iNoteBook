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
      // console.log(localStorage.getItem('token'))
    const respose = await fetch(url,{
      method:"GET",
      headers:{
        // "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
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
        "auth-token":localStorage.getItem('token')
      }
      // body: JSON.stringify(e)
    })
    console.log(respose)
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
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title:e.title,discription:e.discription,tag:e.tag})
      })
       const note = await response.json();
        setNotes(notes.concat(note))
        // getNotes();
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
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,discription,tag})
      })
      console.log(response)


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
