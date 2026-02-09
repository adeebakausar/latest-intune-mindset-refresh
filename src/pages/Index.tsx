import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Programs from "@/components/Programs";
import Therapists from "@/components/Therapists";
import BookingFlow from "@/components/booking/BookingFlow";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Programs />
        <Therapists />
        <BookingFlow />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
