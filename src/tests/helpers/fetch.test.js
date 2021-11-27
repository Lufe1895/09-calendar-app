import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch"

describe('Pruebas en el helper Fetch', () => {
    let token = '';

    test('FetchSinToken debe funcionar', async() => {
        const res = await fetchWithoutToken(
            'auth', 
            { 
                email: 'luis@gmail.com', 
                password: '12345678', 
            },
            'POST'
        );

        expect(res instanceof Response).toBe(true);

        const body = await res.json();
        expect(body.ok).toBe(true);

        token = body.token;
    })
    
    test('FetchConToken debe funcionar', async() => {
        localStorage.setItem('token', token);

        const res = await fetchWithToken('events/619bda94ada0403b117ec799', {}, 'DELETE');
        const body = await res.json();

        expect(body.msg).toBe('Este evento no existe');
    })
})
