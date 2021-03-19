import React, { useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
 };

Modal.setAppElement('#root');

//momento actual
const now= moment().minute(0).second(0).add(1,'hours');

const nowPlus1= now.clone().add(1, 'hours'); //funcion para clonar

export const CalendarModal = () => {
    
    const [dateStart, setDateStart] = useState(now.toDate())

    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())

    //variables del formulario
        const [formValue, setFormValue] = useState({
            title: 'Evento',
            notes: '',
            start: now.toDate(),
            end: nowPlus1.toDate()
        })

        const { notes, title } =formValue;

        //cambia valor 
        const handleInputChange = ({target}) =>{ //solo me importa target

            setFormValue({
                ...formValue,
                [target.name]: target.value   
            })
        }
    //--

    //funcion que cierra el modal
    const closeModal = ()=>{
        //console.log('closing...');
        //setIsOpen(false);//cambio su valor
    }

    //cambio de fecha inicio
    const handleStartDateChange=(e)=>{
        //console.log(e);
        setDateStart(e); //la nueva fecha viene en el "e"
        setFormValue({
            ...formValue,
            start: e
        })
    }
    //cambio de fecha fin
    const handleEndDateChange = (e)=>{
        //console.log(e);
        setDateEnd(e); //la nueva fecha viene en el "e"
        setFormValue({
            ...formValue,
            end: e
        })
    }

    //submit de formulario
    const handleSubmitForm = (e) =>{
        e.preventDefault();
        console.log( formValue );
    }

    return (
        <Modal
            isOpen={true} // muestra el modal, si esta true se muestra
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles} //agrega estilos creados aqui
            
            closeTimeoutMS={200} //tarda en desaparecer
            //de styles.css
            className="modal" 
            overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                     {/*componente externo de fecha */}
                     <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                     />

                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    {/*componente externo de fecha */}
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd} 
                        minDate={dateStart}//valdiacion para que no sea menor a dateStart
                        className="form-control"
                     />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        autoComplete="off"
                        
                        //cambio de valor de form
                        name="title"
                        value= {title}
                        onChange={handleInputChange}
                        //--
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        
                        //cambio de valor de form
                        name="notes"
                        value= {notes}
                        onChange={handleInputChange}
                        //--
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
