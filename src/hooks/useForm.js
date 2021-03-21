import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [value, setValue] = useState(initialState);
        
    
        //funcion para borrar el formulario "vaciar input"
        const reset = () =>{ 
            setValue(initialState);
        }

        //es una funcion para que el input se escriba en tiempo real
        const handleInputChange=({target}) =>{ //desestructuramos target para obtener los parametros
    
            setValue({//esto escribira todos los datos q ingrese en el input
                
                ...value, 
        
                [target.name] : target.value  
            
            })
        }
        //------------------------------------
        

return [value, handleInputChange, reset];

}