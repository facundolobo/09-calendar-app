import moment from 'moment';
import React from 'react'
import { types } from '../types/types';

const inicialState = {
    events: [{
        title: 'Cumpleaños del jefe',
        start: moment().toDate(), //es como new Date() // inicio del evento
        end: moment().add(2, 'hours').toDate(),  //fin del evento mas 2 horas
        bgcolor: '#fafafa',
        notes: 'comprar el pastel',
        user: { //usuario que hizo la nota 
            _id:'123',
            name: 'Fernando'
        }
    }],
    activeEvent: null
}

export const calendarReducer = ( state = inicialState, action ) => {
    switch (action.type) {
        case types.eventSetActive:
            
            return{
                ...state,
                activeEvent: action.payload 
            }
        
        case types.eventAddNew:
        
            return{
                ...state,
                events: [
                    ...state.events, //para tener los anteriores
                    action.payload  //para agregar el nuevo
                ]
            }
        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent: null
            }
            
        default:
            return state;
    }
}
