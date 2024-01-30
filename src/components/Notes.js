import React,{useContext,useEffect,useRef,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {
    const context = useContext(noteContext)
    const {notes,getNotes,editNote} = context;
    const [note, setnote] = useState({id:"",title:"",discription:"",tag:""})
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    let refClose = useRef(null);
    const updateNote=(e)=>{
        // console.log("updatenote chal rha hai")
        setnote(e);
        ref.current.click();
    }   
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    const handleOnClink=(e)=>{
        console.log("updating the note ...............")
        editNote(note._id,note.title,note.discription,note.tag)    
        refClose.current.click();     
         
        
    }

  return (
    <> 
    <AddNote/>
        {/* <!-- Button trigger modal --> */}


        
    <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" name='title' id="tile" aria-describedby="emailHelp" value={note.title}  onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">Description</label>
          <input type="text" className="form-control" id="discription" name='discription' value={note.discription} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
        </div>
         
        {/* <button type="submit" className="btn btn-primary" onClick={handleOnClink}>Add a Note</button> */}
      </form>
        </div>
        <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleOnClink}>Update Note</button>
        </div>
        </div>
    </div>
    </div>
   
    <div className='row my-3'> 
      <h1>Your Notes</h1>
      {notes.map((note)=>{
        return <Noteitem key={note._id} updateNote = {updateNote} note={note} />
      })}
    </div>
    </>
  )
}

export default Notes
