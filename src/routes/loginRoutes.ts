import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
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

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hi@hi.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password!');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
         <div>
          <div>You are logged in.</div>
          <a href="/logout">Logout</a>
         </div>
      `);
  } else {
    res.send(`
         <div>
          <div>You are not logged in.</div>
          <a href="/login">Login</a>
         </div>
      `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

export { router };
