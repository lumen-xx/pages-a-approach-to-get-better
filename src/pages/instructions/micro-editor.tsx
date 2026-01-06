import { ContentLayout } from "@/components/content-layout";
import { CodeBlock, Section, Subsection } from "@/components/md-components";

export default function MicroEditorPage() {
  return (
    <ContentLayout
      title="Micro Terminal Editor"
      description="Install and use Micro - a modern terminal text editor"
      icon="📝"
      category="setup"
      difficulty="beginner"
      backUrl="/instructions"
      backLabel="Back to Instructions"
      dependencies={[{ name: "Micro", install: "apt install micro" }]}
    >
      <Section title="Install Micro">
        <CodeBlock code="sudo apt update" language="bash" />
        <CodeBlock code="sudo apt install micro -y" language="bash" />

        <p>Or install the latest version:</p>

        <CodeBlock code="curl https://getmic.ro | bash" language="bash" />
        <CodeBlock code="sudo mv micro /usr/local/bin/" language="bash" />
      </Section>

      <Section title="Basic Usage">
        <p>Open a file:</p>
        <CodeBlock code="micro filename.txt" language="bash" />

        <p>Open with sudo:</p>
        <CodeBlock code="sudo micro /etc/nginx/nginx.conf" language="bash" />
      </Section>

      <Section title="Keyboard Shortcuts">
        <Subsection title="File">
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
                Ctrl+S
              </code>{" "}
              Save
            </li>
            <li>
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
                Ctrl+Q
              </code>{" "}
              Quit
            </li>
            <li>
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
                Ctrl+O
              </code>{" "}
              Open file
            </li>
          </ul>
        </Subsection>

        <Subsection title="Edit">
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
                Ctrl+Z
              </code>{" "}
              Undo
            </li>
            <li>
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
                Ctrl+Y
              </code>{" "}
              Redo
            </li>
            <li>
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
                Ctrl+K
              </code>{" "}
              Cut line
            </li>
            <li>
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
                Ctrl+C
              </code>{" "}
              Copy
            </li>
            <li>
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
                Ctrl+V
              </code>{" "}
              Paste
            </li>
            <li>
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-pink-500">
                Ctrl+D
              </code>{" "}
              Duplicate line
            </li>
          </ul>
        </Subsection>
      </Section>

      <Section title="Settings">
        <p>Open settings:</p>
        <CodeBlock code="micro ~/.config/micro/settings.json" language="bash" />

        <Subsection title="Recommended settings">
          <CodeBlock
            code={`{
    "colorscheme": "gruvbox",
    "tabsize": 2,
    "tabstospaces": true,
    "autoindent": true,
    "savecursor": true,
    "scrollbar": true
}`}
            language="json"
          />
        </Subsection>
      </Section>
    </ContentLayout>
  );
}
