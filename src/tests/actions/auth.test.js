import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState)

Storage.prototype.setItem = jest.fn();

describe('Pruebas en auth.js', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    })

    test('startLogin correcto', async() => {
        await store.dispatch(startLogin('luis@gmail.com', '12345678'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // token = localStorage.setItem.mock.calls[0];
        // console.log(localStorage.setItem.mock.calls[0]);
    })

    test('startLogin incorrecto', async() => {
        await store.dispatch(startLogin('luis@gmail.com', '123456789'));
        let actions = store.getActions();
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Contraseña incorrecta.", "error");

        await store.dispatch(startLogin('luis2@gmail.com', '12345678'));
        actions = store.getActions();
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Este usuario no existe.", "error");
    })
    
    
})
