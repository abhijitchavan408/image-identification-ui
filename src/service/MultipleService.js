import axios from 'axios';
// axios.defaults.baseURL = "http://20.204.215.95:8000";

function uploadImage(data) {
    //make api call for auth
    console.log("post request " + data.values())
    return axios.post("/multiple_images", data
        , {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    )
}

function feedback(data) {
    //make api call for auth
    console.log(data)
    return axios.post("/feedback", data)
}

export default { uploadImage, feedback }
