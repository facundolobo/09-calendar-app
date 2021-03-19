import React from 'react'
import { Navbar } from '../ui/Navbar'
//calendario
    import 'react-big-calendar/lib/css/react-big-calendar.css' //css para que se vea bien
    import {Calendar, momentLocalizer} from 'react-big-calendar'
    import moment from 'moment'
    const localizer = momentLocalizer(moment) // or globalizeLocalizer
    //creamos un evento apra enviar al calendario
    const event = [{
        title: 'Cumpleaños del jefe',
        start: moment().toDate(), //es como new Date() // inicio del evento
        end: moment().add(2, 'hours').toDate()  //fin del evento mas 2 horas
    }]
//-

export const CalendarScreen = () => {
    return (
        <div className="calendar-screen">
            <Navbar/>
            {/*calendario */}
            <Calendar 
                localizer={localizer}
                events={event}
                startAccessor="start"
                endAccessor="end"
            />  
        </div>
    )
}
