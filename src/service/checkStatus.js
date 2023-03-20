import axios from "axios";

export async function userStatus(){
    try {
        let response = await axios.get('https://event-calender-backend-production.up.railway.app/auth/status',{
            withCredentials: true
        })
        if(!response.data) response.data = {success: false, message: 'Token missing!'}
        return response.data;
    } catch (error) {
        console.log("🚀 ~ file: checkStatus.js:11 ~ userStatus ~ error:", error)
        if(!error.response.data) error.response.data = {success: false, message: 'Token missing!'}
        return error.response.data
    }
}