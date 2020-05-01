import utils from "../../../utils/apiCaller";

export function callEnrolListApi(page, limit, search, callback) {
	let path = `enrol?offset=${Number(page)}&limit=${Number(limit)}`;
	path += search && search !== '' ? `&searchKey=${search}` : '';
	utils.httpRequest(path, 'get', null, (response) => {
		callback(response);
	});
}

export function callUsersListApi(page, limit, callback) {
	utils.httpRequest(`users/users?offset=${Number(page)}&limit=${Number(limit)}&role=teacher`, 'get', null, (response) => {
		callback(response);
	});
}

export function callCourseListApi(page, limit, body, callback) {
	utils.httpRequest(`courses-dashboard?offset=${Number(page)}&limit=${Number(limit)}`, 'post', body, (response) => {
		callback(response);
	});
}