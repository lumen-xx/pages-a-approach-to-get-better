import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";
import type { Website } from "@/types/website-types";
import { Highlight } from "./highlight";

export function WebsiteCard({
  website,
  searchQuery = "",
}: {
  website: Website;
  searchQuery?: string;
}) {
  const { type, title, description, url, tags, tagIcon } = website;
  const [showCheck, setShowCheck] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setShowCheck(true);
    setTimeout(() => setShowCheck(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Highlight text={title} query={searchQuery} />
          <span className="mr-3" />
          <p className="text-xs rounded-xl px-2 py-1 bg-muted text-muted-foreground">
            {type}
          </p>
        </CardTitle>
        <CardDescription>
          <Highlight text={description} query={searchQuery} />
        </CardDescription>
      </CardHeader>
      <div className="flex flex-wrap gap-2 text-xs px-6">
        {tags.map((tag, index) => (
          <div
            key={tag}
            className="flex w-fit p-2 items-center justify-center rounded-md gap-2 bg-muted text-muted-foreground mb-1"
          >
            {tagIcon[index]}
            <Highlight text={tag} query={searchQuery} />
          </div>
        ))}
      </div>
      <Separator />
      <CardContent>
        <div className="flex items-center gap-2">
          <p className="flex w-full items-center gap-2 bg-muted p-2 rounded-md hover:bg-muted/70 transition-all duration-150">
            {url}
          </p>
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="icon"
            className="cursor-pointer"
          >
            {showCheck ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
