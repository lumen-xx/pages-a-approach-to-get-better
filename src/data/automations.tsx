import type { Automation } from "../types/automation-types";
import * as PhosphorIcons from "@phosphor-icons/react";
export const automations: Automation[] = [
  {
    slug: "brew-install",
    title: "Brew Install",
    description: "How to install Homebrew",
    icon: "🥟",
    category: "terminal",
    difficulty: "beginner",
    content: `
## Simple Install

This will install Homebrew and add it to your PATH.  
After installing, run \`source ~/.bash_profile\` (or \`source ~/.zprofile\`, \`source ~/.bashrc\`, etc. depending on your shell) if brew isn't found, to ensure your PATH is updated.

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
\`\`\`

\`\`\`bash
source ~/.bashrc
\`\`\`
    `,
  },
  {
    slug: "convert-to-webp",
    title: "Convert to WebP in Finder",
    description: "How to convert an image to WebP",
    icon: <PhosphorIcons.Image className="w-9 h-9" />,
    category: "other",
    difficulty: "beginner",
    dependencies: [
      { name: "cwebp", install: "brew install cwebp" },
      { name: "Homebrew", url: "/automations/brew-install" },
    ],
    content: `
## Create The Automation

1. Open Automator and create a new quick action.
2. Select Workflow receives current: Image in Finder.
3. Add a "Run Shell Script" action.
4. In the shell script, add the following command:

\`\`\`bash
# Change this if Homebrew is in a different path
CWEBP_BIN="/opt/homebrew/bin/cwebp"

# Fallback if on Intel mac
if [ ! -x "$CWEBP_BIN" ]; then
  CWEBP_BIN="/usr/local/bin/cwebp"
fi

for f in "$@"; do
  dir="$(dirname "$f")"
  base="$(basename "$f")"
  name="\${base%.*}"
  out="$dir/$name.webp"
  "$CWEBP_BIN" -q 80 "$f" -o "$out"
done
\`\`\`

### Install cwebp

5. Click "Create" to save the action.
6. Open Terminal and install cwebp with [Homebrew](/automations/brew-install):

\`\`\`bash
brew install cwebp
\`\`\`

### Usage

Right-click any image in Finder → **Quick Actions** → **Convert to WebP**
    `,
  },
  {
    slug: "scale-image-by-multiply",
    title: "Scale Image by Multiply",
    description: "Scale an image by a multiply factor",
    icon: <PhosphorIcons.Image className="w-9 h-9" />,
    category: "other",
    difficulty: "beginner",
    dependencies: [
      { name: "cwebp", install: "brew install webp" },
      { name: "Homebrew", url: "/automations/brew-install" },
      { name: "Python 3", install: "brew install python3" },
    ],
    content: `
## Scale Image by Multiply

    This will scale an image by a multiply factor. This is for quick and dirty resizing of images.

1. Open Automator and create a new quick action. 
2. Select Workflow receives current: Image in Finder.
3. Add a "Run Shell Script" action.
4. In the shell script, add the following command:

    {{download:Download Script|/configs/scale-image-by-multiply.txt}}

5. Click "Create" to save the action.
6. Open Terminal and install cwebp with [Homebrew](/automations/brew-install)

### Usage
Right-click any image in Finder → **Quick Actions** → **Scale Image by Multiply**

Now in the input field you either multiply my a number bigger than 1 to make it bigger or for most use cases you will want to multiply by a number less than 1 to make it smaller.
    `,
  },
  {
    slug: "bulk-package-install",
    title: "Bulk Package Install",
    description: "One file to install all your packages",
    icon: "📦",
    category: "terminal",
    difficulty: "beginner",
    dependencies: [{ name: "Homebrew", url: "/automations/brew-install" }],
    content: `
## Step 1

Install [Homebrew](/automations/brew-install) first

## Step 2

Download the packages file:

{{download:packages.txt|/configs/packages.txt}}

Or create it manually:

\`\`\`bash
micro packages.txt
\`\`\`

Paste this:

\`\`\`txt
git
bun
python
micro
htop
curl
jq
ffmpeg
imagemagick
webp
tree
ripgrep
tldr
\`\`\`

## Step 3

Run the install:

\`\`\`bash
xargs brew install < packages.txt
\`\`\`

## Backup Your Packages

Export your installed packages:

\`\`\`bash
brew leaves > packages.txt
\`\`\`
    `,
  },
  {
    slug: "ssh-port-forward",
    title: "SSH Port Forwarding",
    description: "Access your server's localhost in your Mac browser",
    icon: "🔗",
    category: "terminal",
    difficulty: "beginner",
    content: `
## What It Does

Your server runs something on \`localhost:3000\`

You want to open it in your Mac browser

SSH forwards the port to your Mac

## Forward a Port

\`\`\`bash
ssh -L 3000:localhost:3000 user@your-server-ip
\`\`\`

Now open in your browser:

\`\`\`
http://localhost:3000
\`\`\`

## Different Ports

Forward server port 8080 to your Mac port 3000:

\`\`\`bash
ssh -L 3000:localhost:8080 user@your-server-ip
\`\`\`

## Run in Background

Add \`-f -N\` to run without a terminal:

\`\`\`bash
ssh -f -N -L 3000:localhost:3000 user@your-server-ip
\`\`\`

## Stop Background Tunnel

Find and kill it:

\`\`\`bash
lsof -i :3000
\`\`\`

\`\`\`bash
kill <PID>
\`\`\`

## Multiple Ports

Forward multiple ports at once:

\`\`\`bash
ssh -L 3000:localhost:3000 -L 5432:localhost:5432 user@your-server-ip
\`\`\`
    `,
  },
  {
    slug: "production-server",
    title: "Production Server Setup",
    description: "One config to set up a complete production server",
    icon: "🖥️",
    category: "terminal",
    difficulty: "intermediate",
    content: `
## What It Does

- User \`deploy\` with SSH key (no root, no password)
- Nginx (rate limited, gzip, hardened)
- Certbot for SSL
- fail2ban (brute-force protection)
- UFW firewall (SSH, HTTP, HTTPS only)
- Auto security updates
- 2GB swap file

## File Tree

\`\`\`
/etc/
├── nginx/
│   ├── nginx.conf              # Main config (rate limit, gzip)
│   ├── sites-available/        # Your site configs go here
│   └── sites-enabled/          # Symlinks to active sites
├── ssh/
│   └── sshd_config.d/
│       └── hardening.conf      # SSH hardening
├── fail2ban/
│   └── jail.local              # Brute-force protection
└── apt/
    └── apt.conf.d/
        └── 20auto-upgrades     # Auto security updates

/var/log/
├── nginx/
│   ├── access.log
│   └── error.log
└── fail2ban.log

/home/deploy/                   # Your user home
/swapfile                       # 2GB swap
\`\`\`

## Step 1: Get Your SSH Key

\`\`\`bash
cat ~/.ssh/id_ed25519.pub
\`\`\`

## Step 2: Use This Config

{{download:cloud-init.yaml|/configs/cloud-init.yaml}}

Replace \`YOUR_PUBLIC_KEY_HERE\` with your SSH key, then paste into "Cloud config" when creating server.

## Step 3: Wait & Connect

Wait 2-3 minutes, then:

\`\`\`bash
ssh deploy@your-server-ip
\`\`\`

## Add Your Site

\`\`\`bash
sudo micro /etc/nginx/sites-available/api.example.com
\`\`\`

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

\`\`\`bash
sudo ln -s /etc/nginx/sites-available/api.example.com /etc/nginx/sites-enabled/
\`\`\`

\`\`\`bash
sudo nginx -t && sudo systemctl reload nginx
\`\`\`

## Add SSL

\`\`\`bash
sudo certbot --nginx -d api.example.com
\`\`\`

## SSH Config (optional)

\`\`\`bash
micro ~/.ssh/config
\`\`\`

\`\`\`
Host myserver
    HostName your-server-ip
    User deploy
\`\`\`

\`\`\`bash
ssh myserver
\`\`\`
    `,
  },
];
