import utils from '../../../utils/apiCaller';


export function callCreateCourseApi(body, callback) {
	utils.httpRequest('courses', 'post', body, (response) => {
		callback(response);
	});
}

export function callUpdateCourseApi(body, id, callback) {
	utils.httpRequest(`courses/${id}`, 'put', body, (response) => {
		callback(response);
	});
}

export function callCourseListApi(page, limit, search, callback) {
	let path = `courses?offset=${Number(page)}&limit=${Number(limit)}`;
	path += search && search !== '' ? `&searchKey=${search}` : '';
	utils.httpRequest(path, 'get', null, (response) => {
		callback(response);
	});
}

export function callGetCourseApi(id, callback) {
	utils.httpRequest(`courses/${id}`, 'get', null, (response) => {
		callback(response);
	});
}

export function callListApi(path, page, limit, callback) {
	utils.httpRequest(`${path}&offset=${Number(page)}&limit=${Number(limit)}`, 'get', null, (response) => {
		callback(response);
	});
}

export function callCreateApi(path, body, callback) {
	utils.httpRequest(path, 'post', body, (response) => {
		callback(response);
	});
}

export function callupdateApi(path, body, callback) {
	utils.httpRequest(path, 'put', body, (response) => {
		callback(response);
	});
}

export function callDeleteApi(path, callback) {
	utils.httpRequest(path, 'delete', {}, (response) => {
		callback(response);
	});
}

export function callSaveThumbApi(body, id, callback) {
	utils.httpMultiPartRequest(`courses/uploadCourseThumbnail/${id}`, body, (response) => {
		callback(response);
	});
}

export function callUploadApi(path, body, callback) {
	utils.httpMultiPartRequest(path, body, (response) => {
		callback(response);
	});
}


