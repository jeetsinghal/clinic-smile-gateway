import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Phone } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-primary section-padding-sm">
        <div className="container max-w-6xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready for a Healthier Smile?
            </h2>
            <p className="text-primary-foreground/75 text-lg max-w-xl mx-auto mb-8">
              Don't wait — book your consultation today and take the first step toward the smile you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 h-12 px-8 rounded-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90 active:scale-[0.97] transition-all font-semibold"
                >
                  <CalendarCheck className="w-5 h-5" />
                  Book Appointment
                </Button>
              </a>
              <a href="tel:+911234567890">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 h-12 px-8 rounded-lg bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/25 hover:bg-primary-foreground/25 active:scale-[0.97] transition-all font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
