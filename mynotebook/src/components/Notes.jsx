import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/Notecontext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';
import './Css/notes.css'

const Notes = (props) => {
    const { notes, getNotes,editnote } = useContext(NoteContext);
    const ref = useRef(null);
    const refclose=useRef(null);
    const modalRef = useRef(null);
    // const navigate = useNavigate(); 

    // useEffect(() => {
    //     if (localStorage.getItem('token')){
    //         getNotes();
    //     }else{
    //         navigate('/userlogin')

    //     }
        
    //     // eslint-disable-next-line 
    // }, []);
    const [note, setNote] = useState({ id :"",etitle:"",edescription:"",etag: ""});
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({id:currentnote._id ,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    };

    const toggleModal = () => {
        if (modalRef.current) {
            const isHidden = modalRef.current.classList.contains('hidden');
            if (isHidden) {
                modalRef.current.classList.remove('hidden');
            } else {
                modalRef.current.classList.add('hidden');
            }
        }
    };


    const handleInputChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await editnote(note.id,note.etitle,note.edescription,note.etag);
            refclose.current.click();
            props.showalert('Notes Updated', 'info')
        }catch(err){
            // console.log(err)
            props.showalert(err,"warning")
        }    
    };

    return (
        <div>
            <button ref={ref} onClick={toggleModal} className="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5">
                Toggle modal
            </button>
            <div
                ref={modalRef}
                className="hidden fixed top-0 left-0 z-50 w-full h-[calc(100%-1rem)] flex items-center justify-center   " >
                <div className="relative modelbg  rounded-lg shadow p-4 w-full max-w-md">
                    <div className="flex justify-between items-center border-b p-4">
                        <h3 className="text-xl font-semibold titlemodel text-gray-900">Edit Note</h3>
                        <button type="button" ref={refclose}  className="text-gray-400  rounded-lg w-8 h-8 m-2 modelbtn" onClick={toggleModal}>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                                <path d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                <input type="text" name="etitle" id="etitle" onChange={handleInputChange} value={note.etitle} className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg w-full p-2.5" required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <input type="text" name="edescription" id="edescription" onChange={handleInputChange} value={note.edescription} className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg w-full p-2.5" required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Tag</label>
                                <input type="text" name="etag" id="etag" onChange={handleInputChange} value={note.etag} className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg w-full p-2.5" required/>
                            </div>
                            <button type="submit" className='modelbtn rounded-lg' onClick={handleSubmit} >
                                Edit Note
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <AddNotes showalert={props.showalert}/>
            <div className="nonotes">
                {notes.length===0 && 
                    <h1>Write It Down, Keep It Handy.</h1>
                }
            </div>
            {notes.map((note) => (
                <NoteItem key={note._id} updateNote={updateNote} note={note}  showalert={props.showalert} />
            ))}
        </div>
    );
};

export default Notes;
