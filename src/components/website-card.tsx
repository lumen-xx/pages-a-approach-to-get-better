import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import { CopyIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";

export function WebsiteCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <a className="flex items-center gap-2">
          {url}
          <Button variant="ghost" size="icon">
            <CopyIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ExternalLinkIcon className="w-4 h-4" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
