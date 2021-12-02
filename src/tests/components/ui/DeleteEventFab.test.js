import { mount } from "enzyme"
import { Provider } from "react-redux"
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
);

describe('Pruebas en Delete Event Fab', () => {
    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
})
