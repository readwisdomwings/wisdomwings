import Header from "@/components/site/Header";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Book Buddy Loop</title>
        <meta name="description" content="A small community kids library to build daily reading habits with affordable rentals and refundable deposits." />
        <link rel="canonical" href="/about" />
      </Helmet>
      <main>
        <Header />
        <section className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl font-bold mb-3">About Book Buddy Loop</h1>
          <p className="text-muted-foreground max-w-2xl">
            We are parents turning our family's bookshelf into a friendly library for the society. The goal is simple: make it easy for
            kids to read more, and keep books in great shape with a small refundable deposit.
          </p>
        </section>
      </main>
    </>
  );
};

export default About;
