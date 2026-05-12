import { VolunteerBgSlider } from "@/components/marketing/VolunteerBgSlider";
import { VolunteerContent } from "@/components/marketing/VolunteerContent";

export function VolunteerSection() {
  return (
    <section id="volunteer" className="relative bg-islamic-900 text-cream py-10 sm:py-12 overflow-hidden">

      {/* Auto-cycling blurred background images */}
      <VolunteerBgSlider />

      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(3,33,24,0.88) 0%, rgba(6,78,59,0.75) 100%)" }}
      />

      <VolunteerContent />
    </section>
  );
}
