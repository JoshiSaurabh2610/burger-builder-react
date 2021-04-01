import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-builder-react-2642b-default-rtdb.firebaseio.com/'
})

export default instance;