import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes'
import moment from 'moment';
import 'moment/locale/es';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector(state => state.notes)

    const date= moment(new Date().getTime())

    const handleSave = () => {
        
        dispatch(startSaveNote(note));
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            dispatch(startUploading( file ))
        }
    }



    return (
        <div className="notes__appbar">
            <span>{date.format('MMMM Do YYYY')}</span>

            <input
                id="fileSelector"
                name= "file"
                type="file"
                style={{ display: 'none'}}
                onChange={ handleFileChange }
           />

            <div>
                <button 
                    className="btn"
                    onClick= {handlePictureClick}
                
                >
                   Imagen
                </button>
                <button 
                    className="btn"
                    onClick = {handleSave}
                >
                    Guardar
                </button>
            </div>
            
        </div>
    )
}
