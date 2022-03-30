const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
	// функция для регистрации пользовалется //
	async registration(email, password) {
		// проверка на уникальность нового пользователя ( при регистрации) //
		const candidate = await UserModel.findOne({email});
		if (candidate) {
			throw new Error(`Пользователь с таким ${email} уже существует`);
		}
		const hashPassword = await bcrypt.hash(password, 4, (err, hash) => {});
		// защита хэшированием пароля (bqrypt) //
		const activationLink = await uuid.v4();

		const user = await UserModel.create({
			email,
			password: hashPassword,
			activationLink,
		}); // создание нового пользователи и сохранение в BD //
		await mailService.sendActivationMail(email, activationLink); // отправка письма для активации //

		const userDto = new UserDto(user); // использование как payload , внутри поля (email id isActivated) //
		const tokens = tokenService.generateToken({...userDto});
		await tokenService.saveToken(userDto.id, tokens.refreshToken); // сохранение refreshToken в BD //

		return {...tokens, user: userDto};
	}
}

module.exports = new UserService();
