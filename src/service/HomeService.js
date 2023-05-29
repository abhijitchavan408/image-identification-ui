import axios from 'axios';
axios.defaults.baseURL = "http://34.136.177.220:5000";

function uploadImage(body) {
    //make api call for auth
    console.log('post call', body);
    return axios.post('/image', {
        image: body
    });
}

export default { uploadImage }
