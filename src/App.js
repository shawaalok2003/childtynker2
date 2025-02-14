import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ChildTynker from './components/About';
import ChampsCarousel from './components/Testiomonial';
import CourseCards from './components/CourseCards';
import EducatorListPage from './components/EducatorListPage'; 
import EducatorPage from './components/Educatordata';
import FAQSection from './components/Faqsection';
import PillarsSection from './components/Course';
import Footer from './components/Footer';
import RefundPolicy from './components/RefundPolicy';
import BookingPage from './components/Book';
import All from './components/ChildTynker';
import TermsAndConditions from './components/Terns&Conditions';
import PrivacyPolicy from './components/Privacy';
import CancellationPolicy from './components/Cancelation';
import ReturnShippingPolicy from './components/Shipping';
import ContactPage from './components/Contact';
import RegistrationPage from './components/Registration';
import CourseSelectionPage from './components/CourseSelection';
import WiseChildPackage from './components/Courses/WiseChild';
import AlphaSeriesPackage from './components/Courses/AlphaSeries';
import DronePackage from './components/Courses/DronePackage';
import DefenderWiseKit from './components/Courses/DefenederWisekit';
import PioneerPackage from './components/Courses/PioneerPackage';
import IOTMasterPackage from './components/Courses/IOTMasterPackage';
import AIMLMasterPackage from './components/Courses/AIMLMasterPackage';
import AchievementsSection from './components/AchievementsSection';
import PaymentGenerator from './components/Courses/PaymentGenerator';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* This ensures the page scrolls to top on route change */}
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <AchievementsSection/>
              <ChildTynker />
              <All/>
              <ChampsCarousel />
              <CourseCards />
              <PillarsSection/>
              <EducatorListPage/>
              <FAQSection/>
              <Footer/>
            </>
          } />
          <Route path="/about" element={
            <>
              <ChildTynker />
              <All/>
              <ChampsCarousel />
              <PillarsSection/>
              <FAQSection/>
              <Footer/>
            </>
          } />
          <Route path="/" element={<HeroSection />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/select-course" element={<CourseSelectionPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/refunds-and-cancellations" element={<RefundPolicy />} />
          <Route path="/terms" element={<TermsAndConditions/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/tynker-wall" element={<ContactPage/>} />
          <Route path="/innovation-hub" element={<ContactPage/>} />
          <Route path="/shipping" element={<ReturnShippingPolicy/>} />
          <Route path="/cancellation" element={<CancellationPolicy/>} />
          <Route path="/educators" element={<EducatorListPage />} />
          <Route path="/educator/:id" element={<EducatorPage />} />
          <Route path="/wise-child" element={<WiseChildPackage/>} />
          <Route path="/alpha-series" element={<AlphaSeriesPackage/>} />
          <Route path="/drone-package" element={<DronePackage/>} />
          <Route path="/defender-wisekit" element={<DefenderWiseKit/>} />
          <Route path="/pioneer-package" element={<PioneerPackage/>} />
          <Route path="/iot-master-package" element={<IOTMasterPackage/>} />
          <Route path="/aiml-master-package" element={<AIMLMasterPackage/>} /> 
          <Route path="/generate-payment" element={<PaymentGenerator/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;