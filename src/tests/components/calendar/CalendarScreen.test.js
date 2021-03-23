import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
// import { LoginScreen } from '../../../components/auth/LoginScreen';
// import { startLogin, startRegister } from '../../../actions/auth';


import { eventSetActive, eventStartLoading } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(), //
    eventStartLoading: jest.fn() //como hicimos un mock completo a toda la libreria y llama a eventStartLoading() entones lo definimos tambien
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    calendar: {
        events: []//necesita un evento si o si para el wrapper
    },
    auth: {
        uid: '123',
        name: 'Fernando'
    },
    ui: {
        openModal: false
    }
};


const store = mockStore( initState );
 store.dispatch = jest.fn();

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';


const wrapper = mount(
    <Provider store={ store } >
        <CalendarScreen />
    </Provider>
)


describe('pruebas en <CalendarScreen/>', () => {
    test('debe de msotrarce correctamente ', () => {
      
        expect(wrapper).toMatchSnapshot();
    },3000)
    test('Pruebas con las interacciones del calendario ', () => {
        
        const calendar = wrapper.find('Calendar');
        //console.log(calendar.exists())
        const calendarMensajes = calendar.prop('messages');//obtener los mensajes que se envian
        expect(calendarMensajes).toEqual(messages);        

        calendar.prop('onDoubleClickEvent')(); //doble click
        expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal})

        calendar.prop('onSelectEvent')({start:'hola'}); // click ,, {start:'hola'} es solo un evento cualqueira
        expect(eventSetActive).toHaveBeenLastCalledWith({start:'hola'})

        act(()=>{
            
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week")
        })

    })
        
    
})
