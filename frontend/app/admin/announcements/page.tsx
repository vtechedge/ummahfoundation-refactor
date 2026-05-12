"use client";

import { useState, useEffect, useCallback } from "react";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { announcements as mockAnnouncements } from "@/lib/mock-data";
import { Plus, Pencil, Trash2, X, Save, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

type Announcement = {
  _id?: string;
  id?: string;
  title: string;
  body: string;
  tag: string;
  priority: "normal" | "urgent";
  date: string;
  isActive?: boolean;
  tickerOnly?: boolean;
  order?: number;
};

type FormData = {
  title: string;
  body: string;
  tag: string;
  priority: "normal" | "urgent";
  date: string;
  tickerOnly: boolean;
};

const EMPTY_FORM: FormData = {
  title: "",
  body: "",
  tag: "Notice",
  priority: "normal",
  date: new Date().toISOString().slice(0, 10),
  tickerOnly: false,
};

function announcementKey(a: Announcement): string {
  return a._id ?? a.id ?? a.title;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/announcements`);
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      setItems(json.data ?? []);
      setApiAvailable(true);
    } catch {
      setApiAvailable(false);
      setItems(
        mockAnnouncements.map((a) => ({
          ...a,
          _id: a.id,
          isActive: true,
          tickerOnly: false,
          order: 0,
        }))
      );
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
    setShowForm(true);
  }

  function openEdit(a: Announcement) {
    setEditingId(announcementKey(a));
    setForm({
      title: a.title,
      body: a.body,
      tag: a.tag,
      priority: a.priority,
      date: typeof a.date === "string" ? a.date.slice(0, 10) : new Date(a.date).toISOString().slice(0, 10),
      tickerOnly: a.tickerOnly ?? false,
    });
    setError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setError(null);
  }

  async function submitForm() {
    if (!form.title.trim() || !form.body.trim()) {
      setError("Title and body are required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      let res: Response;
      if (editingId) {
        res = await fetch(`${BASE}/announcements/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(`${BASE}/announcements`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      if (!res.ok) throw new Error("Save failed");
      closeForm();
      await loadAnnouncements();
    } catch {
      setError("Could not save. Check that the backend is running.");
    } finally {
      setSubmitting(false);
    }
  }

  async function removeAnnouncement(a: Announcement) {
    const key = announcementKey(a);
    if (!key) return;
    try {
      await fetch(`${BASE}/announcements/${key}`, { method: "DELETE" });
      await loadAnnouncements();
    } catch {
      // soft-fail: UI stays as-is
    }
  }

  async function toggleActive(a: Announcement) {
    const key = announcementKey(a);
    if (!key) return;
    try {
      await fetch(`${BASE}/announcements/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !(a.isActive ?? true) }),
      });
      await loadAnnouncements();
    } catch {
      // soft-fail
    }
  }

  return (
    <>
      <Topbar
        title="Announcements"
        subtitle="Manage community notices shown on the homepage and ticker bar."
      />

      <div className="p-6 sm:p-8 space-y-6">
        {!apiAvailable && (
          <div className="rounded-2xl bg-gold-50 border border-gold-200 px-5 py-4 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-gold-600 mt-0.5 shrink-0" />
            <p className="text-sm text-ink/80">
              Backend is offline — showing mock data. Start the API server to make changes.
            </p>
          </div>
        )}

        {/* Actions bar */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {items.length} {items.length === 1 ? "notice" : "notices"} total
          </p>
          <Button variant="primary" size="sm" className="h-10" onClick={openNew}>
            <Plus className="h-4 w-4" /> New announcement
          </Button>
        </div>

        {/* Inline form */}
        {showForm && (
          <div className="rounded-2xl bg-white border border-islamic-100 shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-lg text-ink">
                {editingId ? "Edit announcement" : "New announcement"}
              </h2>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-islamic-50" aria-label="Close form">
                <X className="h-4 w-4 text-muted" />
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-muted mb-1">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Eid prayer times announced"
                  className="w-full rounded-xl border border-islamic-100 px-4 py-2.5 text-sm focus:outline-none focus:border-islamic-400"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-muted mb-1">Body</label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                  rows={3}
                  placeholder="Full announcement text…"
                  className="w-full rounded-xl border border-islamic-100 px-4 py-2.5 text-sm focus:outline-none focus:border-islamic-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-1">Category tag</label>
                <input
                  value={form.tag}
                  onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                  placeholder="e.g. Eid, Jummah, Notice"
                  className="w-full rounded-xl border border-islamic-100 px-4 py-2.5 text-sm focus:outline-none focus:border-islamic-400"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full rounded-xl border border-islamic-100 px-4 py-2.5 text-sm focus:outline-none focus:border-islamic-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.priority === "urgent"}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, priority: e.target.checked ? "urgent" : "normal" }))
                  }
                  className="h-4 w-4 rounded border-islamic-200 accent-red-600"
                />
                <span className="text-sm text-ink">Mark urgent</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.tickerOnly}
                  onChange={(e) => setForm((f) => ({ ...f, tickerOnly: e.target.checked }))}
                  className="h-4 w-4 rounded border-islamic-200 accent-islamic-600"
                />
                <span className="text-sm text-ink">Show in ticker only</span>
              </label>
            </div>

            {/* Sticky save footer */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-islamic-50 sticky bottom-0 bg-white">
              <Button variant="ghost" size="sm" onClick={closeForm} disabled={submitting}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={submitForm} disabled={submitting}>
                <Save className="h-4 w-4" />
                {submitting ? "Saving…" : editingId ? "Save changes" : "Add announcement"}
              </Button>
            </div>
          </div>
        )}

        {/* Announcements table */}
        <div className="rounded-2xl bg-white border border-islamic-50 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-islamic-50/50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Title</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Tag</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Priority</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Date</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Status</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider font-semibold text-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-muted text-sm">
                      No announcements yet. Click &quot;New announcement&quot; to add one.
                    </td>
                  </tr>
                )}
                {items.map((a) => {
                  const key = announcementKey(a);
                  const isActive = a.isActive ?? true;
                  return (
                    <tr key={key} className="border-t border-islamic-50 hover:bg-islamic-50/40 transition">
                      <td className="px-6 py-3.5">
                        <div className="font-medium text-ink line-clamp-1">{a.title}</div>
                        <div className="text-xs text-muted line-clamp-1 mt-0.5">{a.body}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant="neutral">{a.tag}</Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        {a.priority === "urgent" ? (
                          <Badge variant="destructive">Urgent</Badge>
                        ) : (
                          <span className="text-xs text-muted">Normal</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-muted text-xs tabular-nums">
                        {formatDate(typeof a.date === "string" ? a.date : new Date(a.date).toISOString())}
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => apiAvailable && toggleActive(a)}
                          disabled={!apiAvailable}
                          className={cn(
                            "inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 transition",
                            isActive
                              ? "bg-islamic-50 text-islamic-700 hover:bg-islamic-100"
                              : "bg-gray-100 text-muted hover:bg-gray-200",
                            !apiAvailable && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <span className={cn("h-1.5 w-1.5 rounded-full", isActive ? "bg-islamic-500" : "bg-gray-400")} />
                          {isActive ? "Active" : "Hidden"}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(a)}
                            disabled={!apiAvailable}
                            className={cn(
                              "p-2 rounded-lg hover:bg-islamic-50 text-ink/60 hover:text-ink transition",
                              !apiAvailable && "opacity-40 cursor-not-allowed"
                            )}
                            aria-label="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => apiAvailable && removeAnnouncement(a)}
                            disabled={!apiAvailable}
                            className={cn(
                              "p-2 rounded-lg hover:bg-red-50 text-ink/60 hover:text-red-600 transition",
                              !apiAvailable && "opacity-40 cursor-not-allowed"
                            )}
                            aria-label="Remove"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
