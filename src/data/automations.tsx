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
];
