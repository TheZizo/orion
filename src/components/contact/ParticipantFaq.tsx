import React from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

export const PARTICIPANT_FAQS: FaqItem[] = [
  {
    question: 'Do I need to pay anything to take part?',
    answer:
      'Erasmus+ mobilities are 100% funded by the European Union: your accommodation, 3 meals per day, project activities, materials, and eligible travel are fully covered. To confirm your spot and commitment once selected, Orion may collect a small refundable participation deposit, which is reimbursed in full upon successful completion of the project and return of travel receipts.',
  },
  {
    question: "I've never travelled alone before — is that okay?",
    answer:
      'Completely okay! A huge portion of Orion participants have never traveled outside their home region or flown on an airplane. We provide pre-departure preparation meetings, connect you with your national travel group so you journey together, and assign a dedicated group leader who supports you every step of the way.',
  },
  {
    question: 'Do I need to speak perfect English?',
    answer:
      'Not at all. You only need basic conversational English to communicate and connect. Our workshops use non-formal, experiential learning—movement, team challenges, drawing, small group discussions, and creative simulations—not academic grammar tests. Everyone helps each other translate and understand.',
  },
  {
    question: 'What is a Youthpass?',
    answer:
      'Youthpass is the official European validation tool for non-formal and informal learning in Erasmus+ projects. At the end of your project, you will document your personal growth across 8 key European competences and receive a verified certificate recognized across European universities and employers.',
  },
  {
    question: 'How are travel costs reimbursed?',
    answer:
      'You purchase your travel tickets in advance (following our simple travel guideline for train, bus, or economy flights). Once you submit your boarding passes and invoices at the project or shortly after, Orion reimburses your costs directly via SEPA bank transfer within the agreed timeframe.',
  },
  {
    question: 'Who can apply?',
    answer:
      'Anyone legally residing in the participating countries for that specific mobility within the specified age range (usually 18–30 for Youth Exchanges, and 18+ for Training Courses). Zero prior international experience or university degree is required.',
  },
];

export function ParticipantFaq() {
  return (
    <div className="space-y-6" aria-labelledby="faq-heading">
      <div className="border-b border-[rgba(11,19,43,0.10)] pb-4">
        <h3 id="faq-heading" className="type-h3 text-[#0B132B]">
          Frequently asked questions
        </h3>
        <p className="type-caption text-[rgba(11,19,43,0.7)] mt-1">
          Everything you need to know about taking your first step across borders.
        </p>
      </div>

      <div className="border-t border-[rgba(11,19,43,0.12)] divide-y divide-[rgba(11,19,43,0.10)]">
        {PARTICIPANT_FAQS.map((faq, idx) => (
          <details
            key={idx}
            className="group py-5 transition-colors hover:bg-[rgba(11,19,43,0.02)]"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 select-none focus-visible:outline-none">
              <span className="font-display font-semibold text-sm md:text-base text-[#0B132B] group-open:border-l-2 group-open:border-[#e35619] group-open:pl-3 transition-all">
                {faq.question}
              </span>
              <span
                aria-hidden="true"
                className="font-body text-base text-[rgba(11,19,43,0.5)] group-open:rotate-45 transition-transform duration-150 inline-block w-5 h-5 text-center leading-none"
              >
                +
              </span>
            </summary>
            <div className="pt-3 pr-6">
              <p className="type-body text-sm text-[rgba(11,19,43,0.8)] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
