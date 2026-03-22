import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarCheck, Clock, LogOut, Send } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import ScrollReveal from "@/components/ScrollReveal";

type Appointment = Tables<"appointments">;

const services = [
  "General Check-up", "Root Canal Treatment", "Dental Implants",
  "Teeth Whitening", "Orthodontics", "Dental Crowns",
  "Cosmetic Dentistry", "Pediatric Dentistry",
];

const UserDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login?role=user");
  }, [user, authLoading, navigate]);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setAppointments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("appointments").insert({
      patient_name: form.name.trim(),
      phone: form.phone.trim(),
      service: form.service || null,
      preferred_date: form.date || null,
      user_id: user!.id,
    });
    if (error) {
      toast.error("Failed to submit appointment");
    } else {
      toast.success("Appointment submitted! We'll contact you shortly.");
      setForm({ name: "", phone: "", service: "", date: "" });
      fetchAppointments();
    }
    setSubmitting(false);
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container max-w-5xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
            </Link>
            <h1 className="text-lg font-bold text-foreground">My Appointments</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </Button>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Book new appointment */}
        <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Book New Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  required maxLength={100} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone *</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  required maxLength={15} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Service</label>
                <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none">
                  <option value="">Select a service</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Preferred Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow" />
              </div>
            </div>
            <Button variant="hero" size="lg" className="w-full h-12 rounded-lg gap-2" disabled={submitting}>
              {submitting ? <span className="animate-pulse">Submitting...</span> : <><Send className="w-4 h-4" /> Book Appointment</>}
            </Button>
          </form>
        </div>

        {/* Appointment history */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Your Appointments</h2>
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border/50">
              <CalendarCheck className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No appointments yet. Book your first one above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appt) => (
                <div key={appt.id} className="bg-card rounded-xl border border-border/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between shadow-sm">
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground">{appt.service || "General Appointment"}</div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {appt.preferred_date && (
                        <span className="flex items-center gap-1">
                          <CalendarCheck className="w-3.5 h-3.5" />
                          {new Date(appt.preferred_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(appt.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[appt.status] || ""}`}>
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
