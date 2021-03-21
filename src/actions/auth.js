import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        
        //console.log(email, password)
        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        //console.log(body)
        if(body.ok){
            localStorage.setItem('token',body.token ); //guarda el token en el navegador
            localStorage.setItem('token-init-date', new Date().getTime() );//guardamos la hora de guardado de token
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

    }
}  
export const startRegister = (name, email, password) =>{
    return async( dispatch ) => {
        
        const resp = await fetchSinToken( 'auth/new', { email, password ,name}, 'POST' );
        const body = await resp.json();
        //console.log(body.ok)
        //console.log(body)
        if(body.ok){
            
            localStorage.setItem('token',body.token ); //guarda el token en el navegador
            localStorage.setItem('token-init-date', new Date().getTime() );//guardamos la hora de guardado de token
            console.log(body)
            dispatch( login({
                uid: body.uid,
                name: body.name,
                //password: body.password
                
            }) )
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

    }

}
export const startChecking= ()=> {
    return async(dispatch) =>{

        const resp = await fetchConToken( 'auth/renew');
        const body = await resp.json();
        //console.log(body.ok)
        //console.log(body)
        if(body.ok){
            
            localStorage.setItem('token',body.token ); //guarda el token en el navegador
            localStorage.setItem('token-init-date', new Date().getTime() );//guardamos la hora de guardado de token
            console.log(body)
            dispatch( login({
                uid: body.uid,
                name: body.name,
                //password: body.password
                
            }) )
        }else{
            //Swal.fire('Error', body.msg, 'error');
            dispatch (checkingFinish())
        }

    }
}

const checkingFinish=()=>({
    type: types.authCheckingFinish
})

const login = (user) =>({
    type: types.authLogin,
    payload: user
})

export const startLogout =()=>{
    return(dispatch) =>{
        localStorage.clear();
        dispatch(logout());
    }
}
const logout = ()=>({
    type: types.authLogout
})