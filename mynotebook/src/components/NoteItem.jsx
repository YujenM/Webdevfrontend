import React , { useContext }  from 'react';
import notecontext from '../context/notes/Notecontext';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
function NoteItem(props) {
    const context=new useContext(notecontext);
    const {deletenote}=context;
    // const {editnote}=context;
    const { note,updateNote } = props;
    const deletenotes=()=>{
        deletenote(note._id);
        props.showalert("Note has been Deleted","success");
        // props.showAlert("Fill all the fields before submitting","warning")
    }
    return (
        <>
        <div className="notebook-card">
            <div className="notebook-card-header">
                <div className="title">{note.title}</div>
                <div className="icons">
                    <FontAwesomeIcon icon={icon.faTrash} className="icon" onClick={deletenotes} />
                    <FontAwesomeIcon icon={icon.faPenToSquare}  className="icon" onClick={()=>{updateNote(note)}} />
                </div>
            </div>
            <div className="description">{note.description}</div>
            <div className="description font-bold">Tag: {note.tag}</div>
            <div className="date">{note.date}</div>
        </div>
        </>
    );
}

export default NoteItem;
