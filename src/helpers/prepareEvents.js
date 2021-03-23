import moment from "moment";

export const prepareEvents = ( events = [] ) => {
    
    return events.map(
        (e)=>({
            ...e, //devuelve todo
            //solo cambia esto
            end: moment(e.end).toDate(), 
            start: moment(e.start).toDate()
        })
    )

}
