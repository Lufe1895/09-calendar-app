import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const startEventAddNew = (event) => {
    return async(dispatch, getState) => {
        const { uid, name } = getState().auth;
        try {
            const res = await fetchWithToken('events', event, 'POST');
            const body = await res.json();
    
            if(body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name,
                }
                dispatch(eventAddNew(event));
            }
        } catch(e) {
            console.log(e);
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event,
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event,
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActive,
})

export const eventStartUpdate = (event) => {
    return async(dispatch) => {
        try {
            const res = await fetchWithToken(`events/${ event.id }`, event, 'PUT');
            const body = await res.json();

            if(body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch(e) {
            console.log(e);
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event,
})

export const eventDelete = () => ({ type: types.eventDelete })

export const eventStartLoading = () => {
    return async(dispatch) => {
        try {
            const res = await fetchWithToken('events');
            const body = await res.json();

            const events = prepareEvents(body.events);

            dispatch(eventsLoaded(events));
        } catch(e) {
            console.log(e);
        }
    }
}

const eventsLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events,
})