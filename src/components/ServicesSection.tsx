import ScrollReveal from "./ScrollReveal";
import { Sparkles, ShieldCheck, Smile, Syringe, ScanEye, Heart, Baby, Wrench } from "lucide-react";

const services = [
  { icon: Wrench, title: "Root Canal Treatment", desc: "Pain-free RCT with advanced rotary instruments and single-sitting options." },
  { icon: Syringe, title: "Dental Implants", desc: "Permanent tooth replacement with titanium implants for a natural look and feel." },
  { icon: Sparkles, title: "Teeth Whitening", desc: "Professional in-office whitening for a brighter, more confident smile." },
  { icon: ShieldCheck, title: "Dental Crowns & Bridges", desc: "Custom-crafted ceramic restorations that blend seamlessly with your teeth." },
  { icon: Smile, title: "Orthodontics & Braces", desc: "Straighten your teeth with modern braces or clear aligner therapy." },
  { icon: ScanEye, title: "Digital X-Rays & Diagnostics", desc: "Low-radiation digital imaging for accurate diagnosis and treatment planning." },
  { icon: Baby, title: "Pediatric Dentistry", desc: "Gentle, child-friendly dental care in a comfortable environment." },
  { icon: Heart, title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile makeovers tailored to your unique needs." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-section-alt">
      <div className="container max-w-6xl mx-auto">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">Our Services</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Comprehensive Dental Care
          </h2>
          <p className="text-muted-foreground text-lg">
            From preventive care to advanced restorative treatments — everything under one roof.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 80}>
              <div className="group bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-border/50 h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
