"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    var _a;
    if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) === true) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted!');
}
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
    res.send(`
    <form method="POST" action="/login"> 
      <div>
        <label>Email</label>
        <input type="email" name="email" />
      </div>
      <br />
      <div>
        <label>Password</label>
        <input type="password" name="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  `);
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === 'hi@hi.com' && password === 'password') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password!');
    }
});
router.get('/', (req, res) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        res.send(`
         <div>
          <div>You are logged in.</div>
          <a href="/logout">Logout</a>
         </div>
      `);
    }
    else {
        res.send(`
         <div>
          <div>You are not logged in.</div>
          <a href="/login">Login</a>
         </div>
      `);
    }
});
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send('Welcome to protected route, logged in user');
});
