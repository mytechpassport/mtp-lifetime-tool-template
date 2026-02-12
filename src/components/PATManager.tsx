import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Trash2,
  Calendar,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import vce from "@/lib/vce";
import { ErrorHandler } from "@/utils/errorHandler";

interface PersonalAccessToken {
  id: number;
  name: string;
  token?: string;
  last_four_chars?: string | null;
  expires_at: string | null;
  last_used_at: string | null;
  created_at: string;
}

export const PATManager = () => {
  const [tokens, setTokens] = useState<PersonalAccessToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleTokens, setVisibleTokens] = useState<Set<number>>(new Set());
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTokenName, setNewTokenName] = useState("");
  const [newTokenExpiry, setNewTokenExpiry] = useState("");
  const [createdToken, setCreatedToken] = useState<PersonalAccessToken | null>(
    null
  );

  // Load tokens on component mount
  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    try {
      setLoading(true);
      const response = await vce.listPATs();
      if (response.success) {
        setTokens(response.tokens);
      }
    } catch (error) {
      ErrorHandler.handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const createToken = async () => {
    if (!newTokenName.trim()) {
      toast.error("Please enter a token name");
      return;
    }

    try {
      const response = await vce.generatePAT({
        name: newTokenName.trim(),
        expires_at: newTokenExpiry || undefined,
      });

      if (response.success) {
        setCreatedToken(response.token);
        setNewTokenName("");
        setNewTokenExpiry("");
        setCreateDialogOpen(false);
        await loadTokens();
        toast.success("Personal Access Token created successfully");
      }
    } catch (error) {
      ErrorHandler.handleApiError(error);
    }
  };

  const regenerateToken = async (tokenId: number) => {
    try {
      const response = await vce.regeneratePAT(tokenId);
      if (response.success) {
        setCreatedToken(response.token);
        await loadTokens();
        toast.success("Token regenerated successfully");
      }
    } catch (error) {
      ErrorHandler.handleApiError(error);
    }
  };

  const revokeToken = async (tokenId: number) => {
    try {
      const response = await vce.revokePAT(tokenId);
      if (response.success) {
        await loadTokens();
        toast.success("Token revoked successfully");
      }
    } catch (error) {
      ErrorHandler.handleApiError(error);
    }
  };

  const toggleTokenVisibility = (tokenId: number) => {
    const newVisible = new Set(visibleTokens);
    if (newVisible.has(tokenId)) {
      newVisible.delete(tokenId);
    } else {
      newVisible.add(tokenId);
    }
    setVisibleTokens(newVisible);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString();
  };

  const isTokenExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const isTokenExpiringSoon = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    const expiryDate = new Date(expiresAt);
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    return expiryDate < sevenDaysFromNow && expiryDate > new Date();
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Personal Access Tokens</h3>
          <p className="text-sm text-muted-foreground">
            Manage your API access tokens for external integrations
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Token
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Personal Access Token</DialogTitle>
              <DialogDescription>
                Create a new token for API access. Keep it secure and don't
                share it.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="token-name">Token Name</Label>
                <Input
                  id="token-name"
                  placeholder="e.g., My Integration Token"
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="token-expiry">Expiry Date (Optional)</Label>
                <Input
                  id="token-expiry"
                  type="date"
                  value={newTokenExpiry}
                  onChange={(e) => setNewTokenExpiry(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={createToken}>Create Token</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Security Warning */}
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Security Best Practices
              </p>
              <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Keep your tokens secure and never share them publicly</li>
                <li>• Use tokens with appropriate expiration dates</li>
                <li>• Revoke tokens that are no longer needed</li>
                <li>
                  • Regenerate tokens if you suspect they've been compromised
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Created Dialog */}
      {createdToken && (
        <Dialog
          open={!!createdToken}
          onOpenChange={() => setCreatedToken(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Token Created Successfully</DialogTitle>
              <DialogDescription>
                Copy this token now. You won't be able to see it again.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Token Name</Label>
                <p className="text-sm font-mono bg-muted p-2 rounded">
                  {createdToken.name}
                </p>
              </div>
              <div>
                <Label>Token</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={createdToken.token || ""}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(createdToken.token || "")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setCreatedToken(null)}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Tokens List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Loading tokens...</p>
          </div>
        ) : tokens.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-semibold mb-2">No tokens yet</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first Personal Access Token to get started with API
                access.
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Token
              </Button>
            </CardContent>
          </Card>
        ) : (
          tokens.map((token) => (
            <Card key={token.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{token.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        Created {formatDate(token.created_at)}
                      </Badge>
                      {token.expires_at && (
                        <Badge
                          variant={
                            isTokenExpired(token.expires_at)
                              ? "destructive"
                              : isTokenExpiringSoon(token.expires_at)
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {isTokenExpired(token.expires_at) && (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          Expires {formatDate(token.expires_at)}
                        </Badge>
                      )}
                      {token.last_used_at && (
                        <Badge variant="outline" className="text-xs">
                          Last used {formatDate(token.last_used_at)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => regenerateToken(token.id)}
                      disabled={isTokenExpired(token.expires_at)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Revoke Token</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to revoke "{token.name}"? This
                            action cannot be undone and will immediately
                            invalidate the token.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => revokeToken(token.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Revoke Token
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Token ID</Label>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        pat_{token.id}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(`pat_${token.id}`)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {token.last_four_chars && (
                    <div>
                      <Label className="text-xs">Token Preview</Label>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          pat_•••••••{token.last_four_chars}
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
