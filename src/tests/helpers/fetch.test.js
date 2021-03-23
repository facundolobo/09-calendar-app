import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

describe('Pruebas en el helper Fetch', () => {

    let token='';

    test('fetchSinToken debe de funcionar ', async() => {
        const resp = await fetchSinToken('auth', {email:'fernando@gmail.com', password: '123456'}, 'POST');

        expect(resp instanceof Response).toBe(true) // espero que la respuesta sea una instacia de Response

        const body= await resp.json();
        expect(body.ok).toBe( true );

        token= body.token;

    })
    test('fetchConToken debe de funcionar ', async() => {
        
        localStorage.setItem('token', token);
        // localhost:4000/api/events/60574beb65608725d43a2516
        const resp = await fetchConToken('events/60574beb65608725d43a2516',  {}, 'DELETE')
        const body= await resp.json();
        //console.log(body);
        expect(body.msg).toBe('Evento no existe por ese id')
    })
})
