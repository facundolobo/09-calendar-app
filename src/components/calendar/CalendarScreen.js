import React from 'react';
import { Navbar } from '../ui/Navbar';
//calendario
    import 'react-big-calendar/lib/css/react-big-calendar.css' //css para que se vea bien
    import {Calendar, momentLocalizer} from 'react-big-calendar';
    import moment from 'moment';
    import { messages } from '../helpers/calendar-messages-es'; //cambio de idioma

    import 'moment/locale/es';
    moment.locale('es') //cambiar el idioma a moment
    
    const localizer = momentLocalizer(moment) // or globalizeLocalizer
    //creamos un evento apra enviar al calendario
    const event = [{
        title: 'Cumpleaños del jefe',
        start: moment().toDate(), //es como new Date() // inicio del evento
        end: moment().add(2, 'hours').toDate(),  //fin del evento mas 2 horas
        bgcolor: '#fafafa',
        notes: 'comprar el pastel'
    }]
    //-
    

export const CalendarScreen = () => {
    
    const eventStyleGetter =(event, start, end, isSelected)=>{
        //console.log(event, start, end, isSelected)
        const style = {
            backgroundColor: '#367CF7',
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
                events={event}
                startAccessor="start"
                endAccessor="end"
                messages={messages} //enviamos el cambio de idioma
                eventPropGetter={eventStyleGetter}
            />  
        </div>
    )
}
