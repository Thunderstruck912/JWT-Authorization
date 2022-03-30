// Data Transfer Object //

module.exports = class UserDto {
	email;
	id;
	isActiveted;
	constructor(model) {
		this.email = model.email;
		this.id = model._id;
		this.isActiveted = model.isActiveted;
	}
};
