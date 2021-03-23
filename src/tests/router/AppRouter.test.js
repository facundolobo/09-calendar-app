import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';



// jest.mock('../../../actions/events', () => ({
//     eventStartDelete: jest.fn()
// }))



const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    auth: { //necesita la variable checking
        checking: true
    }
};
const store = mockStore( initState );

// store.dispatch = jest.fn();




describe('Pruebas en <AppRouter/>', () => {
    test('Debe de mostrar el espere... ', () => {
        const middlewares = [ thunk ];
        const mockStore = configureStore( middlewares );

        const initState = {
            auth: { //necesita la variable checking
                checking: true
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h5').exists()).toBe(true);//verifica que aparece el "espere..."
    })

    test('Debe de mostrar la ruta publica ', () => {
        const middlewares = [ thunk ];
        const mockStore = configureStore( middlewares );

        const initState = {
            auth: { //necesita la variable checking
                checking: false,
                uid:null
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);//verifica que aparece el ".login-container"
    })

    test('Debe de mostrar la ruta privada ', () => {
        const middlewares = [ thunk ];
        const mockStore = configureStore( middlewares );

        const initState = {
            ui:{
                modalOpen:false
            },
            calendar:{//necesita la instacia de calentdarios para desesructurar
                events: []
            },
            auth: { //necesita la variable checking
                checking: false,
                uid:'123',
                name: 'Juan carlos'
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(false);//verifica que aparece el ".login-container"
    },3000)
})
