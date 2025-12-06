import type { MacOSApp } from "../types/macos-app-types";

// Import images
import raycastImg from "../images/raycast.svg";
import ghostyImg from "../images/ghosty.svg";
import shottrImg from "../images/shottr.svg";
import mullvadImg from "../images/ mullvade_vpn.svg";
import purepasteImg from "../images/purepaste.webp";
import noTunesImg from "../images/notunes.webp";

export const macosApps: MacOSApp[] = [
  {
    name: "Raycast",
    description: "Blazingly fast, totally extendable launcher",
    image: raycastImg,
    url: "https://raycast.com",
    category: "productivity",
    price: "freemium",
    loginItem: true,
  },
  {
    name: "Ghostty",
    description: "A minimal, fast, and secure browser",
    image: ghostyImg,
    url: "https://ghostty.org",
    category: "productivity",
    price: "free",
  },
  {
    name: "Shottr",
    description: "A minimal, fast, and secure screen recorder",
    image: shottrImg,
    url: "https://shottr.cc",
    category: "utility",
    price: "freemium",
    loginItem: true,
  },
  {
    name: "Mullvad",
    description:
      "A minimal, fast, cost effective and actually secure VPN. Up to 5 Devices or users. The Price is fixed at 5$.",
    image: mullvadImg,
    url: "https://mullvad.net",
    category: "security",
    price: "paid",
    loginItem: true,
  },
  {
    name: "Purepaste",
    description:
      "Pure Paste lets you paste as plain text by default. It sits in the menu bar and clears formatting (fonts, colors, bold, links, tables, etc.) from the text you copy.",
    image: purepasteImg,
    url: "https://sindresorhus.com/pure-paste",
    category: "utility",
    price: "freemium",
    loginItem: true,
  },
  {
    name: "noTunes",
    description:
      "noTunes is a macOS application that will prevent iTunes or Apple Music from launching.",
    image: noTunesImg,
    url: "https://no-tunes.com",
    category: "utility",
    price: "free",
    loginItem: true,
  },
];
