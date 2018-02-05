/**
 * @file mock middleware
 * @author Dewyzee<fe.dewyzee@gmail.com>
 */

 const path = require('path');

 module.exports = function (req, res, next) {
    const baseUrl = req.baseUrl;
    const reqPath = req.path;
    const mockFile = path.join(__dirname, '../../mock', baseUrl, reqPath);

    delete require.cache[require.resolve(mockFilePath)];
    
    const resHandler = require(mockFilePath);

    console.log(resHandler);

    // 请求接口的延迟
    const timeout = resHandler.timeout || 0;

    // 请求数据
    const data = resHandler.response(req);

    console.log('Find mock file:', mockFilePath);
    console.log('Mock file timeout:', timeout);

    setTimeout(() => {
        res.send(data);
    }, timeout);
 };
