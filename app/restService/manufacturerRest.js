const http = require('http');

exports.generatePostOptions = (apiPath, data) => {
    const postOptions = {
        host: 'localhost',
        port: 3001,
        path: apiPath,
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
        }
    };
return postOptions;
}


exports.postRequest = (postOptions, postData) => {
const post_req = http.request(postOptions, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
});
post_req.write(postData);
post_req.end();
};