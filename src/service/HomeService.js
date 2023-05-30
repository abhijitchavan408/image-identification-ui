import axios from 'axios';
// axios.defaults.baseURL = "http://34.136.177.220:8000";

function uploadImage(data) {
    //make api call for auth
    console.log("post call" + data)
    // for (const pair of data) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }
    return axios.post("http://34.136.177.220:8000/image", data
        , {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

    )
}

export default { uploadImage }
