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
    //console.log(postOptions);
    const request = http.request(postOptions, (res) => {
        let result = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            result += chunk
        });
        res.on('end', () => {
            //console.log(result);
        });

    });
    request.write(postData);
    request.end();
};