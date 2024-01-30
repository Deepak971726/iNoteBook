import React, { useState,useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note, setnote] = useState({title:"",discription:"",tag:""})
    const handleOnClink=(e)=>{
        e.preventDefault();
        addNote(note);
        // setnote({title:"",discription:"",tag:""})
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
          <input type="text" className="form-control" name='title' id="tile" aria-describedby="emailHelp"  onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">Descrition</label>
          <input type="text" className="form-control" id="discription" name='discription' onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
        </div>
         
        <button type="submit" className="btn btn-primary" onClick={handleOnClink}>Add a Note</button>
      </form>
    </div>
  )
}

export default AddNote
