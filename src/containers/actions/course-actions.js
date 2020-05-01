import {callupdateApi} from "../common/services";


export function updateCourse(id, payload) {
    return new Promise((resolve, reject) => {
        return callupdateApi(`courses/${id}`, payload, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}