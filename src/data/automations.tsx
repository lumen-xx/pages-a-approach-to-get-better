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

\`\`\`curl
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
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
    content: `
## Create The Automation

1. Open Automator and create a new quick action.
2. Select Workflow receives current: Image in Finder.
3. Add a "Run Shell Script" action.
4. In the shell script, add the following command:
\`\`\`
# Change this if Homebrew is in a different path
CWEBP_BIN="/opt/homebrew/bin/cwebp"

# Fallback if on Intel mac
if [ ! -x "$CWEBP_BIN" ]; then
  CWEBP_BIN="/usr/local/bin/cwebp"
fi

for f in "$@"; do
  # Get directory, filename without extension, extension
  dir="$(dirname "$f")"
  base="$(basename "$f")"
  name="\${base%.*}"

  # Output path
  out="$dir/$name.webp"

  # Convert with quality 80 (tweak if you want)
  "$CWEBP_BIN" -q 80 "$f" -o "$out"
done
\`\`\`

### Install cwebp
5. Click "Create" to save the action.
6. Open Terminal and install cwebp with [Homebrew](/automations/brew-install)
    \`\`\`
    brew install webp
    \`\`\`
    `,
  },
];
