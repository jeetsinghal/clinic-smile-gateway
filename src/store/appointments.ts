export interface Appointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  submittedAt: string;
  status: "pending" | "confirmed" | "cancelled";
}

let appointments: Appointment[] = [];
const listeners = new Set<() => void>();

export const appointmentStore = {
  getAll: () => [...appointments],

  add: (data: Omit<Appointment, "id" | "submittedAt" | "status">) => {
    const appt: Appointment = {
      ...data,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      status: "pending",
    };
    appointments = [appt, ...appointments];
    listeners.forEach((fn) => fn());
    return appt;
  },

  updateStatus: (id: string, status: Appointment["status"]) => {
    appointments = appointments.map((a) =>
      a.id === id ? { ...a, status } : a
    );
    listeners.forEach((fn) => fn());
  },

  subscribe: (fn: () => void) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
