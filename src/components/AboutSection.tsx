import ScrollReveal from "./ScrollReveal";
import { Award, GraduationCap, Clock, CheckCircle2 } from "lucide-react";

const highlights = [
  { icon: GraduationCap, text: "BDS, MDS — Oral & Maxillofacial Surgery" },
  { icon: Award, text: "Member, Indian Dental Association" },
  { icon: Clock, text: "15+ years of clinical experience" },
  { icon: CheckCircle2, text: "Advanced training in implantology" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-xl">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
                      <span className="font-display text-5xl font-bold text-primary">DW</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">Dr. Wasi</h3>
                    <p className="text-muted-foreground mt-1">BDS, MDS</p>
                  </div>
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-6 bg-card rounded-xl shadow-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-trust-green/15 flex items-center justify-center">
                    <Award className="w-5 h-5 text-trust-green" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Certified</div>
                    <div className="text-xs text-muted-foreground">IDA Member</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text side */}
          <ScrollReveal delay={150}>
            <span className="text-sm font-semibold text-primary tracking-wider uppercase">About the Doctor</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-5 leading-tight">
              Dedicated to Your{" "}
              <span className="text-primary">Oral Health</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Dr. Wasi brings over 15 years of experience in comprehensive dental care. With a commitment to staying at the forefront of dental technology and techniques, every patient receives personalized treatment in a comfortable, modern environment.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our clinic is equipped with the latest digital diagnostics, sterilization protocols, and patient comfort amenities — because your health and peace of mind matter to us.
            </p>

            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
