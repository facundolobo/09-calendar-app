import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
//import { useDispatch } from 'react-redux';

import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
//mock
let store = mockStore( initState );
    //de los mensajes de swal
    import Swal from 'sweetalert2';
    Storage.prototype.setItem= jest.fn();
    jest.mock('sweetalert2',()=>({
        fire: jest.fn()
    }))
    //
    import * as fetchModule from '../../helpers/fetch'; //importamos fetch

//--



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
          //verificar si se guardo el token y la fecha token
          expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
          expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

          //console.log(localStorage.setItem.mock.calls) //para saber con que fue llamada una funcion den jest.fn()

    })
    test('startLogin incorrecto ', async() => {
        await store.dispatch(startLogin('fernando@gmail.com','123456789') );//mal pass
        let actions= store.getActions();

        expect(actions).toEqual([]) //no regresa nada si pass incorrecta
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error')

        await store.dispatch(startLogin('fernando@gmai2.com','123456') );//mal meil
        actions= store.getActions();

        expect(Swal.fire).toHaveBeenCalledWith('Error','El usuario no existe con ese email', 'error')
    
    
    },3000)
    test('startRegister correcto ', async() => {
        fetchModule.fetchSinToken = jest.fn(()=>({
            json(){ //cuandos ea invocado el json devolvera esto
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ASD123ASD123'
                }
            }
        }));

        await store.dispatch(startRegister('test1','test@gmail.com','1234567') );//registro

        let actions= store.getActions();//extrae las acciones

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        })

        //verificar si se guardo el token y la fecha token
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ASD123ASD123');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    })
    test('startChecking correcto', async() => {
        
        fetchModule.fetchConToken = jest.fn(()=>({
            json(){ //cuandos ea invocado el json devolvera esto
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ASD123ASD123'
                }
            }
        }));
        
        await store.dispatch(startChecking() )
        let actions= store.getActions();//extrae las acciones

        //console.log(actions)
        expect(actions[0]).toEqual({ type: '[auth] Login', payload: { uid: '123', name: 'carlos' } })
          //verificar si se guardo el token
        expect(localStorage.setItem).toHaveBeenCalledWith("token", "ASD123ASD123")

    })
    
    
})
