// app/terms-and-conditions/page.tsx
import React from 'react';

export default function SalesandCondtions() {
  return (
    <main className="px-4 md:px-12 py-10 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6"> Sale of Goods</h1>

      <p className="mb-6">
        These sale of goods terms and conditions detail the provisions under which the Trustee for Green Locals Australia Trust trading as Car Audio Expert (ABN: 51 799 255 761), herein referred to as “we” or “us”, supplies car entertainment products (“Goods”) to you, the purchaser (“you” or “your”).
      </p>

      <Section title="1. Acceptance of Terms">
        <p>
          By ordering, accepting, or paying for the Goods after receiving or becoming aware of these terms, or by manifesting your agreement through any conduct, you acknowledge and agree to be bound by these terms.
        </p>
      </Section>

      <Section title="2. Ordering and Purchasing Goods">
        <p>
          You may purchase the Goods from our website, <a href="https://caraudioexpert.com.au" className="text-blue-600 underline">caraudioexpert.com.au</a>, or directly through our sales team. These terms apply regardless of the purchasing channel.
        </p>
      </Section>

      <Section title="3. Payment Terms">
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Obligation to Pay:</strong> Payment is due at time of order unless credit terms are pre-approved.</li>
          <li><strong>GST:</strong> All prices include Australian GST unless stated otherwise.</li>
          <li><strong>Payment Providers:</strong> Payments may be processed through third parties. We are not responsible for their performance or security.</li>
          <li><strong>Credit Card Surcharges:</strong> Additional charges may apply for card transactions.</li>
          <li><strong>Pricing Errors:</strong> We will notify you of pricing discrepancies and provide a choice to proceed or cancel.</li>
        </ul>
      </Section>

      <Section title="4. Delivery of Goods">
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Charges:</strong> You are responsible for all delivery costs.</li>
          <li><strong>Address Accuracy:</strong> Ensure the delivery address is correct. We are not liable for misdeliveries due to incorrect addresses.</li>
          <li><strong>Carrier Terms:</strong> Third-party carrier terms apply to deliveries.</li>
          <li><strong>Delivery Estimates:</strong> Delivery times are estimates only; we are not liable for delays.</li>
        </ul>
      </Section>

      <Section title="5. Title and Risk">
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Title:</strong> Ownership remains with us until full payment is received.</li>
          <li><strong>Risk:</strong> Risk passes on payment or delivery, whichever is earlier.</li>
          <li><strong>Unclaimed Goods:</strong> May be stored or resold; refund may exclude transaction fees.</li>
          <li><strong>Non-Payment:</strong> We may recover goods using reasonable force without liability.</li>
          <li><strong>Proceeds of Resale:</strong> You hold any resale proceeds in trust until payment is complete.</li>
        </ul>
      </Section>

      <Section title="6. Returns Due to Change of Mind">
        <ul className="list-disc ml-6 space-y-2">
          <li>Generally not accepted, but exceptions may apply.</li>
          <li>Requests must be made within 30 days with proof of purchase.</li>
          <li>Subject to our discretion; may result in exchange or store credit only.</li>
          <li>Restocking fees may apply.</li>
          <li>This does not affect your consumer rights for faulty goods.</li>
        </ul>
      </Section>

      <Section title="7. Returns of Faulty Goods">
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Initial Contact:</strong> Email us with fault details and images.</li>
          <li><strong>Return for Inspection:</strong> Send the Good to us at your cost for inspection.</li>
          <li><strong>Assessment:</strong> If not faulty, return is denied and item returned at your cost.</li>
          <li><strong>If Faulty:</strong> We provide refund (incl. shipping) or exchange.</li>
          <li><strong>Non-Compliance:</strong> We may reduce or deny refund if the return process isn’t followed.</li>
        </ul>
      </Section>

      <Section title="8. Compliance with Australian Consumer Law">
        <p>
          You are entitled to remedies under Australian Consumer Law for major or minor defects. These terms do not limit those rights or exclude our liability for negligence or misconduct where such exclusion is not permitted.
        </p>
      </Section>

      <Section title="9. Limitation of Liability and Indemnity">
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Warranties:</strong> No additional warranties are provided unless explicitly stated.</li>
          <li><strong>Limitation:</strong> Liability is limited to the price paid or $100 unless otherwise required by law.</li>
          <li><strong>Indemnity:</strong> You indemnify us against loss from breach, misuse, or improper installation of Goods.</li>
          <li><strong>Exclusion:</strong> We exclude liability for consequential or indirect loss to the extent permitted by law.</li>
        </ul>
      </Section>

      <Section title="10. General Terms">
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Governing Law:</strong> Victoria, Australia.</li>
          <li><strong>Amendments:</strong> Only valid if in writing and signed by both parties.</li>
          <li><strong>Waiver:</strong> Must be in writing.</li>
          <li><strong>Severability:</strong> Invalid clauses do not affect the rest.</li>
          <li><strong>Assignment:</strong> Not allowed without consent.</li>
          <li><strong>Entire Agreement:</strong> Supersedes all prior agreements.</li>
        </ul>
      </Section>

      <Section title="Interpretation Clauses">
        <p>These clauses define how terms are interpreted across this agreement, including plural forms, gender neutrality, legal references, and more.</p>
        <p className="mt-4 font-medium text-sm text-gray-600">Note: For full legal advice or compliance, please consult a legal professional.</p>
      </Section>
    </main>
  );
}

// Reusable section component
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}
