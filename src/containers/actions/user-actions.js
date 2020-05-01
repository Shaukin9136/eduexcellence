import {callCreateApi, callGetApi, callupdateApi} from "../common/services";


export function createData(payload) {
    return new Promise((resolve, reject) => {
        return callCreateApi('users/users', payload, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function getTeachersList(page, limit, search) {
    return new Promise((resolve, reject) => {
        let path = `users/users?offset=${Number(page)}&limit=${Number(limit)}&role=teacher`;
        path += search && search !== '' ? `&searchKey=${search}` : '';
        return callGetApi(path, (response) => {
            if (response.status) {
                resolve(response.result)
            } else {
                reject(response)
            }
        })
    });
}

export function getFacultyList(page, limit, search) {
    return new Promise((resolve, reject) => {
        let path = `users/users?offset=${Number(page)}&limit=${Number(limit)}&role=faculty`;
        path += search && search !== '' ? `&searchKey=${search}` : '';
        return callGetApi(path, (response) => {
            if (response.status) {
                resolve(response.result)
            } else {
                reject(response)
            }
        })
    });
}

export function getUser(id) {
    return new Promise((resolve, reject) => {
        return callGetApi(`users/${id}`, (response) => {
            if (response.status) {
                resolve(response.result)
            } else {
                reject(response)
            }
        })
    });
}

export function updateData(id, payload) {
    return new Promise((resolve, reject) => {
        return callupdateApi(`users/${id}`, payload, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function verifyEmailAction(token) {
    return new Promise((resolve, reject) => {
        return callGetApi(`verifyemail/${token}`, (response) => {
            console.log(response);
            if (response.status) {
                resolve(response.result)
            } else {
                reject(response.result)
            }
        })
    });
}

export function resetPassword(payload) {
    return new Promise((resolve, reject) => {
        return callCreateApi(`resetpassword`, payload, (response) => {
            if (response.status) {
                resolve(response);
            } else {
                reject(response)
            }
        })
    });
}