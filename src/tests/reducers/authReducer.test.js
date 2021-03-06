import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
    checking: true,
}

describe('Pruebas en auth Reducer', () => {
    test('Debe retornar el estado por defecto', () => {
        const action = {};
        const state = authReducer(initialState, action);
        expect(state).toEqual(initialState);
    })
    
    test('Debe de autenticar el usuario', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Luis',
            },
        }

        const state = authReducer(initialState, action);
        expect(state).toEqual({
            checking: false,
            uid: '123',
            name: 'Luis',
        })
    })
    
})
