import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
//import { useDispatch } from 'react-redux';

import { startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore( initState );

Storage.prototype.setItem= jest.fn();
jest.mock('sweetalert2',()=>({
    fire: jest.fn()
}))

describe('Pruebas en las acciones Auth', () => {
    
  //  const dispatch = useDispatch()
    
    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();//limpia todos los mocks
    })
   
    test('startLogin correcto ', async() => {
        await store.dispatch(startLogin('fernando@gmail.com','123456') );
        const actions= store.getActions();
        //console.log(actions);
        expect(actions[0]).toEqual( {
            type: types.authLogin,
            payload: { 
                uid: expect.any(String),
                name: expect.any(String)
            }
          })

          expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
          expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

          //console.log(localStorage.setItem.mock.calls) //para saber con que fue llamada una funcion den jest.fn()

    })
    test('startLogin incorrecto ', async() => {
        await store.dispatch(startLogin('fernando@gmail.com','123456789') );//mal pass
        let actions= store.getActions();

        expect(actions).toEqual([]) //no regresa nada si pass incorrecta
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Password incorrecto", "error")

        await store.dispatch(startLogin('fernando1@gmai.com','123456') );//mal meil
        actions= store.getActions();

        expect(Swal.fire).toHaveBeenCalledWith("El usuario no existe con ese email", "error")
    
    
    })
    test('startRegister correcto ', async() => {
        await store.dispatch(startRegister('test2@test.com','123456', 'test') );//registro
        let actions= store.getActions();
        console.log(actions)
    })
    
    
})
