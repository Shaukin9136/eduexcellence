import { callCreateApi } from "../course/services";
import {callEnrolListApi, callUsersListApi, callCourseListApi} from "./services";


export function getCourseList(page, limit, category = undefined, subCategory = undefined) {
    let body = {};
    if (category && category !== "") {
        body["category"] = category;
    }
    if (subCategory && subCategory !== "") {
        body["subCategory"] = subCategory;
    }
    
    return new Promise((resolve, reject) => {
        return callCourseListApi(page, limit, body, (response) => {
            return response.status ?
                resolve(response.result.data)
                :
                reject(response)
        })
    });
}

export function saveEnrol (obj) {
    return new Promise((resolve, reject) => {
        return callCreateApi('enrol', obj, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function getEnrolList(page, limit, search) {
    return new Promise((resolve, reject) => {
        return callEnrolListApi(page, limit, search, (response) => {
            return response.status ?
                resolve(response.result)
                :
                reject(response)
        })
    });
}

export function getUsersList(page, limit) {
    return new Promise((resolve, reject) => {
        return callUsersListApi(page, limit, (response) => {
            return response.status ?
                resolve(response.result.data)
                :
                reject(response)
        })
    });
}