import { ContentLayout } from "@/components/content-layout";
import { CodeBlock, Section } from "@/components/md-components";

export default function SshPortForwardPage() {
  return (
    <ContentLayout
      title="SSH Port Forwarding"
      description="Access your server's localhost in your Mac browser"
      icon="🔗"
      category="terminal"
      difficulty="beginner"
      backUrl="/automations"
      backLabel="Back to Automations"
    >
      <Section title="What It Does">
        <p>
          Your server runs something on{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            localhost:3000
          </code>
        </p>
        <p>You want to open it in your Mac browser</p>
        <p>SSH forwards the port to your Mac</p>
      </Section>

      <Section title="Forward a Port">
        <CodeBlock
          code="ssh -L 3000:localhost:3000 user@your-server-ip"
          language="bash"
        />

        <p>Now open in your browser:</p>
        <CodeBlock code="http://localhost:3000" language="text" />
      </Section>

      <Section title="Different Ports">
        <p>Forward server port 8080 to your Mac port 3000:</p>
        <CodeBlock
          code="ssh -L 3000:localhost:8080 user@your-server-ip"
          language="bash"
        />
      </Section>

      <Section title="Run in Background">
        <p>
          Add{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            -f -N
          </code>{" "}
          to run without a terminal:
        </p>
        <CodeBlock
          code="ssh -f -N -L 3000:localhost:3000 user@your-server-ip"
          language="bash"
        />
      </Section>

      <Section title="Stop Background Tunnel">
        <p>Find and kill it:</p>
        <CodeBlock code="lsof -i :3000" language="bash" />
        <CodeBlock code="kill <PID>" language="bash" />
      </Section>

      <Section title="Multiple Ports">
        <p>Forward multiple ports at once:</p>
        <CodeBlock
          code="ssh -L 3000:localhost:3000 -L 5432:localhost:5432 user@your-server-ip"
          language="bash"
        />
      </Section>
    </ContentLayout>
  );
}
