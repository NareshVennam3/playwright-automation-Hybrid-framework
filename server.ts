import express, { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import pool from './db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const JWT_SECRET = "mysecretkey";

/* ================================
   TYPES
================================ */

interface User {
  id: number;
  username: string;
  password: string;
}

interface AuthRequest extends Request {
  user?: any;
}

/* ================================
   UI SECTION
================================ */

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <h2>Employee Login</h2>
    <form method="POST" action="/login">
      <input name="username" placeholder="Username" />
      <input name="password" placeholder="Password" type="password"/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM users WHERE username=$1',
    [username]
  );

  if (result.rows.length === 0) {
    return res.send('<h3>Invalid Login</h3>');
  }

  const user: User = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send('<h3>Invalid Login</h3>');
  }

  res.redirect('/dashboard');
});

app.get('/dashboard', (req: Request, res: Response) => {
  res.send(`
    <h2>Employee Dashboard</h2>
    <form method="POST" action="/addEmployee">
      <input name="empName" placeholder="Employee Name"/>
      <button type="submit">Add Employee</button>
    </form>
    <a href="/employees">View Employees</a>
  `);
});

app.post('/addEmployee', async (req: Request, res: Response) => {
  const name = req.body.empName;

  await pool.query(
    'INSERT INTO employees(name) VALUES($1)',
    [name]
  );

  res.redirect('/employees');
});

app.get('/employees', async (req: Request, res: Response) => {
  const result = await pool.query('SELECT name FROM employees');

  res.send(`
    <h3>Employees:</h3>
    ${result.rows.map((e: any) => `<p>${e.name}</p>`).join('')}
    <a href="/dashboard">Back</a>
  `);
});

/* ================================
   API SECTION
================================ */

app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM users WHERE username=$1',
    [username]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user: User = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

/* ================================
   JWT Middleware
================================ */

function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
}

app.post('/api/employees', authenticateToken, async (req: Request, res: Response) => {
  const name = req.body.name;

  await pool.query(
    'INSERT INTO employees(name) VALUES($1)',
    [name]
  );

  res.json({
    message: "Employee added via API",
    employee: name
  });
});

app.get('/api/employees', authenticateToken, async (req: Request, res: Response) => {
  const result = await pool.query('SELECT name FROM employees');

  res.json(result.rows.map((e: any) => e.name));
});

app.listen(3000, () => console.log("App running at http://localhost:3000"));