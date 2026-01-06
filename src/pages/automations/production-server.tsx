import { ContentLayout } from "@/components/content-layout";
import { CodeBlock, Section, DownloadButton } from "@/components/md-components";

export default function ProductionServerPage() {
  return (
    <ContentLayout
      title="Production Server Setup"
      description="One config to set up a complete production server"
      icon="🖥️"
      category="terminal"
      difficulty="intermediate"
      backUrl="/automations"
      backLabel="Back to Automations"
    >
      <Section title="What It Does">
        <ul className="list-disc ml-6 space-y-1">
          <li>
            User{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
              deploy
            </code>{" "}
            with SSH key (no root, no password)
          </li>
          <li>Nginx (rate limited, gzip, hardened)</li>
          <li>Certbot for SSL</li>
          <li>fail2ban (brute-force protection)</li>
          <li>UFW firewall (SSH, HTTP, HTTPS only)</li>
          <li>Auto security updates</li>
          <li>2GB swap file</li>
        </ul>
      </Section>

      <Section title="File Tree">
        <CodeBlock
          code={`/etc/
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
/swapfile                       # 2GB swap`}
          language="text"
        />
      </Section>

      <Section title="Step 1: Get Your SSH Key">
        <CodeBlock code="cat ~/.ssh/id_ed25519.pub" language="bash" />
      </Section>

      <Section title="Step 2: Use This Config">
        <div className="my-4">
          <DownloadButton
            text="cloud-init.yaml"
            url="/configs/cloud-init.yaml"
          />
        </div>
        <p>
          Replace{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            YOUR_PUBLIC_KEY_HERE
          </code>{" "}
          with your SSH key, then paste into "Cloud config" when creating
          server.
        </p>
      </Section>

      <Section title="Step 3: Wait & Connect">
        <p>Wait 2-3 minutes, then:</p>
        <CodeBlock code="ssh deploy@your-server-ip" language="bash" />
      </Section>

      <Section title="Add Your Site">
        <CodeBlock
          code="sudo micro /etc/nginx/sites-available/api.example.com"
          language="bash"
        />

        <CodeBlock
          code={`server {
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
}`}
          language="nginx"
        />

        <CodeBlock
          code="sudo ln -s /etc/nginx/sites-available/api.example.com /etc/nginx/sites-enabled/"
          language="bash"
        />
        <CodeBlock
          code="sudo nginx -t && sudo systemctl reload nginx"
          language="bash"
        />
      </Section>

      <Section title="Add SSL">
        <CodeBlock
          code="sudo certbot --nginx -d api.example.com"
          language="bash"
        />
      </Section>

      <Section title="SSH Config (optional)">
        <CodeBlock code="micro ~/.ssh/config" language="bash" />

        <CodeBlock
          code={`Host myserver
    HostName your-server-ip
    User deploy`}
          language="text"
        />

        <CodeBlock code="ssh myserver" language="bash" />
      </Section>
    </ContentLayout>
  );
}
