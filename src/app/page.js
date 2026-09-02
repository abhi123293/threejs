import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Minerals from "@/components/Minerals";
import SafetyPolicy from "@/components/SafetyPolicy";
import Technology from "@/components/Technology";
import OurServices from "@/components/OurServices";
import OurPartners from "@/components/OurPartners";




export default function Home() {
  return (
    <main>

      <Navbar />

      <Hero />


      <About/>
     
      <Services/>
      <Minerals/>
      <SafetyPolicy/>
     <Technology />
     <OurServices/>
     <OurPartners/>

    </main>
  );
}