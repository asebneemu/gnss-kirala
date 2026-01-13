import React from "react";
import data from "../data/data.json";

import Navbar from "../components/home/Navbar";
import ReferenceSlider from "../components/common/ReferenceSlider";
import FeaturedProducts from "../components/common/FeaturedProducts";
import AccordionMenu from "../components/common/AccordionMenu";
import Footer from "../components/common/Footer";
import Container from "../components/common/Container";
import Header from "../components/home/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
        <Header />
        
      <main className="w-full">
        <Container>
          <ReferenceSlider referencesData={data?.home?.references} />
          <FeaturedProducts featuredData={data?.home?.featured} />
        </Container>

        {/* Accordion full bg ama içi %80 */}
        <div className="w-full bg-gray-100">
          <Container>
            <AccordionMenu sections={data?.accordionSections || []} />
          </Container>
        </div>
      </main>

      <Footer />
    </div>
  );
}
