import React, { useState, useContext } from 'react';
import './Css/Addnotes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import notecontext from '../context/notes/Notecontext';

function AddNotes(props) {
    const context = useContext(notecontext);
    const { addNote } = context;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [note, setNote] = useState({title:"",description:"",tag: ""});

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNote((prevNote) => ({
        ...prevNote,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (note.title.trim() === "" || note.description.trim() === "" || note.tag.trim() === "") {
            props.showalert("Fill all the fields before submitting","warning")
            handleCloseModal();
            return;
        }
        try {

            await addNote(note.title,note.description,note.tag);
            props.showalert('Succesfully added notes','success')
            handleCloseModal();
        } catch (error) {
            // Display the error message to the user
            props.showalert(error,'warning')
            handleCloseModal()
        }
    };
    

    return (
        <div className="AddNotes">
            <button className="addnotesbtn" onClick={handleOpenModal}>
                Add your Notes <FontAwesomeIcon icon={icon.faPlus} className="Addicon ml-3" />
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modelheader">
                            <h2 className='addnotetitle'>Add a Note</h2>
                            <button className="Addicon ml-2"  type="button" onClick={handleCloseModal}>
                                <FontAwesomeIcon icon={icon.faXmark}/>
                            </button>

                        </div>
                        <form >
                            <div className="form-group">
                                <label className='modelttiles' htmlFor="title">Title:</label>
                                <input type="text" id="title" name="title" className='userinput' onChange={handleInputChange}  />
                            </div>

                            <div className="form-group">
                                <label className='modelttiles'  htmlFor="description">Description:</label>
                                <textarea id="description" name="description" className='userinput'  onChange={handleInputChange}  />
                            </div>
                            <div className="form-group">
                                <label className='modelttiles'  htmlFor="tag">Tag:</label>
                                <input type="text" id="tag" name="tag"className='userinput'  onChange={handleInputChange}/>
                            </div>
                            <button type="submit" onClick={handleSubmit}>Add Note</button>
                            
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddNotes;
