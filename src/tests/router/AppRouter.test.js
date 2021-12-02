import { mount } from "enzyme"
import { Provider } from "react-redux"
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from "../../router/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        checking: true,
    }
};
const store = mockStore(initialState);
// store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
    test('Debe de mostrar el espere...', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h5').exists()).toBe(true);
    })
    
})
