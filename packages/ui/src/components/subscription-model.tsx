"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";

function formatSOL(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount);
}

interface SubscriptionModalProps {
  plan: {
    id: string;
    name: string;
    price: number;
    solPrice: number;
  };
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function SubscriptionModal({
  plan,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: SubscriptionModalProps) {
  const { publicKey, connected } = useWallet();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Subscription</DialogTitle>
          <DialogDescription>
            You are about to subscribe to the {plan.name} plan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{plan.name} Plan</span>
              <span className="font-medium">${plan.price}/month</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
              <span>Billed monthly</span>
              <span>{formatSOL(plan.solPrice)} SOL</span>
            </div>
          </div>

          {connected && publicKey ? (
            <div className="rounded-lg border p-4 bg-secondary/20">
              <div className="text-sm">
                <p className="font-medium">Connected Wallet</p>
                <p className="text-muted-foreground truncate">
                  {publicKey.toString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-destructive p-4">
              <p className="text-sm text-destructive">
                Please connect your wallet to continue.
              </p>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p>
              By confirming, you agree to our Terms of Service and authorize a
              payment of {formatSOL(plan.solPrice)} SOL from your wallet.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={!connected || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Confirm Payment`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
