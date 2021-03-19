//import React from 'react'
import { types } from '../types/types'

const inicialState = {
    modalOpen: false
}

export const UiReducer = (state= inicialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return  {
                ...state,
                modalOpen: true //cambiamos el estado de modal
            }
        default:
            return state;    
    }
}
