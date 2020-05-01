import utils from "../../utils/apiCaller";

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

export function callGetApi(path, callback) {
	utils.httpRequest(path, 'get', null, (response) => {
		callback(response);
	});
}

export function callDeleteApi(path, callback) {
	utils.httpRequest(path, 'delete', {}, (response) => {
		callback(response);
	});
}

export function callUploadApi(path, body, callback) {
	utils.httpMultiPartRequest(path, body, (response) => {
		callback(response);
	});
}