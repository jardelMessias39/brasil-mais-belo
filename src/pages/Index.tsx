import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatesSection from "@/components/StatesSection";
import RegionsSection from "@/components/RegionsSection";
import AccessibilitySection from "@/components/AccessibilitySection";
import HotelsSection from "@/components/HotelsSection";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen">
      {/* Header with Auth */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            Brasil Mais Belo
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white/90 hidden sm:inline">
                  <User className="h-4 w-4 inline mr-1" />
                  {user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/auth")}
                className="text-white border-white/20 hover:bg-white/10"
              >
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            )}
          </div>
        </div>
      </header>

      <HeroSection />
      <StatesSection />
      <RegionsSection />
      <HotelsSection />
      <AccessibilitySection />
    </div>
  );
};

export default Index;
