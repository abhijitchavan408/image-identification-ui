import axios from 'axios';
axios.defaults.baseURL = "http://20.204.215.95:8000";

// axios.defaults.baseURL = "http://34.136.177.220:8000"
function uploadImage(data) {
    //make api call for auth
    console.log(data)
    return axios.post("/image", data
        , {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    )
}

function feedback(data) {
    //make api call for auth
    console.log("inside feedback post call method 1." + data.feedbackStatus + " 2." + data.fileName)
    return axios.post("/feedback", data)
}

export default { uploadImage, feedback }
