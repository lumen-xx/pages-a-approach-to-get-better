import { ContentLayout } from "@/components/content-layout";
import { Section, DownloadButton } from "@/components/md-components";
import * as PhosphorIcons from "@phosphor-icons/react";

export default function ScaleImageByMultiplyPage() {
  return (
    <ContentLayout
      title="Scale Image by Multiply"
      description="Scale an image by a multiply factor"
      icon={<PhosphorIcons.Image className="w-14 h-14" />}
      category="other"
      difficulty="beginner"
      backUrl="/automations"
      backLabel="Back to Automations"
      dependencies={[
        { name: "cwebp", install: "brew install webp" },
        { name: "Homebrew", url: "/automations/brew-install" },
        { name: "Python 3", install: "brew install python3" },
      ]}
    >
      <Section title="Scale Image by Multiply">
        <p>
          This will scale an image by a multiply factor. This is for quick and
          dirty resizing of images.
        </p>

        <ol className="list-decimal ml-6 space-y-4">
          <li>Open Automator and create a new quick action.</li>
          <li>
            Select Workflow receives current: <strong>Image</strong> in{" "}
            <strong>Finder</strong>.
          </li>
          <li>Add a "Run Shell Script" action.</li>
          <li>
            In the shell script, add the following command:
            <div className="my-4">
              <DownloadButton
                text="Download Script"
                url="/configs/scale-image-by-multiply.txt"
              />
            </div>
          </li>
          <li>Click "Create" to save the action.</li>
          <li>Open Terminal and install cwebp with Homebrew.</li>
        </ol>
      </Section>

      <Section title="Usage">
        <p>
          Right-click any image in Finder → <strong>Quick Actions</strong> →{" "}
          <strong>Scale Image by Multiply</strong>
        </p>
        <p>
          Now in the input field you either multiply by a number bigger than 1
          to make it bigger or for most use cases you will want to multiply by a
          number less than 1 to make it smaller.
        </p>
      </Section>
    </ContentLayout>
  );
}
