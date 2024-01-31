import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    // const context = useContext(noteContext)
    // const {} = context;
    const {note,updateNote} = props;
    const context = useContext(noteContext)
    const {deleteNote} = context;

    const onClickDelete=(e)=>{
        deleteNote(e);
        props.showAlert("Your Note has been Deleted Successfully","danger");
    }
     
  return (
    <div className='col-md-3'>
         
        <div className="card my-3">    
            
            <div className="card-body">
                <div className='d-flex align-items-center mx-2'>
                     
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
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
