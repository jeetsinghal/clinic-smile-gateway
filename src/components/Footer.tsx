import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/70 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display text-sm font-bold">W</span>
              </div>
              <span className="font-display text-base font-bold text-primary-foreground">
                Dr. Wasi Dental
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Providing exceptional dental care with modern technology and a compassionate approach since 2009.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Services", "Testimonials", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm hover:text-primary-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-4">Services</h4>
            <div className="space-y-2">
              {["Root Canal", "Dental Implants", "Teeth Whitening", "Orthodontics", "Cosmetic Dentistry"].map((s) => (
                <a key={s} href="#services" className="block text-sm hover:text-primary-foreground transition-colors">{s}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /> 123 Main Road, City Center</div>
              <div className="flex gap-2"><Phone className="w-4 h-4 shrink-0" /> +91 123 456 7890</div>
              <div className="flex gap-2"><Mail className="w-4 h-4 shrink-0" /> info@drwasidental.com</div>
              <div className="flex gap-2"><Clock className="w-4 h-4 shrink-0" /> Mon–Sat: 9AM – 8PM</div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Dr. Wasi Dental Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
