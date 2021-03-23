import { startLogin } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
    checking: true ,
    //uid: null,
    //name: null 
}

describe('Pruebas en authReducer.js', () => {
    
    test('debe de retornar el estado por defecto ', () => {
        const state = authReducer(initialState, {});
        //console.log(state)
        expect(state).toEqual(initialState) //comprobamos que cambiara

    })
    test('debe de retornar el estado login ', () => {
        //const accionlogin = uiOpenModal(); //usamos la accion ya establecida
        const actions=  {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Fernando'
            }
        }

        const state = authReducer(initialState, actions);//login
        
        //console.log(state)
        expect(state).toEqual({
            checking: false,
            uid: '123',
            name: 'Fernando'   
        }) //comprobamos que cambiara
        

    })
    test('debe de retornar el estado logout ', () => {
        const actions=  {
            type: types.authLogout,
            payload: {
                uid: '123',
                name: 'Fernando'
            }
        }

        const state = authReducer(initialState, actions);//login
        
        //console.log(state)
        expect(state).toEqual({
            checking: false
             
        }) //comprobamos que cambiara
        
    })

    test('debe de retornar el estado authCheckingFinish ', () => {
        const initialState2 = {
            checking: true ,
            uid: '123',
            name: 'Fernando'
        }
       
        const actions=  {
            type: types.authCheckingFinish,
            
        }

        const state = authReducer(initialState2, actions);//login
        
        //console.log(state)
        expect(state).toEqual({
            checking: false,
           
                uid: '123',
                name: 'Fernando'
        
             
        }) //comprobamos que cambiara
        
    })
    
    
    
})
