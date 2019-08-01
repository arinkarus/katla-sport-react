import { handleResponse } from '../utils/handleResponse';
import { apiDomain } from '../utils/config';

export const awardService = {
    getAll,
    getById,
    update,
    create,
    _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiDomain}/api/Awards/`, requestOptions).then(handleResponse); 
}

function getById(awardId) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiDomain}/api/Awards/${awardId}`, requestOptions).then(handleResponse); 
}

function _delete(awardId) {
    const requestOptions = {
        method: 'DELETE',
    };

    return fetch(`${apiDomain}/api/Awards/${awardId}`, requestOptions).then(handleResponse); 
}

function create(award) {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(award)
    };

    return fetch(`${apiDomain}/api/Awards`, requestOptions).then(handleResponse); 
}

function update(awardId, award) {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(award)
    };

    return fetch(`${apiDomain}/api/Awards/${awardId}`, requestOptions).then(handleResponse); 
}