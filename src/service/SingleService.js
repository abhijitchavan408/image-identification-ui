import axios from 'axios';
axios.defaults.baseURL = "http://fastapiservice.argocd-image:8000";

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
    console.log(data)
    return axios.post("/feedback", data)
}

export default { uploadImage, feedback }
