import type { Instruction } from "../types/instruction-types";

export const instructions: Instruction[] = [
  {
    slug: "micro-editor",
    title: "Micro Terminal Editor",
    description: "Install and use Micro - a modern terminal text editor",
    icon: "📝",
    category: "setup",
    difficulty: "beginner",
    dependencies: [{ name: "Micro", install: "apt install micro" }],
    content: `
## Install Micro

\`\`\`bash
sudo apt update
\`\`\`

\`\`\`bash
sudo apt install micro -y
\`\`\`

Or install the latest version:

\`\`\`bash
curl https://getmic.ro | bash
\`\`\`

\`\`\`bash
sudo mv micro /usr/local/bin/
\`\`\`

## Basic Usage

Open a file:

\`\`\`bash
micro filename.txt
\`\`\`

Open with sudo:

\`\`\`bash
sudo micro /etc/nginx/nginx.conf
\`\`\`

## Keyboard Shortcuts

### File

- \`Ctrl+S\` Save
- \`Ctrl+Q\` Quit
- \`Ctrl+O\` Open file

### Edit

- \`Ctrl+Z\` Undo
- \`Ctrl+Y\` Redo
- \`Ctrl+K\` Cut line
- \`Ctrl+C\` Copy
- \`Ctrl+V\` Paste
- \`Ctrl+D\` Duplicate line

### Navigation

- \`Ctrl+F\` Find
- \`Ctrl+H\` Find and replace
- \`Ctrl+G\` Go to line
- \`Ctrl+A\` Select all
- \`Ctrl+E\` Command bar

## Settings

Open settings:

\`\`\`bash
micro ~/.config/micro/settings.json
\`\`\`

Recommended settings:

\`\`\`json
{
    "colorscheme": "gruvbox",
    "tabsize": 2,
    "tabstospaces": true,
    "autoindent": true,
    "savecursor": true,
    "scrollbar": true
}
\`\`\`

## Change Color Scheme

Available themes: \`default\`, \`gruvbox\`, \`dracula\`, \`monokai\`, \`solarized\`

Set in command bar (\`Ctrl+E\`):

\`\`\`
set colorscheme gruvbox
\`\`\`

## Set as Default Editor

\`\`\`bash
echo 'export EDITOR=micro' >> ~/.bashrc
\`\`\`

\`\`\`bash
source ~/.bashrc
\`\`\`
    `,
  },
  {
    slug: "nginx-api-setup",
    title: "Nginx API Proxy Setup",
    description: "Set up Nginx as a reverse proxy for your API on Linux",
    icon: "🔧",
    category: "setup",
    difficulty: "intermediate",
    dependencies: [
      { name: "Nginx", install: "apt install nginx" },
      { name: "Certbot", install: "apt install certbot python3-certbot-nginx" },
      { name: "Micro", url: "/instructions/micro-editor" },
    ],
    content: `
## Install Nginx

\`\`\`bash
sudo apt update
\`\`\`

\`\`\`bash
sudo apt install nginx -y
\`\`\`

\`\`\`bash
sudo systemctl start nginx
\`\`\`

\`\`\`bash
sudo systemctl enable nginx
\`\`\`

## Open Firewall

\`\`\`bash
sudo ufw allow 'Nginx Full'
\`\`\`

\`\`\`bash
sudo ufw enable
\`\`\`

## Create Config

\`\`\`bash
sudo rm /etc/nginx/sites-enabled/default
\`\`\`

\`\`\`bash
sudo micro /etc/nginx/sites-available/api.example.com
\`\`\`

Paste this (change \`api.example.com\` and port \`3000\`):

\`\`\`nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
\`\`\`

Save with \`Ctrl+S\` and quit with \`Ctrl+Q\`

## Enable Site

\`\`\`bash
sudo ln -s /etc/nginx/sites-available/api.example.com /etc/nginx/sites-enabled/
\`\`\`

\`\`\`bash
sudo nginx -t
\`\`\`

\`\`\`bash
sudo systemctl reload nginx
\`\`\`

## Add SSL

\`\`\`bash
sudo apt install certbot python3-certbot-nginx -y
\`\`\`

\`\`\`bash
sudo certbot --nginx -d api.example.com
\`\`\`

Test auto-renewal:

\`\`\`bash
sudo certbot renew --dry-run
\`\`\`

## Add Security Headers

Edit your config:

\`\`\`bash
sudo micro /etc/nginx/sites-available/api.example.com
\`\`\`

Add these lines inside the \`server\` block:

\`\`\`nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Strict-Transport-Security "max-age=31536000" always;
\`\`\`

Reload:

\`\`\`bash
sudo systemctl reload nginx
\`\`\`

## View Logs

Error log:

\`\`\`bash
sudo tail -f /var/log/nginx/error.log
\`\`\`

Access log:

\`\`\`bash
sudo tail -f /var/log/nginx/access.log
\`\`\`

## Test

\`\`\`bash
curl -I https://api.example.com
\`\`\`
    `,
  },
];
