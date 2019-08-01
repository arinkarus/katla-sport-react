import history from '../utils/history';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 404) {
                history.push("/NotFound");
            }

            const error = data && data.message || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}