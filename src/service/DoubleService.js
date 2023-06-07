import axios from 'axios';
// axios.defaults.baseURL = "http://20.21.120.16:8000";

function uploadImage(data) {
    //make api call for auth
    console.log("post request " + data.values())
    return axios.post("/two_image", data
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
