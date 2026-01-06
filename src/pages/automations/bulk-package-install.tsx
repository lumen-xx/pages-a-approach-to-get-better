import { ContentLayout } from "@/components/content-layout";
import {
  CodeBlock,
  Section,
  DownloadButton,
  InternalLink,
} from "@/components/md-components";

export default function BulkPackageInstallPage() {
  return (
    <ContentLayout
      title="Bulk Package Install"
      description="One file to install all your packages"
      icon="📦"
      category="terminal"
      difficulty="beginner"
      backUrl="/automations"
      backLabel="Back to Automations"
      dependencies={[{ name: "Homebrew", url: "/automations/brew-install" }]}
    >
      <Section title="Step 1">
        <p>
          Install{" "}
          <InternalLink href="/automations/brew-install">Homebrew</InternalLink>{" "}
          first.
        </p>
      </Section>

      <Section title="Step 2">
        <p>Download the packages file:</p>
        <div className="my-4">
          <DownloadButton text="packages.txt" url="/configs/packages.txt" />
        </div>

        <p>Or create it manually:</p>
        <CodeBlock code="micro packages.txt" language="bash" />

        <p>Paste this:</p>
        <CodeBlock
          code={`git
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
tldr`}
          language="text"
        />
      </Section>

      <Section title="Step 3">
        <p>Run the install:</p>
        <CodeBlock code="xargs brew install < packages.txt" language="bash" />
      </Section>

      <Section title="Backup Your Packages">
        <p>Export your installed packages:</p>
        <CodeBlock code="brew leaves > packages.txt" language="bash" />
      </Section>
    </ContentLayout>
  );
}
