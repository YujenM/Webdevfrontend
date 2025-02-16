// import React, { useState } from 'react';
// import './Css/Model.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as icon from '@fortawesome/free-solid-svg-icons';

// function Model({ closeModel, modelTitle ,addNote}) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [tag, setTag] = useState('');

//     const onChange=(e)=>{
        
//     }
//     const handleSubmit = () => {
//         addNote(title,description,tag);
//         closeModel();
//     };
    
        

//     return (
//     <div className="ModelBackground" onClick={closeModel}>
//         <div className="ModelContent" onClick={(e) => e.stopPropagation()}>
//         <div className="ModelHeader">
//             <h1 className="ModelTitle">{modelTitle}</h1>
//             <button className="CloseButton" onClick={closeModel}>
//             <FontAwesomeIcon icon={icon.faTimes} />
//             </button>
//         </div>
//         <div className="ModelBody">
//             <label className='titles'>Title</label>
//             <input className='modelinput' type="text" placeholder="Title" value={title} onChange={onchange}/>
//             <label className='titles'>Description</label>
//             <textarea className='modelinputdes' placeholder="Description" value={description} onChange={onChange}></textarea>
//             <label className='titles'>Tag</label>
//             <input  className='modelinput' type="text" placeholder="Tag" value={tag} onChange={onChange}/>
//         </div>
//         <div className="ModelFooter">
//             <button className="SubmitButton" onClick={handleSubmit}>Add Note</button>
//         </div>
//         </div>
//     </div>
//     );
// }

// export default Model;
