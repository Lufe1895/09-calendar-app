import { fetchWithToken } from "../helpers/fetch";
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

export const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event,
})

export const eventDelete = () => ({ type: types.eventDelete })

export const eventStartLoading = () => {
    return async(dispatch) => {
        try {
            const res = await fetchWithToken('events');
            const body = await res.json();

            const events = body.events;

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