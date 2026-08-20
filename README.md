# Jenkins Node.js CI/CD Application

Complete Node.js + Express application based on the Jenkins CI/CD website.

## Features

- Responsive Jenkins CI/CD website
- Node.js + Express backend
- `/health` endpoint
- Real contact form using Nodemailer
- Messages delivered to `venugopalareddy46@gmail.com`
- Jenkins Pipeline: checkout, npm install, test, build, deploy, health check
- Dockerfile for container deployment
- PM2 deployment on Ubuntu EC2

## Structure

```text
jenkins-nodejs-full-app/
├── app.js
├── package.json
├── test.js
├── Jenkinsfile
├── Dockerfile
├── .dockerignore
├── .env.example
├── README.md
└── public/
    ├── index.html
    ├── styles.css
    └── script.js
```

## Local Run

```bash
npm install
npm start
```

Open `http://localhost:3000`.

Health check:

```bash
curl http://localhost:3000/health
```

## Contact Email

Copy `.env.example` to `.env` and configure SMTP.

For Gmail, use a Gmail App Password, not your normal account password.

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-gmail-app-password
RECEIVER_EMAIL=venugopalareddy46@gmail.com
```

Never commit `.env` to GitHub.

## Jenkins Deployment

Install Node.js, npm, PM2 and curl on the Jenkins deployment agent/application server.

```bash
sudo npm install -g pm2
```

The pipeline deploys to `/opt/jenkins-nodejs-app`.

Pipeline:

```text
GitHub
  ↓
Jenkins
  ↓
Checkout
  ↓
npm ci
  ↓
npm test
  ↓
Build
  ↓
Deploy with PM2
  ↓
Health Check
  ↓
SUCCESS
```

## Docker

```bash
docker build -t jenkins-nodejs-app .
docker run -d --name jenkins-nodejs-app -p 3000:3000 --env-file .env jenkins-nodejs-app
```

## Important

The Contact form sends a POST request to `/api/contact`. Actual email delivery requires valid SMTP credentials. The recipient is configured as `venugopalareddy46@gmail.com` by default.
