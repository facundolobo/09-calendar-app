import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';



jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))



const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState );
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store } >
        <LoginScreen />
    </Provider>
)
//swal
import Swal from 'sweetalert2';
    Storage.prototype.setItem= jest.fn();
    jest.mock('sweetalert2',()=>({
        fire: jest.fn()
    }))

describe('Pruebas en <LoginScreen/>', () => {
beforeEach(()=>{//limpiar mocks
    jest.clearAllMocks();
})

    test('debe mostrarse correctamente ', () => {
        
            
        expect(wrapper).toMatchSnapshot();

    })
    test('debe de llamar el dispatch del login ', () => {
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'juan@gmail.com'
            }
        })
        
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        })
        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })
        expect(startLogin).toHaveBeenCalledWith( "juan@gmail.com", "123456")

    })
    test('no hay registro si las contraseñas son diferentes ', () => {
        wrapper.find('input[name="rName"]').simulate('change', { //name
            target: {
                name: 'rName',
                value: 'test'
            }
        })
        wrapper.find('input[name="rEmail"]').simulate('change', {//email
            target: {
                name: 'rEmail',
                value: 'juan1@gmail.com'
            }
        })
        wrapper.find('input[name="rPassword1"]').simulate('change', {//pas1
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        })
        wrapper.find('input[name="rPassword2"]').simulate('change', {//pas2
            target: {
                name: 'rPassword2',
                value: '1234567'
            }
        })
        
        wrapper.find('form').at(1).prop('onSubmit')({ //click boton registro
            preventDefault(){}
        })

        expect(startRegister).not.toHaveBeenCalledWith( ) //no tuvo que llamar al registro

        expect(Swal.fire).toHaveBeenCalledWith("Error", "Las Contraseñas deben ser iguales", "error") //debe tirar este rror





    })

    test('hay registro si las contraseñas son iguales ', () => {
        wrapper.find('input[name="rName"]').simulate('change', { //name
            target: {
                name: 'rName',
                value: 'test'
            }
        })
        wrapper.find('input[name="rEmail"]').simulate('change', {//email
            target: {
                name: 'rEmail',
                value: 'juan1@gmail.com'
            }
        })
        wrapper.find('input[name="rPassword1"]').simulate('change', {//pas1
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        })
        wrapper.find('input[name="rPassword2"]').simulate('change', {//pas2
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        })
        
        wrapper.find('form').at(1).prop('onSubmit')({ //click boton registro
            preventDefault(){}
        })

        expect(Swal.fire).not.toHaveBeenCalledWith( ) //no tiene que activarse

        expect(startRegister).toHaveBeenCalledWith("test", "juan1@gmail.com", "123456") //debe tirar este rror

    })
    
    
})
