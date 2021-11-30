import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

let token = '';

describe('Pruebas en auth.js', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    })

    test('startLogin correcto', async() => {
        Storage.prototype.setItem = jest.fn();

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
    
    test('startRegister correcto', async() => {
        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'test2',
                    token: '1234abc'
                }
            }
        }));
        await store.dispatch(startRegister('test@test.com', '123456789', 'test'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test2',
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    })
    
    test('startChecking correcto', async() => {
        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'test2',
                    token: '1234abc'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test2',
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', '1234abc');
    })
    
})
