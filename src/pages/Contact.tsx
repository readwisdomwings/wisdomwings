import Header from "@/components/site/Header";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Book Buddy Loop</title>
        <meta name="description" content="Get in touch to rent or partner. We’ll reach you on WhatsApp within our society." />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <main>
        <Header />
        <section className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl font-bold mb-3">Contact</h1>
          <div className="rounded-lg border p-6 md:p-8 bg-card max-w-2xl">
            <p className="text-muted-foreground">Interested to rent or partner? Share your details and we’ll message you on WhatsApp.</p>
            <div className="mt-4 text-sm">
              <div>Email: <a className="text-primary underline-offset-4 hover:underline" href="mailto:hello@bookbuddyloop.local">hello@bookbuddyloop.local</a></div>
              <div>WhatsApp: <span className="text-muted-foreground">Share your flat no. and we’ll connect.</span></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
