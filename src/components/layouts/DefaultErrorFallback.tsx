import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Default fallback component for errors
 */
export const DefaultErrorFallback: React.FC<{
  error: Error;
  retry: () => void;
}> = ({ error, retry }) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-xl">Something went wrong</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-muted p-3">
          <p className="text-sm text-muted-foreground font-mono">
            {error.message}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={retry} className="w-full cursor-pointer">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="w-full cursor-pointer"
          >
            Reload Page
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          If this problem persists, please refresh the page or contact your
          developer.
        </p>
      </CardContent>
    </Card>
  </div>
);
