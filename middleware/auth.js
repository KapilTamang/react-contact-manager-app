const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	//Get token from request header
	const token = req.header('X-auth-token');

	//Check token exists
	if (!token) {
		return res.status(401).json({ msg: 'No token, Authorization denied.' });
	}

	try {
		const decode = jwt.verify(token, config.get('jwtSecret'));

		req.user = decode.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Invalid token' });
	}
};
