import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch(); //lo necesitamos para agregar el dispath a redux

    const handleClickNew = ()=>{
        dispatch( uiOpenModal() );
    }
    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
