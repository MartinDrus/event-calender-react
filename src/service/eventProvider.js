import axios from "axios";


export async function getAllEvents(){

    try {
        let response = await axios.get('https://event-calender-backend-production.up.railway.app/auth/events/all',{
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error)
        
    }
}


export async function getEventById(id){

    try {
        let response = await axios.get(`https://event-calender-backend-production.up.railway.app/auth/eventdetails/${id}`,{
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        
    }

}

export async function attendToEvent(eventId){

    try {
        let response = await axios.get(`https://event-calender-backend-production.up.railway.app/auth/events/attend/${eventId}`,{
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error)
        
    }
}

export async function cancelUserEvent(eventId) {
    try {
        let response = await axios.get(`https://event-calender-backend-production.up.railway.app/auth/events/cancel/${eventId}`,{
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error)
        
    }
}

export async function getUserEventsByTokenId(){

    try {
        let response = await axios.get(`https://event-calender-backend-production.up.railway.app/auth/userevents`,{
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error)
        
    }
}

export async function getEventPreview(){

    try {
        let response = await axios.get(`https://event-calender-backend-production.up.railway.app/auth/eventpreview`,{
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error)
        
    }
}

export async function userLogout(){
    try {
        let response = await axios.get(`https://event-calender-backend-production.up.railway.app/auth/logout`,{
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.log(error)
        
    }
}

