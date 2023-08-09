import axios from 'axios';
axios.defaults.baseURL = "https://image-identification-backend-git-imageadentificationapplication.apps.hpeopenshift.eastus.aroapp.io/"; //sumit

//axios.defaults.baseURL = "http://34.136.177.220:8000"; // rutik
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
