"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { contact } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  "General Enquiry",
  "Programs & Admissions",
  "Donations & Zakat",
  "Nikah / Marriage Services",
  "Funeral Services",
  "Volunteer",
  "Other",
] as const;

type Subject = (typeof SUBJECTS)[number];

export function ContactForm() {
  const [subject, setSubject] = useState<Subject>("General Enquiry");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name    = data.get("name") as string;
    const email   = data.get("email") as string;
    const message = data.get("message") as string;

    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`
    );
    window.location.href =
      `mailto:${contact.email}?subject=${encodeURIComponent(`[Website] ${subject}`)}&body=${mailtoBody}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <CheckCircle className="h-12 w-12 text-islamic-500" />
        <h3 className="text-xl font-bold text-ink">Message sent</h3>
        <p className="text-sm text-muted max-w-xs">
          Your email client has opened with the message pre-filled. We&apos;ll reply within 24 hours, Insha&apos;Allah.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-2 text-sm text-islamic-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-muted mb-1.5">
            Your name
          </label>
          <input
            id="name" name="name" type="text" required
            placeholder="e.g. Ahmed Ali"
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-islamic-500 focus:ring-1 focus:ring-islamic-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-muted mb-1.5">
            Email address
          </label>
          <input
            id="email" name="email" type="email" required
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-islamic-500 focus:ring-1 focus:ring-islamic-500 transition-colors"
          />
        </div>
      </div>

      {/* Subject chips */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1.5">Subject</p>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s} type="button"
              onClick={() => setSubject(s)}
              className={cn(
                "text-xs font-semibold px-3 py-1.5 rounded border transition-colors",
                subject === s
                  ? "bg-islamic-500 text-white border-islamic-500"
                  : "bg-white text-ink/70 border-gray-200 hover:border-islamic-300 hover:text-islamic-600"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-muted mb-1.5">
          Message
        </label>
        <textarea
          id="message" name="message" required rows={6}
          placeholder="How can we help you?"
          className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm text-ink placeholder:text-gray-400 focus:outline-none focus:border-islamic-500 focus:ring-1 focus:ring-islamic-500 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-islamic-500 hover:bg-islamic-600 text-white font-bold py-3.5 rounded text-sm transition-colors"
      >
        <Send className="h-4 w-4" />
        Send Message
      </button>

      <p className="text-center text-xs text-muted/60">
        This opens your email client. We reply within 24 hours, Insha&apos;Allah.
      </p>

    </form>
  );
}
