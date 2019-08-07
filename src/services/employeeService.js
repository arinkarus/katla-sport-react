import { handleResponse } from '../utils/handleResponse';
import { apiDomain } from '../utils/config';

export const employeeService = {
    getAll,
    getById,
    getProfileById,
    update,
    updatePhoto,
    create,
    _delete,
    deletePhoto
};

function getProfileById(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiDomain}/api/Employees/profile/${id}`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiDomain}/api/Employees/`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiDomain}/api/Employees/${id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(`${apiDomain}/api/Employees/${id}`, requestOptions).then(handleResponse);
}

function create(employee) {

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    };

    return fetch(`${apiDomain}/api/Employees`, requestOptions).then(handleResponse);
}

function update(id, employee) {
    const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    };

    return fetch(`${apiDomain}/api/Employees/${id}`, requestOptions).then(handleResponse);
}

function updatePhoto(employeeId, imageData) {
    const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData)
    };

    return fetch(`${apiDomain}/api/Employees/${employeeId}/photo`, requestOptions).then(handleResponse);
}

function deletePhoto(employeeId) {
    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(`${apiDomain}/api/Employees/${employeeId}/photo`, requestOptions).then(handleResponse);
}