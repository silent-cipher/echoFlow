import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export function LoadingTweetsAgents({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <div className="flex flex-row gap-4">
          <CardTitle>
            <Avatar>
              <AvatarImage src="/logo.png" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
          </CardTitle>
          <Skeleton className="h-4 w-[200px]" />
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Skeleton className="h-[88px] w-[320px] rounded-xl" />
      </CardContent>
    </Card>
  );
}
