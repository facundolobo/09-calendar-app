import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import moment from 'moment';

import { eventClearActiveEvent, eventStartUpdate, eventStartAddNew } from '../../../actions/events';
import { act } from '@testing-library/react';

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(), //
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}))

import Swal from 'sweetalert2';
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now= moment().minutes(0).seconds(0).add(1,'hours');

const nowPlus1= now.clone().add(1, 'hours'); //funcion para clonar


const initState = {
    calendar: {
        events: [],//necesita un evento si o si para el wrapper
        activeEvent:{ //tiene que estar una nota activa
            title: 'Hola mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'Fernando'
    },
    ui: {
        modalOpen: true
    }
};


const store = mockStore( initState );
  store.dispatch = jest.fn();





const wrapper = mount(
    <Provider store={ store } >
        <CalendarModal />
    </Provider>
)



describe('Pruebas en <CalendarModal/>', () => {
    beforeEach(()=>{
        jest.clearAllMocks();
    })


    test('debe de mostrar el modal ', () => {
 
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);

    })
    test('debe de llamar la accion de actualizar y cerrar modal ', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent)
        expect(eventClearActiveEvent).toHaveBeenCalled()
        //cerro el evento asi q despues no funcionara
  
    })

    test('debe de mostrar error si falta el titulo ', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')) //debe saltar un rojo en el campo
        
   
    })
    test('debe de crear un nuevo evento ', () => {
        const initState = {
            calendar: {
                events: [],//necesita un evento si o si para el wrapper
                activeEvent:null
            },
            auth: {
                uid: '123',
                name: 'Fernando'
            },
            ui: {
                modalOpen: true
            }
        };
        
        
        const store = mockStore( initState );
          store.dispatch = jest.fn();
        
        
        
        
        
        const wrapper = mount(
            <Provider store={ store } >
                <CalendarModal />
            </Provider>
        );


        

        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name: 'title',
                value: 'Hola pruebas'
            }
        })
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })
        expect( eventStartAddNew ).toHaveBeenCalledWith( {
            "end": expect.anything(), 
            "notes":  '', 
            "start": expect.anything(), 
            "title": "Hola pruebas"
        
        
        })
        expect(eventClearActiveEvent).toHaveBeenCalled()
        

    })
    test('debew de validar las fechas ', () => {
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name: 'title',
                value: 'Hola pruebas'
            }
        })

        const hoy = new Date();
        act(()=>{

            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
        })

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        })
        expect(Swal.fire).toHaveBeenCalledWith("Error", "La fecha fin debe ser mayor a la decha inicio", "error")
    })
    
    
    
    
})
