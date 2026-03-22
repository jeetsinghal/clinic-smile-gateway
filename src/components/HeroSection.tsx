import { Button } from "@/components/ui/button";
import { Phone, CalendarCheck, Star } from "lucide-react";
import heroBg from "@/assets/hero-dental.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Modern dental clinic interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-20 sm:py-28">
        <div className="max-w-xl animate-reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 mb-6">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-primary-foreground/90">Trusted by 5,000+ patients</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] tracking-tight mb-5">
            Your Smile,{" "}
            <span className="text-primary" style={{ WebkitTextStroke: "0" }}>
              Our Priority
            </span>
          </h1>

          <p className="text-lg text-primary-foreground/75 max-w-md mb-8 leading-relaxed">
            Advanced dental care with a gentle touch. From routine check-ups to cosmetic transformations — experience dentistry reimagined.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#contact">
              <Button variant="hero" size="lg" className="w-full sm:w-auto gap-2 h-12 px-8 rounded-lg">
                <CalendarCheck className="w-5 h-5" />
                Book Appointment
              </Button>
            </a>
            <a href="tel:+911234567890">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 h-12 px-8 rounded-lg bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/25 active:scale-[0.97] transition-all duration-200 font-semibold"
              >
                <Phone className="w-5 h-5" />
                +91 123 456 7890
              </Button>
            </a>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-primary-foreground/15">
            {[
              { num: "15+", label: "Years Experience" },
              { num: "5K+", label: "Happy Patients" },
              { num: "12+", label: "Dental Services" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-primary-foreground">{stat.num}</div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
