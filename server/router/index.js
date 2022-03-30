const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();

//Энд поинты //

router.post("/registration", userController.registration); // регистрация
router.post("/login", userController.login); // войти
router.post("/logout", userController.logout); // выйти
router.get("/activate/:link", userController.activate); // активация акк по ссылке
router.get("/refresh", userController.refresh); // перезаписть аксес токена (если он умер/не валиден)
router.get("/users", userController.getUsers); // тестовый вызов всех пользователей

module.exports = router;
