import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, GraduationCap } from "lucide-react";
import { PageBanner } from "@/components/shared/PageBanner";
import { ContactForm } from "@/components/marketing/ContactForm";
import { contact } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Contact Us — Ummah Foundation of Durham",
  description:
    "Get in touch with Masjid Al-Ummah and Ummah Foundation of Durham. Phone, email, and address for the Oshawa masjid.",
};

function InfoRow({ icon: Icon, label, children }: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 h-9 w-9 bg-islamic-50 border border-islamic-200 rounded flex items-center justify-center mt-0.5">
        <Icon className="h-4 w-4 text-islamic-600" />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-0.5">{label}</p>
        <div className="text-sm text-ink leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageBanner
        label="We'd love to hear from you"
        title="Contact Us"
        description="Reach us by phone, email, or visit us at Masjid Al-Ummah in Oshawa, Ontario."
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-tight">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">

            {/* ── Left: contact details ── */}
            <div>
              <div className="border-l-4 border-gold-400 pl-4 mb-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-islamic-600 mb-0.5">
                  <span className="text-gold-400 mr-1.5">◆</span>Find us
                </p>
                <h2 className="text-2xl font-bold text-maroon-500">Get in Touch</h2>
              </div>

              <div className="space-y-6">
                <InfoRow icon={MapPin} label="Address">
                  <a
                    href={"https://maps.google.com/?cid=16305318455083149182"}
                    target="_blank" rel="noopener noreferrer"
                    className="hover:text-islamic-600 transition-colors"
                  >
                    {contact.address.line1}<br />
                    {contact.address.line2}
                  </a>
                </InfoRow>

                <InfoRow icon={Phone} label="Main phone">
                  <a href={contact.masjidPhoneHref} className="hover:text-islamic-600 transition-colors font-medium">
                    {contact.masjidPhone}
                  </a>
                </InfoRow>

                <InfoRow icon={Mail} label="Email">
                  <a href={`mailto:${contact.email}`} className="hover:text-islamic-600 transition-colors">
                    {contact.email}
                  </a>
                </InfoRow>

                <InfoRow icon={Clock} label="General hours">
                  <p>Open daily for all five prayers</p>
                  <p className="text-muted text-xs mt-0.5">Call ahead for office appointments</p>
                </InfoRow>

                <InfoRow icon={GraduationCap} label="Programs & admissions">
                  <p className="font-semibold">{contact.moulana.name}</p>
                  <p className="text-muted text-xs">{contact.moulana.role}</p>
                  <a
                    href={contact.moulana.phoneHref}
                    className="mt-1 block font-medium hover:text-islamic-600 transition-colors"
                  >
                    {contact.moulana.phone}
                  </a>
                </InfoRow>
              </div>

              {/* Google Maps CTA */}
              <a
                href={"https://maps.google.com/?cid=16305318455083149182"}
                target="_blank" rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-islamic-600 border border-islamic-300 bg-islamic-50 hover:bg-islamic-100 px-4 py-2.5 rounded transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>

              {/* E-Transfer note */}
              <div className="mt-6 p-4 bg-gold-50 border border-gold-200 rounded-lg">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gold-600 mb-1">
                  <span className="mr-1.5">◆</span>Donate via Interac E-Transfer
                </p>
                <p className="text-sm text-ink">
                  Send to{" "}
                  <a href={`mailto:${contact.etransfer}`} className="font-semibold text-islamic-600 hover:underline">
                    {contact.etransfer}
                  </a>
                </p>
                <p className="text-xs text-muted mt-0.5">CRA tax receipt issued for all donations</p>
              </div>
            </div>

            {/* ── Right: form (client component) ── */}
            <div>
              <div className="border-l-4 border-gold-400 pl-4 mb-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-islamic-600 mb-0.5">
                  <span className="text-gold-400 mr-1.5">◆</span>Send us a message
                </p>
                <h2 className="text-2xl font-bold text-maroon-500">We Reply Within 24 Hours</h2>
              </div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
