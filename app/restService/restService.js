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

exports.postRequest = (path, postData, cb) => {
    const postOptions = generatePostOptions(path, postData);
    const request = http.request(postOptions, (res) => {
        let result = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            result += chunk
        });
        res.on('end', () => {
            //console.log(result);
            cb(null, result);
        });
        res.on('error', cb);
    });
    request.write(postData);
    request.end();
};

const generateDeleteOptions = (apiPath, data) => {
    const deleteOptions = {
        host: HOST,
        port: PORT,
        path: apiPath,
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
        }
    };
    return deleteOptions;
}

exports.deleteRequest = (path, deleteData, cb) => {
    const deleteOptions = generateDeleteOptions(path, deleteData);
    const request = http.request(deleteOptions, (res) => {
        let result = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            result += chunk
        });
        res.on('end', () => {
            //console.log(result);
            cb(null, result);
        });
        res.on('error', cb);
    });

    request.write(deleteData);
    request.end();
};