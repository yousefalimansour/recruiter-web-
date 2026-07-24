import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Overline } from "@/components/ui/Overline";
import { Reveal } from "@/components/motion/Reveal";

/**
 * CTA — closing call-to-action band. Flat card, burgundy primary button.
 */
export function CTA() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-center gap-8 rounded-lg border border-border bg-card px-6 py-20 text-center">
          <Overline tone="primary">Stop applying by hand</Overline>
          <h2 className="max-w-[20ch] font-heading text-h1 font-semibold text-text-bright">
            Let the agent run the search while you build.
          </h2>
          <p className="max-w-[52ch] text-body text-text-secondary">
            Deploy it once, connect Telegram, and receive notifications that
            applications have already been submitted — reviewing only what
            genuinely needs you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/dashboard" size="lg">
              Open the dashboard
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
            <Button
              href="https://github.com/yousefalimansour/recruiter-agent"
              variant="secondary"
              size="lg"
              target="_blank"
              rel="noreferrer"
            >
              View the source
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
