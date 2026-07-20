const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const DATA_FILE = path.join(__dirname, '..', 'users.json');

async function loadUsers() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Error loading users:', error);
        }
        return [];
    }
}

async function saveUsers(users) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error saving users:', error);
        throw error;
    }
}

app.post('/api/check-username', async (req, res) => {
    try {
        const { username } = req.body;
        
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const normalizedUsername = username.toLowerCase().trim();
        
        if (normalizedUsername.length < 3) {
            return res.json({ available: false, reason: 'Username too short' });
        }

        if (normalizedUsername.length > 20) {
            return res.json({ available: false, reason: 'Username too long' });
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
    } catch (error) {
        console.error('Error checking username:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const normalizedUsername = username.toLowerCase().trim();
        const normalizedEmail = email.toLowerCase().trim();
        
        if (normalizedUsername.length < 3) {
            return res.status(400).json({ error: 'Username too short' });
        }

        if (normalizedUsername.length > 20) {
            return res.status(400).json({ error: 'Username too long' });
        }

        if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
            return res.status(400).json({ error: 'Invalid characters in username' });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password too short' });
        }

        const users = await loadUsers();
        const isTaken = users.some(user => user.username.toLowerCase() === normalizedUsername);
        const emailTaken = users.some(user => user.email.toLowerCase() === normalizedEmail);

        if (isTaken) {
            return res.status(409).json({ error: 'Username unavailable - user taken' });
        }

        if (emailTaken) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const newUser = {
            id: Date.now(),
            username: normalizedUsername,
            email: normalizedEmail,
            password,
            createdAt: new Date().toISOString(),
            verified: false
        };

        users.push(newUser);
        await saveUsers(users);

        res.json({ success: true, user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await loadUsers();
        res.json(users.map(user => ({ id: user.id, username: user.username, email: user.email, createdAt: user.createdAt, verified: user.verified })));
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
