import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer"
import { types } from "../../types/types";

const initState = {
    isModalOpen: false,
}

describe('Pruebas en uiReducer', () => {
    test('debe de retornar el estado por defecto', () => {
        const state = uiReducer(initState, {});
        expect(state).toEqual(initState);
    })
    
    test('debe abrir y cerrar el modal', () => {
        const modalOpen = uiOpenModal();
        const state = uiReducer(initState, modalOpen);

        expect(state).toEqual({ isModalOpen: true });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer(state, modalClose);

        expect(stateClose).toEqual({ isModalOpen: false });
    })
    
})
