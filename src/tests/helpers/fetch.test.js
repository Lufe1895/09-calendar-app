import { fetchWithoutToken } from "../../helpers/fetch"

describe('Pruebas en el helper Fetch', () => {
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
    })
    
})
