const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'register', 'register.html'));
});

app.get('/register/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'register', 'register.html'));
});

app.use('/register', express.static(path.resolve(__dirname, 'register'), {
    index: false
}));

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'login', 'login.html'));
});

app.get('/login/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'login', 'login.html'));
});

app.use('/login', express.static(path.resolve(__dirname, 'login'), {
    index: false
}));

app.get('/:emailRequest', async (req, res, next) => {
    const { emailRequest } = req.params;
    if (emailRequest.endsWith('=request') && req.query.reset !== undefined) {
        const email = emailRequest.split('=request')[0];
        const normalizedEmail = email.toLowerCase().trim();
        const resets = await loadResets();
        const reset = resets.find(r => r.email.toLowerCase() === normalizedEmail && !r.used && new Date(r.expiresAt) > new Date());
        if (!reset) {
            return res.status(400).send('Invalid or expired reset link. Please request a new one.');
        }
        const users = await loadUsers();
        const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
        if (!user) {
            return res.status(404).send('User not found.');
        }
        try {
            let html = await fs.readFile(path.resolve(__dirname, 'reset-password', 'reset-password.html'), 'utf8');
            html = html.replace('{{USERNAME}}', user.username);
            res.send(html);
        } catch (err) {
            res.status(500).send('Internal server error');
        }
    } else {
        next();
    }
});

app.use(express.static(__dirname));

const DATA_FILE = path.join(__dirname, 'users.json');
const RESET_FILE = path.join(__dirname, 'password-resets.json');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

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

async function loadResets() {
    try {
        const data = await fs.readFile(RESET_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Error loading resets:', error);
        }
        return [];
    }
}

async function saveResets(resets) {
    try {
        await fs.writeFile(RESET_FILE, JSON.stringify(resets, null, 2));
    } catch (error) {
        console.error('Error saving resets:', error);
        throw error;
    }
}

async function sendWelcomeEmail(email, username) {
    await transporter.verify();
    await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@slugs.lol',
        to: email,
        subject: 'Welcome to slugs.lol',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px"><h2 style="color:#10b981">Welcome to slugs.lol</h2><p>Hi ${username}, your account has been created successfully.</p><p>You can now sign in and start using your profile.</p></div>`
    });
}

async function sendResetEmail(email) {
    await transporter.verify();
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/${email}=request?reset`;
    await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@slugs.lol',
        to: email,
        subject: 'Reset Your Password - slugs.lol',
        html: `Here is the <a href="${resetUrl}" style="color: blue;">link</a> to reset your password.`
    });
}

app.get('/api/stats', async (req, res) => {
    try {
        const users = await loadUsers();
        let totalProfileViews = 0;
        let registeredUsers = users.length;
        let filesHosted = 0;
        let activeSubscribers = 0;

        users.forEach(user => {
            if (user.profileViews) totalProfileViews += parseInt(user.profileViews) || 0;
            if (user.hasBio || user.bio) totalProfileViews += 1;
            if (user.filesCount || user.videoUploaded) filesHosted += parseInt(user.filesCount) || 1;
            if (user.activeSubscription || user.premium) activeSubscribers += 1;
        });

        res.json({
            totalProfileViews,
            registeredUsers,
            filesHosted,
            activeSubscribers
        });
    } catch (error) {
        res.json({ totalProfileViews: 0, registeredUsers: 0, filesHosted: 0, activeSubscribers: 0 });
    }
});

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
            verified: false,
            profileViews: 0,
            bio: "",
            videoUploaded: false,
            activeSubscription: false
        };

        users.push(newUser);
        await saveUsers(users);
        await sendWelcomeEmail(normalizedEmail, normalizedUsername);

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

app.post('/api/request-password-reset', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const normalizedEmail = email.toLowerCase().trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const users = await loadUsers();
        const user = users.find(u => u.email.toLowerCase() === normalizedEmail);

        if (!user) {
            return res.json({ error: 'No account found with that email address' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000).toISOString();

        const resets = await loadResets();
        resets.push({
            email: normalizedEmail,
            token: resetToken,
            expiresAt,
            used: false
        });
        await saveResets(resets);

        try {
            await sendResetEmail(normalizedEmail);
            res.json({ success: true, message: 'Reset link sent to email' });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            res.json({ error: 'Failed to send reset email. Check SMTP settings.' });
        }
    } catch (error) {
        console.error('Error requesting password reset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        
        if (!email || !newPassword) {
            return res.status(400).json({ error: 'Email and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Password too short' });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const resets = await loadResets();
        const reset = resets.find(r => r.email.toLowerCase() === normalizedEmail && !r.used && new Date(r.expiresAt) > new Date());

        if (!reset) {
            return res.status(400).json({ error: 'Invalid or expired reset session' });
        }

        const users = await loadUsers();
        const userIndex = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);

        if (userIndex === -1) {
            return res.status(400).json({ error: 'User not found' });
        }

        users[userIndex].password = newPassword;
        await saveUsers(users);

        reset.used = true;
        await saveResets(resets);

        res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
