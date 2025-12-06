import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import { CopyIcon } from "lucide-react";
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
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button
            onClick={() => navigator.clipboard.writeText(url)}
            variant="ghost"
            size="icon"
          >
            <CopyIcon className="w-4 h-4" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
