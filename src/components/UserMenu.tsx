
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const UserMenu = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center bg-primary/10 p-2 rounded-md">
        <User className="h-4 w-4 text-primary mr-2" />
        <span className="text-sm font-medium">{user?.username}</span>
      </div>
      <Button variant="outline" size="sm" onClick={logout} className="flex items-center">
        <LogOut className="h-4 w-4 mr-1" />
        Sair
      </Button>
    </div>
  );
};

export default UserMenu;
