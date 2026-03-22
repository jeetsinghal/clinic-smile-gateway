import { useState, useSyncExternalStore } from "react";
import { appointmentStore, type Appointment } from "@/store/appointments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarCheck, Clock, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

const statusColors: Record<Appointment["status"], string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const Admin = () => {
  const appointments = useSyncExternalStore(
    appointmentStore.subscribe,
    appointmentStore.getAll
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Appointments</h1>
              <p className="text-xs text-muted-foreground">
                {appointments.length} total
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {appointments.length === 0 ? (
          <div className="text-center py-20">
            <CalendarCheck className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No appointments yet
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Appointment requests submitted from the website will appear here.
            </p>
            <Link to="/#contact">
              <Button variant="hero" className="mt-6">
                Go to booking form
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Patient</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Preferred Date</TableHead>
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
                        {appt.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        {appt.phone}
                      </div>
                    </TableCell>
                    <TableCell>{appt.service || "—"}</TableCell>
                    <TableCell>
                      {appt.date ? (
                        <div className="flex items-center gap-2">
                          <CalendarCheck className="w-3.5 h-3.5 text-muted-foreground" />
                          {new Date(appt.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(appt.submittedAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[appt.status]}`}
                      >
                        {appt.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {appt.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs h-8"
                              onClick={() =>
                                appointmentStore.updateStatus(appt.id, "confirmed")
                              }
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs h-8"
                              onClick={() =>
                                appointmentStore.updateStatus(appt.id, "cancelled")
                              }
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

export default Admin;
