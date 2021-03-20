import React from 'react'
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch(); //lo necesitamos para agregar el dispath a redux
    
    const handleDelete=()=>{
        dispatch( eventDeleted() ); //
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className="fas fa-trash"></i>
            <span> Borrar evento </span>
        </button>
    )
}
