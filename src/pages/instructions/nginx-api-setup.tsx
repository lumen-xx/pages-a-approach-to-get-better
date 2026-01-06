import { ContentLayout } from "@/components/content-layout";
import { CodeBlock, Section, Subsection } from "@/components/md-components";

export default function NginxApiSetupPage() {
  return (
    <ContentLayout
      title="Nginx API Proxy Setup"
      description="Set up Nginx as a reverse proxy for your API on Linux"
      icon="🔧"
      category="setup"
      difficulty="intermediate"
      backUrl="/instructions"
      backLabel="Back to Instructions"
      dependencies={[
        { name: "Nginx", install: "apt install nginx" },
        {
          name: "Certbot",
          install: "apt install certbot python3-certbot-nginx",
        },
        { name: "Micro", url: "/instructions/micro-editor" },
      ]}
    >
      <Section title="Install Nginx">
        <CodeBlock code="sudo apt update" language="bash" />
        <CodeBlock code="sudo apt install nginx -y" language="bash" />
        <CodeBlock code="sudo systemctl start nginx" language="bash" />
        <CodeBlock code="sudo systemctl enable nginx" language="bash" />
      </Section>

      <Section title="Open Firewall">
        <CodeBlock code="sudo ufw allow 'Nginx Full'" language="bash" />
        <CodeBlock code="sudo ufw enable" language="bash" />
      </Section>

      <Section title="Create Config">
        <CodeBlock
          code="sudo rm /etc/nginx/sites-enabled/default"
          language="bash"
        />
        <CodeBlock
          code="sudo micro /etc/nginx/sites-available/api.example.com"
          language="bash"
        />

        <p>
          Paste this (change{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            api.example.com
          </code>{" "}
          and port{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            3000
          </code>
          ):
        </p>

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

        <p>
          Save with{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            Ctrl+S
          </code>{" "}
          and quit with{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            Ctrl+Q
          </code>
        </p>
      </Section>

      <Section title="Enable Site">
        <CodeBlock
          code="sudo ln -s /etc/nginx/sites-available/api.example.com /etc/nginx/sites-enabled/"
          language="bash"
        />
        <CodeBlock code="sudo nginx -t" language="bash" />
        <CodeBlock code="sudo systemctl reload nginx" language="bash" />
      </Section>

      <Section title="Add SSL">
        <CodeBlock
          code="sudo apt install certbot python3-certbot-nginx -y"
          language="bash"
        />
        <CodeBlock
          code="sudo certbot --nginx -d api.example.com"
          language="bash"
        />

        <p>Test auto-renewal:</p>
        <CodeBlock code="sudo certbot renew --dry-run" language="bash" />
      </Section>

      <Section title="Add Security Headers">
        <p>Edit your config:</p>
        <CodeBlock
          code="sudo micro /etc/nginx/sites-available/api.example.com"
          language="bash"
        />

        <p>
          Add these lines inside the{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            server
          </code>{" "}
          block:
        </p>

        <CodeBlock
          code={`add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Strict-Transport-Security "max-age=31536000" always;`}
          language="nginx"
        />

        <p>Reload:</p>
        <CodeBlock code="sudo systemctl reload nginx" language="bash" />
      </Section>

      <Section title="View Logs">
        <Subsection title="Error log">
          <CodeBlock
            code="sudo tail -f /var/log/nginx/error.log"
            language="bash"
          />
        </Subsection>
        <Subsection title="Access log">
          <CodeBlock
            code="sudo tail -f /var/log/nginx/access.log"
            language="bash"
          />
        </Subsection>
      </Section>

      <Section title="Test">
        <CodeBlock code="curl -I https://api.example.com" language="bash" />
      </Section>
    </ContentLayout>
  );
}
