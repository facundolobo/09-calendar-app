import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { UiReducer } from "../../reducers/UiReducer"

const initState= {
    modalOpen: false
}


describe('Pruebas en uireducer', () => {
    test('debe de retornar el estado por defecto ', () => {
        
        const state = UiReducer(initState, {});
        
        expect(state).toEqual(initState);
    })
    test('debe de abrir y cerrar el modal ', () => {
        const modalOpen = uiOpenModal(); //usamos la accion ya establecida
        const state = UiReducer( initState, modalOpen );//enviamos la accion

        expect(state).toEqual({modalOpen: true}) //comprobamos que cambiara

        const modalClose = uiCloseModal(); //usamos la accion ya establecida
        const stateClose = UiReducer( initState, modalClose );//enviamos la accion

        expect(stateClose).toEqual({modalOpen: false})
    })
    
    
})
