
import React from 'react'

export const CalendarEvent = ({event}) => { //event recibe todo el evento
    
    const {title, user}= event; //extraemos el titulo y el nombre
    //console.log(event)
    return (
        <div>
            <strong>{title}</strong>
            <span>- {user.name}</span>
        </div>
    )
}
