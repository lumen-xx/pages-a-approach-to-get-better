import { ContentLayout } from "@/components/content-layout";
import { CodeBlock, Section } from "@/components/md-components";

export default function BrewInstallPage() {
  return (
    <ContentLayout
      title="Brew Install"
      description="How to install Homebrew"
      icon="🥟"
      category="terminal"
      difficulty="beginner"
      backUrl="/automations"
      backLabel="Back to Automations"
    >
      <Section title="Simple Install">
        <p>
          This will install Homebrew and add it to your PATH. After installing,
          run{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            source ~/.bash_profile
          </code>{" "}
          (or{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            source ~/.zprofile
          </code>
          ,{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
            source ~/.bashrc
          </code>
          , etc. depending on your shell) if brew isn't found, to ensure your
          PATH is updated.
        </p>

        <CodeBlock
          code='/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
          language="bash"
        />

        <CodeBlock code="source ~/.bashrc" language="bash" />
      </Section>
    </ContentLayout>
  );
}
