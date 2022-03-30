const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

class TokenService {
	// функция для генерации JWT токенов //
	generateToken(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
			expiresIn: "30d",
		});
		return {
			accessToken,
			refreshToken,
		};
	}
	// сохранение refreshToken в BD //
	async saveToken(userId, refreshToken) {
		const tokenData = await tokenModel.findOne({user: userId}); // поиск token по userId в BD //
		if (tokenData) {
			tokenData.refreshToken = refreshToken; // перезаписть refreshToken //
			return tokenData.save(); // обновление токена в BD //
		}
		const token = await tokenModel.create({user: userId, refreshToken}); // кейс если пользователь не найден //
		return token;
	}
}

module.exports = new TokenService();
