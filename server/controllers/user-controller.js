const userService = require("../service/user-service");
// const {validationResult} = require("express-validator");

class UserController {
	// вызов функций по запросу router//
	async registration(request, response, next) {
		try {
			const {email, password} = request.body;
			const userData = await userService.registration(email, password);
			response.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, // время жизни cookie в ms //
				httpOnly: true, // httpOnly запрещает читать cookie из js //
			}); // сохранение в cookie refreshToken , не будет работать без cookie-parser
			return response.json(userData);
		} catch (e) {
			console.log(e);
		}
	}

	async login(request, response, next) {
		try {
		} catch (e) {}
	}
	async logout(request, response, next) {
		try {
		} catch (e) {}
	}
	async activate(request, response, next) {
		try {
		} catch (e) {}
	}
	async refresh(request, response, next) {
		try {
		} catch (e) {}
	}
	async getUsers(request, response, next) {
		try {
			response.json([12, 23]);
		} catch (e) {}
	}
}

module.exports = new UserController();
