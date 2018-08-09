const http = require('http');

const HOST = 'localhost';
const PORT = 3001;

const generateGetOptions = (apiPath) => {
    let options = {
        host: HOST,
        port: PORT,
        path: apiPath,
        method: 'GET',
        };
    return options;
};

exports.getRequest = (path, cb) => {
    const options = generateGetOptions(path);
    http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', () => {
            const data = JSON.parse(body);
            cb(null, data);
        });
        res.on('error', cb);
    }).on('error', cb).end();
};


const generatePostOptions = (apiPath, data) => {
    const postOptions = {
        host: HOST,
        port: PORT,
        path: apiPath,
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
        }
    };
    return postOptions;
}

exports.postRequest = (path, postData) => {
    const postOptions = generatePostOptions(path, postData);
    const post_req = http.request(postOptions, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
        post_req.write(postData);
        post_req.end();
    });
};