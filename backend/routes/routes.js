const express = require('express');
const router = express.Router();
const app = express();
/* html routes */
const indexRoute = require('./html/indexHTML.js');
const regRoute = require('./html/regHTML.js');
const adminRoute = require('./html/adminHTML.js');
const editUsersRoute = require('./html/editUsersHTML.js');
const userRoute = require('./html/userHTML.js');
//const categoryRoute = require('.html/user/new.js');
const payRoute = require('./html/payHTML.js');
//const cartRoute = require('./html/')


//const cartRoute = require('/html/cartHTML.js');

/* bootsrap routes */
const bootstrapRoute = require('./bootstrap/bootstrap.js');

/* css routes */
const styleCSSRoute = require('./css/styleCSS.js');
const payCSSRoute = require('./css/payCSS.js')
const indexCSSRoute = require('./css/indexCSS.js');
const registerCSSRoute = require('./css/registerCSS.js');

/* js (frontend) routes */
const loginRoute = require('./js/login.js');
const registerRoute = require('./js/register.js');
const logoutRoute = require('./js/logout.js');
const adminJSRoute = require('./js/admin/admin.js');
const editUsersJSRoute = require('./js/admin/editUsers.js');
const userJSRoute = require('./js/user/user.js');
const profileJSRoute = require('./js/profile/profile.js');
const payJSRoute = require('./js/profile/pay.js');
//const categoryJSRoute = require('.js/category/category.js')
//const cartJSRoute = require('/js/user/cart.js');

/* API routes */
const loginDataRoute = require('./API/login.js');
const logoutDataRoute = require('./API/logout.js');
const regDataRoute = require('./API/registration.js');
const termekekRoute = require('./API/termekek.js');
const getUserEmailRoute = require('./API/getUserEmail.js');
const getUserRoute = require('./API/getUser.js');
const editUserRoute = require('./API/editUser.js');
const adminEditUsersRoute = require('./API/adminEditUsers.js');
//const cartRoute = require('/API/cart.js');
//const categoryJSRoute = require('./API/category.js')

// html
router.use('/', indexRoute);
router.use('/', regRoute);
router.use('/', adminRoute);
router.use('/', editUsersRoute);
router.use('/', userRoute);
//router.use('/', categoryRoute)
router.use('/', payRoute);
//router.use('/',cartRoute);

// bootstrap
router.use('/', bootstrapRoute);

// css
router.use('/', styleCSSRoute);
router.use('/', payCSSRoute);
router.use('/', indexCSSRoute);
router.use('/', registerCSSRoute);

// frontend js fájljai
router.use('/', loginRoute);
router.use('/', registerRoute);
router.use('/', logoutRoute);
router.use('/', adminJSRoute);
router.use('/', editUsersJSRoute);
router.use('/', userJSRoute);
router.use('/', profileJSRoute);
router.use('/', payJSRoute);
//router.use('/', categoryRoute);
//router.use('/', cartJSRoute);

// API
router.use('/', loginDataRoute);
router.use('/', logoutDataRoute);
router.use('/', regDataRoute);
router.use('/', termekekRoute);
router.use('/', getUserEmailRoute);
router.use('/', getUserRoute);
router.use('/', editUserRoute);
router.use('/', adminEditUsersRoute);
//router.use('/', categoryRoute);
//router.use('/', cartJSRoute);









module.exports = router;