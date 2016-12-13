import axios from 'axios';

export const fetchContest = contestId => {
    // we return a promise
    return axios.get(`/api/contests/${contestId}`)
                .then(resp => resp.data);
}
