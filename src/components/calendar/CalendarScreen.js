import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
//calendario
import 'react-big-calendar/lib/css/react-big-calendar.css' //css para que se vea bien
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
//import { messages } from '../helpers/calendar-messages-es'; //cambio de idioma

import 'moment/locale/es';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { messages } from '../../helpers/calendar-messages-es';
moment.locale('es') //cambiar el idioma a moment

const localizer = momentLocalizer(moment) // or globalizeLocalizer
//creamos un evento apra enviar al calendario
// const event = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(), //es como new Date() // inicio del evento
//     end: moment().add(2, 'hours').toDate(),  //fin del evento mas 2 horas
//     bgcolor: '#fafafa',
//     notes: 'comprar el pastel',
//     user: { //usuario que hizo la nota 
//         _id:'123',
//         name: 'Fernando'
//     }
// }]
//-


export const CalendarScreen = () => {

    const dispatch = useDispatch(); //lo necesitamos para agregar el dispath a redux

    const {activeEvent} = useSelector(state => state.calendar) //para saber el estado de modalOpen redux

    //TODO leer del store, los eventos "las notas"
    const {events} = useSelector(state => state.calendar) //para saber el estado de modalOpen redux
    const {uid} = useSelector(state => state.auth) //para saber el estado de modalOpen redux
    
    // console.log('ver los eventos')
    // console.log(events)


    //buscamos la vista pasada sino usamos la del mes--- ayuda a cuando recargamos la pagina se quede donde la dejamos
    const [lastView, setViewLastView] = useState(localStorage.getItem('lastView') || 'month'); 
    
    //apra carar los eventos
    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])


    //funcion cuando hace doble click
    const onDoubleClick=(e)=>{ //e recibe el evento
        //console.log('abrir modal');
        dispatch( uiOpenModal() );//activamos la nota
    }
    
    //funcion cuando hace un click
    const onSelectEvent=(e)=>{ //e recibe el evento
        //dispatch( uiOpenModal() ); //activamos la nota
        dispatch( eventSetActive(e) ); //
        
    }
    //sacar el boton eliminar cuando aga click en otro lugar
    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent()) 
    }

    //avisa en que vista estoy mes dia semana
    const onViewChange=(e)=>{ //e recibe el evento
        setViewLastView(e);
        localStorage.setItem('lastView', e); //grabar la informacion en el localstore
    }
    const eventStyleGetter =(event, start, end, isSelected)=>{
        //console.log(event, start, end, isSelected)
        const style = {
            backgroundColor: (uid === event.user._id ) ? '#367CF7': '#465660',//para ver colores diferentes de las notas propias
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return{
            style
        }
    };
    
    return (
        <div className="calendar-screen">
            <Navbar/>
            {/*calendario */}
            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages} //enviamos el cambio de idioma
                eventPropGetter={eventStyleGetter} //enviamos un stylo
                onDoubleClickEvent={onDoubleClick} //enviamos un evento doble click
                onSelectEvent={onSelectEvent} //enviamos un evento un click
                onSelectSlot={onSelectSlot}
                selectable={ true }

                onView={onViewChange}
                view={lastView}
                components = {{
                    event: CalendarEvent //enviamos el evento de esta forma 
                }}
            />  

                <AddNewFab/>
                {
                    activeEvent &&
                    <DeleteEventFab/>
                }

            <CalendarModal/>

            
        </div>
    )
}
