import { useState } from "react";
import { Menu, X, Phone, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50 transition-all duration-300">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display text-lg font-bold">W</span>
          </div>
          <span className="font-display text-lg font-bold text-foreground tracking-tight">
            Dr. Wasi <span className="text-primary">Dental</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+911234567890">
            <Button variant="hero-outline" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
          </a>
          {user ? (
            <Link to={isAdmin ? "/admin" : "/dashboard"}>
              <Button variant="hero" size="sm">
                {isAdmin ? "Admin Panel" : "My Dashboard"}
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="hero" size="sm" className="gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors active:scale-95"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <div className="container px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2 border-t border-border mt-2">
              <a href="tel:+911234567890" className="flex-1">
                <Button variant="hero-outline" size="sm" className="w-full gap-2">
                  <Phone className="w-4 h-4" /> Call
                </Button>
              </a>
              {user ? (
                <Link to={isAdmin ? "/admin" : "/dashboard"} className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="hero" size="sm" className="w-full">
                    {isAdmin ? "Admin" : "Dashboard"}
                  </Button>
                </Link>
              ) : (
                <Link to="/login" className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="hero" size="sm" className="w-full gap-2">
                    <LogIn className="w-4 h-4" /> Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
