import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, CalendarCheck, Clock, Phone, User, LogOut, MessageCircle, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Appointment = Tables<"appointments">;

const ADMIN_WHATSAPP = "911234567890"; // Change to actual admin number

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login?role=admin");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load appointments");
    } else {
      setAppointments(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) fetchAppointments();
  }, [user, isAdmin]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    }
  };

  const openWhatsApp = (appt: Appointment) => {
    const msg = encodeURIComponent(
      `New appointment!\n\nPatient: ${appt.patient_name}\nPhone: ${appt.phone}\nService: ${appt.service || "N/A"}\nDate: ${appt.preferred_date || "Not specified"}\nStatus: ${appt.status}`
    );
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${msg}`, "_blank");
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  if (authLoading || (!user && !authLoading)) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                {appointments.length} appointments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchAppointments} className="gap-2">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-20">
            <CalendarCheck className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No appointments yet</h2>
            <p className="text-muted-foreground text-sm">
              Appointments from patients will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Patient</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {appt.patient_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <a href={`tel:${appt.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                        <Phone className="w-3.5 h-3.5" />
                        {appt.phone}
                      </a>
                    </TableCell>
                    <TableCell>{appt.service || "—"}</TableCell>
                    <TableCell>
                      {appt.preferred_date ? (
                        <div className="flex items-center gap-2">
                          <CalendarCheck className="w-3.5 h-3.5 text-muted-foreground" />
                          {new Date(appt.preferred_date).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(appt.created_at).toLocaleString("en-IN", {
                          day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[appt.status] || ""}`}>
                        {appt.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost" size="icon"
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                          title="Send via WhatsApp"
                          onClick={() => openWhatsApp(appt)}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        {appt.status === "pending" && (
                          <>
                            <Button
                              variant="ghost" size="sm"
                              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs h-8"
                              onClick={() => updateStatus(appt.id, "confirmed")}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="ghost" size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs h-8"
                              onClick={() => updateStatus(appt.id, "cancelled")}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
