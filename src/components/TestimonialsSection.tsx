import ScrollReveal from "./ScrollReveal";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    initials: "PS",
    text: "Dr. Wasi and team made my root canal completely painless. I was so nervous, but they explained every step. Highly recommend!",
    service: "Root Canal Treatment",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    initials: "RM",
    text: "Got dental implants done here and the results are incredible. Looks and feels completely natural. The clinic is very clean and professional.",
    service: "Dental Implants",
    rating: 5,
  },
  {
    name: "Ananya Gupta",
    initials: "AG",
    text: "My kids love visiting Dr. Wasi! The staff is so patient and kind with children. Finally found a dentist my whole family trusts.",
    service: "Pediatric Dentistry",
    rating: 5,
  },
  {
    name: "Mohammed Iqbal",
    initials: "MI",
    text: "Teeth whitening results exceeded my expectations. The procedure was quick, and the staff made sure I was comfortable throughout.",
    service: "Teeth Whitening",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container max-w-6xl mx-auto">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from real patients who trusted us with their smiles.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-sm border border-border/50 h-full flex flex-col">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-foreground leading-relaxed flex-1 mb-6">"{t.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{t.initials}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.service}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
