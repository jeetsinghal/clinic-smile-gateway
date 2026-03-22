import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LogIn, UserPlus, ArrowLeft, Shield, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "user";
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(isAdmin ? "/admin" : "/dashboard");
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Logged in successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const isAdminLogin = role === "admin";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </Link>

        <div className="bg-card rounded-2xl border border-border/50 shadow-lg p-8">
          {/* Role indicator */}
          <div className="flex items-center justify-center mb-6">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isAdminLogin
                  ? "bg-accent/10 text-accent"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {isAdminLogin ? (
                <Shield className="w-7 h-7" />
              ) : (
                <User className="w-7 h-7" />
              )}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground text-center mb-1">
            {isAdminLogin ? "Admin Login" : isSignUp ? "Create Account" : "Patient Login"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            {isAdminLogin
              ? "Access the appointment management panel"
              : isSignUp
              ? "Sign up to book and track your appointments"
              : "Log in to view your appointments"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && !isAdminLogin && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  required
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                required
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full h-12 rounded-lg gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Please wait...</span>
              ) : isSignUp ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  {isAdminLogin ? "Login as Admin" : "Login"}
                </>
              )}
            </Button>
          </form>

          {!isAdminLogin && (
            <p className="text-sm text-muted-foreground text-center mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-medium hover:underline"
              >
                {isSignUp ? "Log in" : "Sign up"}
              </button>
            </p>
          )}
        </div>

        {/* Switch role */}
        <div className="text-center mt-6">
          <Link
            to={isAdminLogin ? "/login?role=user" : "/login?role=admin"}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isAdminLogin ? "← Login as Patient" : "Admin Login →"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
