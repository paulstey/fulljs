import axios from 'axios';

export const fetchContest = contestId => {
    // we return a promise
    return axios.get(`/api/contests/${contestId}`)
                .then(resp => resp.data);
};

export const fetchContestList = () => {
    // we return a promise
    return axios.get('/api/contests')
                .then(resp => resp.data.contests);
};
