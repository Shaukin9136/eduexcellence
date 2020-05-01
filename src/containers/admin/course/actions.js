import {
    callCreateCourseApi, callUpdateCourseApi, callCourseListApi,
    callCreateApi, callListApi, callupdateApi, callDeleteApi,
    callGetCourseApi, callUploadApi
} from "./services";

export const COURSE_DETAILS = 'COURSE_DETAILS';
export const COURSE_LIST = 'COURSE_LIST';

export function getCourseList(page, limit, search) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            return callCourseListApi(page, limit, search, (response) => {
                if (response.status) {
                    dispatch(saveCourseList(response.result.data))
                    resolve(response)
                    return;
                } else {
                    reject(response)
                    return;
                }
            })
        });
    }
}

export function getCourse(id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            return callGetCourseApi(id, (response) => {
                if (response.status) {
                    dispatch(saveCourse(response.result.data))
                    resolve(response)
                    return;
                } else {
                    reject(response)
                    return;
                }
            })
        });
    }
}

export function createCourse(body) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            return callCreateCourseApi(body, (response) => {
                if (response.status) {
                    dispatch(saveCourse(response.result.data))
                    resolve(response)
                    return;
                } else {
                    reject(response)
                    return;
                }
            })
        });
    }
}

export function updateCourse(body, id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            return callUpdateCourseApi(body, id, (response) => {
                if (response.status) {
                    dispatch(saveCourse(response.result.data))
                    resolve(response)
                    return;
                } else {
                    reject(response)
                    return;
                }
            })
        });
    }
}

export function getList(path) {
    return new Promise((resolve, reject) => {
        return callListApi(path, 0, 100, (response) => {
            if (response.status) {
                resolve(response.result.data.docs)
            } else {
                reject(response)
            }
        })
    });
}

export function createData(path, payload) {
    return new Promise((resolve, reject) => {
        return callCreateApi(path, payload, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function updateData(path, payload) {
    return new Promise((resolve, reject) => {
        return callupdateApi(path, payload, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function updateChapter(id, payload) {
    return new Promise((resolve, reject) => {
        return callupdateApi(`chapters/${id}`, payload, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function deleteChapter(id) {
    return new Promise((resolve, reject) => {
        return callDeleteApi(`chapters/${id}`, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function deleteCourse(id) {
    return new Promise((resolve, reject) => {
        return callDeleteApi(`courses/${id}`, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function deleteDates(id) {
    return new Promise((resolve, reject) => {
        return callDeleteApi(`impdates/${id}`, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function saveThumb(file, obj) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const data = new FormData()
            data.append('thumbnail', file)
            return callUploadApi(`courses/uploadCourseThumbnail/${obj._id}`, data, (response) => {
                if (response.status) {
                    obj['thumbnail'] = response.result.data;
                    dispatch(saveCourse(obj))
                    resolve(response.result.data)
                } else {
                    reject(response)
                }
            })
        });
    }
}

export function saveResourceFile(file, id) {
    return new Promise((resolve, reject) => {
        const data = new FormData()
        data.append('chapterdoc', file)
        return callUploadApi(`chapters/uploadChapterDoc/${id}`, data, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function saveChapterImgFile(file, id) {
    return new Promise((resolve, reject) => {
        const data = new FormData()
        data.append('chapterimg', file)
        return callUploadApi(`chapters/uploadChapterImage/${id}`, data, (response) => {
            if (response.status) {
                resolve(response.result.data)
            } else {
                reject(response)
            }
        })
    });
}

export function saveCourse(data) {
    return {
        type: COURSE_DETAILS,
        data: data
    }
}

export function saveCourseList(data) {
    return {
        type: COURSE_LIST,
        data: data
    }
}
