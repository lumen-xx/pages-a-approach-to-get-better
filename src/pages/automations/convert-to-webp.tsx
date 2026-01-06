import { ContentLayout } from "@/components/content-layout";
import { CodeBlock, Section, Subsection } from "@/components/md-components";
import * as PhosphorIcons from "@phosphor-icons/react";

export default function ConvertToWebpPage() {
  return (
    <ContentLayout
      title="Convert to WebP in Finder"
      description="How to convert an image to WebP"
      icon={<PhosphorIcons.Image className="w-14 h-14" />}
      category="other"
      difficulty="beginner"
      backUrl="/automations"
      backLabel="Back to Automations"
      dependencies={[
        { name: "cwebp", install: "brew install cwebp" },
        { name: "Homebrew", url: "/automations/brew-install" },
      ]}
    >
      <Section title="Create The Automation">
        <ol className="list-decimal ml-6 space-y-4">
          <li>Open Automator and create a new quick action.</li>
          <li>
            Select Workflow receives current: <strong>Image</strong> in{" "}
            <strong>Finder</strong>.
          </li>
          <li>Add a "Run Shell Script" action.</li>
          <li>
            In the shell script, add the following command:
            <CodeBlock
              code={`# Change this if Homebrew is in a different path
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
done`}
              language="bash"
            />
          </li>
        </ol>
      </Section>

      <Section title="Install cwebp">
        <p>Click "Create" to save the action.</p>
        <p>Open Terminal and install cwebp with Homebrew:</p>
        <CodeBlock code="brew install cwebp" language="bash" />
      </Section>

      <Section title="Usage">
        <p>
          Right-click any image in Finder → <strong>Quick Actions</strong> →{" "}
          <strong>Convert to WebP</strong>
        </p>
      </Section>
    </ContentLayout>
  );
}
