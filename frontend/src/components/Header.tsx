import { Camera, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface HeaderProps {
  onSignInClick: () => void;
  user: any;
}

const Header = ({ onSignInClick, user }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Camera className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            LifeSnaps
          </h1>
        </div>
        
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search moments..." 
              className="pl-9 bg-background/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="default" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Share Moment
          </Button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">{user.displayName || user.email}</span>
              <button
                className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => signOut(auth)}
              >
                Logout
              </button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={onSignInClick}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;