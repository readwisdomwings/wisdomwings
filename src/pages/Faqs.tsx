import Header from "@/components/site/Header";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the deposit and rent work?",
    a: "You pay a small refundable deposit per book and a low weekly rent. Return the book in good condition to get 100% of the deposit back.",
  },
  {
    q: "Who can join the library?",
    a: "Residents of our society and nearby friends are welcome. We focus on children's books for ages 3–10.",
  },
  {
    q: "How do I request a book?",
    a: "Open any book, tap Request. We'll confirm availability and coordinate pickup within the society.",
  },
];

const Faqs = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>FAQs | Book Buddy Loop</title>
        <meta name="description" content="Answers about deposits, rent, joining and requesting books at Book Buddy Loop." />
        <link rel="canonical" href="/faqs" />
      </Helmet>
      <main>
        <Header />
        <section className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-6">Quick answers for parents in our society community.</p>
          <Accordion type="single" collapsible className="w-full max-w-2xl">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </main>
    </>
  );
};

export default Faqs;
