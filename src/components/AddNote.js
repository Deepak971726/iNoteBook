import React, { useState,useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note, setnote] = useState({title:"",discription:"",tag:""})
    const handleOnClink=(e)=>{
        e.preventDefault();
        addNote(note);
        setnote({title:"",discription:"",tag:""})
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
     
  return (
    <div className='container my-3'> 
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">title</label>
          <input type="text" className="form-control" name='title' id="tile" aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">Descrition</label>
          <input type="text" className="form-control" id="discription" name='discription' value={note.discription} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label" >Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
        </div>
         
        <button disabled ={note.discription.length<5 || note.title.length<5} type="submit" className="btn btn-primary" onClick={handleOnClink}>Add a Note</button>
      </form>
    </div>
  )
}

export default AddNote
