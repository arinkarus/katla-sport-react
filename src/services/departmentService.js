import { handleResponse } from '../utils/handleResponse';
import { apiDomain } from '../utils/config';

export const departmentService = {
    getById,
    getAll,
    getParents,
    getChilds,
    _delete,
    create,
    update
};

function getAll() {
	const requestOptions = {
		method: 'GET'
	};

	return fetch(`${apiDomain}/api/Departments/`, requestOptions).then(handleResponse); 
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiDomain}/api/Departments/${id}`, requestOptions).then(handleResponse);
}

function getChilds(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiDomain}/api/Departments/parents/${id}`, requestOptions).then(handleResponse); 
}

function getParents() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiDomain}/api/Departments/parents`, requestOptions).then(handleResponse); 
}

function _delete(id) {
	const requestOptions = {
		method: "DELETE"
	};

	return fetch(`${apiDomain}/api/Departments/${id}`, requestOptions).then(handleResponse); 
}

function create(department) {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(department)
    };

    return fetch(`${apiDomain}/api/Departments`, requestOptions).then(handleResponse);
}

function update(departmentId, department) {
    const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(department)
    };

    return fetch(`${apiDomain}/api/Departments/${departmentId}`, requestOptions).then(handleResponse);
}
