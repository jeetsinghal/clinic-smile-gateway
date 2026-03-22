import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import { CalendarCheck, MapPin, Phone, Clock, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const services = [
  "General Check-up",
  "Root Canal Treatment",
  "Dental Implants",
  "Teeth Whitening",
  "Orthodontics",
  "Dental Crowns",
  "Cosmetic Dentistry",
  "Pediatric Dentistry",
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    setLoading(true);

    const { error } = await supabase.from("appointments").insert({
      patient_name: form.name.trim(),
      phone: form.phone.trim(),
      service: form.service || null,
      preferred_date: form.date || null,
      user_id: user?.id || null,
    });

    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      toast.success("Appointment request submitted! We'll contact you shortly.");
      setForm({ name: "", phone: "", service: "", date: "" });
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="section-padding bg-section-alt">
      <div className="container max-w-6xl mx-auto">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">Contact Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-muted-foreground text-lg">
            Schedule a visit today — we'll get back to you within 24 hours.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 sm:p-8 shadow-sm border border-border/50">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    maxLength={15}
                    required
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Service</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </div>
              </div>
              <Button variant="hero" size="lg" className="w-full h-12 rounded-lg gap-2" disabled={loading}>
                {loading ? (
                  <span className="animate-pulse">Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Request Appointment
                  </>
                )}
              </Button>
            </form>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal className="lg:col-span-2" delay={150}>
            <div className="space-y-5">
              {[
                { icon: MapPin, title: "Clinic Address", lines: ["123 Main Road, City Center", "Near Central Mall, Pin — 400001"] },
                { icon: Phone, title: "Phone", lines: ["+91 123 456 7890", "+91 987 654 3210"] },
                { icon: Mail, title: "Email", lines: ["info@drwasidental.com"] },
                { icon: Clock, title: "Working Hours", lines: ["Mon–Sat: 9:00 AM – 8:00 PM", "Sunday: 10:00 AM – 2:00 PM"] },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 bg-card rounded-xl p-5 border border-border/50 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">{item.title}</div>
                    {item.lines.map((line) => (
                      <div key={line} className="text-sm text-muted-foreground">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div className="mt-5 rounded-xl overflow-hidden border border-border/50 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7!2d72.87!3d19.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzEyLjAiTiA3MsKwNTInMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr. Wasi Dental Clinic Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
