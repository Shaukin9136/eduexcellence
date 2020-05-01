
// export const API_URL = 'http://localhost:7000';
export const API_URL = "http://139.59.17.29:7000";



function Utils() {

    this.httpRequest = (endpoint, method, data, cb) => {
        let xmlhttp;
        let token = localStorage.getItem("userAuthToken");

        // const host = process.env.API_URL;
        const host = API_URL;
        var url = host + "/api/" + endpoint;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }

        if (xmlhttp) {
            xmlhttp.open(method, url, true);
            xmlhttp.setRequestHeader(
                "Content-type",
                "application/json; charset=utf-8"
            );
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status !== 0) {
                        if (xmlhttp.response !== "") {
                            let response = JSON.parse(xmlhttp.response);

                            // Incase of user de-activation (when user is loggedin)
                            if (!response.status &&
                                ((response.result && response.result.message === "In Active User") ||
                                (response.result &&  response.result.message === "Invalid Token"))
                            ) {
                                localStorage.clear();
                                window.location.href = window.location.origin;
                            }
                            cb && cb(response);
                        }
                    } else {
                        let response = {
                            status: false,
                            result: { message: "Connection Refused" }
                        };
                        cb && cb(response);
                    }
                }
            };
            // xmlhttp.timeout = 10000;
            // xmlhttp.ontimeout = function (e) {
            //   var response = { status: false, result: { message: "Connection Timeout" } }
            //   cb && cb(response);
            //   // XMLHttpRequest timed out. Do something here.
            // };
            xmlhttp.setRequestHeader("x-access-token", token || "");
            xmlhttp.send(JSON.stringify(data));
        }
    }

    this.httpMultiPartRequest = (endpoint, data, cb) => {
        let xmlhttp;
        let token = localStorage.getItem("userAuthToken");
        // const host = process.env.API_URL;
        const host = API_URL;
        var url = host + "/api/" + endpoint;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } 
        // else {
        //     // code for IE6, IE5
        //     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        // }
        if (xmlhttp) {
            xmlhttp.open("post", url, true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status !== 0) {
                        if (xmlhttp.response !== "") {
                            let response = JSON.parse(xmlhttp.response);
                            cb && cb(response);
                        }
                    } else {
                        let response = {
                            status: false,
                            result: {
                                message: "Connection Refused"
                            }
                        };
                        cb && cb(response);
                    }
                }
            };
            xmlhttp.setRequestHeader("x-access-token", token || "");
            // const formData = new FormData();
            // formData.append('productmedia', data);
            xmlhttp.send(data);
        }
    }

    this.getLocalStorage = () => {
        try {
            return localStorage.getItem("userAuthToken");
        } catch (e) {
            // console.log(e.message);
            return "undefined";
        }
    }
}

var utils = new Utils();
export default utils;
