import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    // const context = useContext(noteContext)
    // const {} = context;
    const {note} = props;
    const context = useContext(noteContext)
    const {deleteNote,editNote} = context;

    const onClickDelete=(e)=>{
        deleteNote(e);


    }
    const onClickEdit=(id )=>{
        // deleteNote()
        // editNote()
    }
  return (
    <div className='col-md-3'>
         
        <div className="card my-3">    
            
            <div className="card-body">
                <div className='d-flex align-items-center mx-2'>
                     
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>onClickEdit(note._id)}></i>
                    <i className="fa-solid fa-trash-can" onClick={()=>onClickDelete(note._id)}></i>

                </div>
             
                <p className="card-text">{note.discription}.</p>
                {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                 
            </div>
        </div>
      
    </div>
  )
}

export default Noteitem
