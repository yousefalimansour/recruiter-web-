import { Search, Gauge, FileText, Send, Wrench, Brain } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Overline } from "@/components/ui/Overline";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const STEPS = [
  { icon: Search, name: "Discover", desc: "Pulls fresh roles from public ATS APIs — Greenhouse, Lever, Ashby, RemoteOK — every 15 minutes." },
  { icon: Gauge, name: "Score", desc: "Gemini scores each job 0–100 against your profile and decides: apply, review, or reject." },
  { icon: FileText, name: "Tailor", desc: "Reorders and rephrases your résumé for ATS keywords — never inventing a single fact." },
  { icon: Send, name: "Apply", desc: "Drives the browser to fill the form, upload the résumé, answer screening questions, and submit." },
  { icon: Wrench, name: "Recover", desc: "Fixes the usual snags — missing links, wrong format, cover letter required — on its own." },
  { icon: Brain, name: "Learn", desc: "Remembers every question answered, so the next application is faster and more autonomous." },
];

/**
 * Pipeline — the six-stage flow as a flat, numbered stepper. Flat fills, 1px
 * borders, mono step indices. No gradient.
 */
export function Pipeline() {
  return (
    <section
      id="pipeline"
      className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <Reveal>
        <SectionHeading
          overline="The loop"
          title="Six stages, running around the clock"
          description="One continuous pipeline turns a raw job posting into a submitted application — with a human touched only when it truly matters."
        />
      </Reveal>

      <StaggerGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <StaggerItem key={step.name}>
              <div className="flex h-full flex-col gap-4 bg-card p-6 transition-colors duration-[320ms] hover:bg-elevated">
                <div className="flex items-center justify-between">
                  <Overline>{`0${i + 1}`}</Overline>
                  <Icon size={20} strokeWidth={1.5} className="text-primary" />
                </div>
                <h3 className="font-heading text-h3 font-semibold text-text-bright">
                  {step.name}
                </h3>
                <p className="text-small text-text-secondary">{step.desc}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
