import { types } from "../../types/types"

describe('Pruebas en Types', () => {
    test('Debe ser igual', () => {
        expect(types).toEqual({
            uiOpenModal: '[UI] Open Modal',
            uiCloseModal: '[UI] Close Modal',

            eventStartAddNew: '[Events] Event Add New',
            eventSetActive: '[Events] Set Active',
            eventLogOut: '[Events] Logout',
            eventAddNew: '[Events] Add New',
            eventClearActive: '[Events] Clear Active Event',
            eventUpdate: '[Events] Event Update',
            eventDelete: '[Events] Event Delete',
            eventLoaded: '[Events] Event Loaded',

            authChecking: '[Auth] Checking Login State',
            authCheckingFinish: '[Auth] Finish Checking Login State',
            authStartLogin: '[Auth] Start Login',
            authLogin: '[Auth] Login',
            authStartRegister: '[Auth] Start Register',
            authStartTokenRenewal: '[Auth] Start Token Renew',
            authLogout: '[Auth] Start Logout',
        })
    })
    
})
