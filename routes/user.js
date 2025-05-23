const express = require('express');
const { userLogin, userSignUp, userOtpVerify, loadUser, getNearestRes, getResFood, addToCart, removeFromCart, increaseQutOfCartFood, decreaseQutOfCartFood, getMyCartDetail, addOrRemoveFoodInSave, getMySaveFoods, getMyOrderHistory, getMyActiveOrder, getAllFilters, getSearchNearestRes, getSearcDishhNearestRes, userCancelOrder, userLogout, forgotPasswordToken, resetPassByLink, resetPassLinkVerify,  } = require('../controller/user')
const { isUserAuth } = require('../middleware/userAuth');
const router = express.Router();


router.route('/user/signUp').post(userSignUp)
router.route('/user/signUp/verify').post(userOtpVerify)
router.route('/user/login').post(userLogin)
router.route('/user/logout').get(isUserAuth, userLogout)
router.route('/user/me').get(isUserAuth, loadUser)
router.route('/user/forgot/pass/token').post(forgotPasswordToken)
router.route('/user/reset/pass/link/verify').post(resetPassLinkVerify)
router.route('/user/reset/pass/bylink').post(resetPassByLink)

router.route('/user/order/cancel/:ordId').delete(isUserAuth, userCancelOrder)

router.route('/user/nearestrestu').post(getNearestRes)
router.route('/user/nearestrestu/search/res').post(getSearchNearestRes)
router.route('/user/nearestrestu/search/dish').post(getSearcDishhNearestRes)
router.route('/user/rest/foods/:resId').get(getResFood)

router.route('/user/my/cart').get(isUserAuth, getMyCartDetail)
router.route('/user/addtocart').post(isUserAuth, addToCart)
router.route('/user/removefromcart').put(isUserAuth, removeFromCart)
router.route('/user/update/cart').put(isUserAuth, increaseQutOfCartFood)
router.route('/user/remove/cart').put(isUserAuth, decreaseQutOfCartFood)


router.route('/user/addoremove/save/:foodId').get(isUserAuth, addOrRemoveFoodInSave)
router.route('/user/my/save').get(isUserAuth, getMySaveFoods)
router.route('/user/my/order/history').get(isUserAuth, getMyOrderHistory)
router.route('/user/my/order/active').get(isUserAuth, getMyActiveOrder)
// router.route('/user/my/order/active').get(isUserAuth, getMyActiveOrder)

router.route('/user/all/filters').get(getAllFilters)

module.exports = router