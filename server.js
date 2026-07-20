const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('slugs.lol website'));

const DATA_FILE = path.join(__dirname, 'users.json');

async function loadUsers() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

app.post('/api/check-username', async (req, res) => {
    const { username } = req.body;
    
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const normalizedUsername = username.toLowerCase().trim();
    
    if (normalizedUsername.length < 3) {
        return res.json({ available: false, reason: 'Username too short' });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
        return res.json({ available: false, reason: 'Invalid characters' });
    }

    const users = await loadUsers();
    const isTaken = users.some(user => user.username.toLowerCase() === normalizedUsername);

    if (isTaken) {
        return res.json({ available: false, reason: 'Username taken' });
    }

    res.json({ available: true });
});

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const normalizedUsername = username.toLowerCase().trim();
    
    if (normalizedUsername.length < 3) {
        return res.status(400).json({ error: 'Username too short' });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
        return res.status(400).json({ error: 'Invalid characters in username' });
    }

    const users = await loadUsers();
    const isTaken = users.some(user => user.username.toLowerCase() === normalizedUsername);

    if (isTaken) {
        return res.status(409).json({ error: 'Username unavailable - user taken' });
    }

    const newUser = {
        id: Date.now(),
        username: normalizedUsername,
        email: email.toLowerCase().trim(),
        password,
        createdAt: new Date().toISOString(),
        verified: false
    };

    users.push(newUser);
    await saveUsers(users);

    res.json({ success: true, user: { id: newUser.id, username: newUser.username, email: newUser.email } });
});

app.get('/api/users', async (req, res) => {
    const users = await loadUsers();
    res.json(users.map(user => ({ id: user.id, username: user.username, email: user.email, createdAt: user.createdAt, verified: user.verified })));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});