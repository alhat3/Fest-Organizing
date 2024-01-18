const ErrorHandler = require("./errorHandler");
exports.sendToken = (model, expireTime) => {
    const token = model.generateToken(expireTime);
    return token;

};
exports.sendCookie = (cookieName, token, expiryTime, res) => {
    const options = {
        expires: new Date(Date.now() + parseInt(expiryTime)),
        httpOnly: true,
    };
    return res.cookie(cookieName, token, options);
};
