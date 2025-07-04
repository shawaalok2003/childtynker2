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
import ScrollToTop from './components/ScrollToTop';
import WhatWillKidReceive from './components/WhatWillKidReceive';
import FeaturesCertificates from './components/FeaturesCertificates';
import Chatbot from './components/Chatbot';
import SchoolGallery from './components/Gallery';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import CreateAdmin from './components/Admin/CreateAdmin';
import UserManagement from './components/Admin/UserManagement';
import ClassManagement from './components/Admin/ClassManagement';
import Reports from './components/Admin/Reports';
import CreateClass from './components/Teacher/CreateClass';
import StudentProgress from './components/Teacher/StudentProgress';
import PlayZone from './components/PlayZone';
import TeacherWallet from './components/Teacher/TeacherWallet';
import CourseAllocation from './components/Admin/CourseAllocation';
import StudentEnrollment from './components/Student/StudentEnrollment';
import AddSampleData from './components/Admin/AddSampleData';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/" element={
            <>
            <Navbar />
              <HeroSection />
              <Chatbot/>
              <AchievementsSection/>
              <CourseCards />
              <ChampsCarousel />
              <FeaturesCertificates/>
              <PillarsSection/>
              <WhatWillKidReceive/>
              <EducatorListPage/>
              <FAQSection/>
              <Footer/>
            </>
          } />
          <Route path="/milestones" element={
            <>
            <Navbar />
            <Chatbot/>
            <AchievementsSection/>
            <Footer/>
            </>
          } />
          <Route path="/key-features" element={
            <>
            <Navbar />
            <WhatWillKidReceive/>
            <Footer/>
            </>
          } />
          <Route path="/our-products" element={
            <>
            <Navbar />
            <CourseCards />
            </>
          } />
          <Route path="/our-partners" element={
            <>
            <Navbar />
            <SchoolGallery/>
            </>
          } />
          <Route path="/testimonials" element={
            <>
            <Navbar />
           <ChampsCarousel/>
            </>
          } />
          <Route path="/about" element={
            <><Navbar />
              <ChildTynker />
              <All/>
              <ChampsCarousel />
              <PillarsSection/>
              <FAQSection/>
              <Footer/>
            </>
          } />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/student" element={<StudentDashboard/>} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard/>} />
          <Route path="/dashboard/admin" element={<AdminDashboard/>} />
          
          {/* Admin Management Routes */}
          <Route path="/create-admin" element={<CreateAdmin/>} />
          <Route path="/admin/course-allocation" element={<CourseAllocation/>} />
          <Route path="/admin/users" element={<UserManagement/>} />
          <Route path="/admin/classes" element={<ClassManagement/>} />
          <Route path="/admin/reports" element={<Reports/>} />
          <Route path="/admin/settings" element={<div>System Settings - Coming Soon</div>} />
          <Route path="/admin/content" element={<div>Content Management - Coming Soon</div>} />
          <Route path="/admin/payments" element={<div>Payment Management - Coming Soon</div>} />
          <Route path="/admin/courses" element={<div>Course Management - Coming Soon</div>} />
          <Route path="/admin/add-sample-data" element={<AddSampleData/>} />
          
          {/* Teacher Routes */}
          <Route path="/create-class" element={<CreateClass/>} />
          <Route path="/teacher-wallet" element={<TeacherWallet/>} />
          <Route path="/schedule-session" element={<div>Schedule Session - Coming Soon</div>} />
          <Route path="/teacher-reports" element={<div>Teacher Reports - Coming Soon</div>} />
          <Route path="/manage-content" element={<div>Manage Content - Coming Soon</div>} />
          <Route path="/teacher-assignments" element={<div>Teacher Assignments - Coming Soon</div>} />
          
          {/* Student Routes */}
          <Route path="/student/enrollments" element={<StudentEnrollment/>} />
          <Route path="/student/assignments" element={<div>Student Assignments - Coming Soon</div>} />
          <Route path="/student/certificates" element={<div>Student Certificates - Coming Soon</div>} />
          
          {/* Other Routes */}
          <Route path="/educator/:id" element={<EducatorPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/select-course" element={<CourseSelectionPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/refunds-and-cancellations" element={<RefundPolicy />} />
          <Route path="/terms" element={<TermsAndConditions/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/tynker-wall" element={<ContactPage/>} />
          <Route path="/innovation-hub" element={<ContactPage/>} />
          <Route path="/shipping" element={<ReturnShippingPolicy/>} />
          <Route path="/cancellation" element={<CancellationPolicy/>} />
          <Route path="/educators" element={<EducatorListPage />} />
          <Route path="/wise-child" element={<WiseChildPackage/>} />
          <Route path="/alpha-series" element={<AlphaSeriesPackage/>} />
          <Route path="/drone-package" element={<DronePackage/>} />
          <Route path="/defender-wisekit" element={<DefenderWiseKit/>} />
          <Route path="/pioneer-package" element={<PioneerPackage/>} />
          <Route path="/iot-master-package" element={<IOTMasterPackage/>} />
          <Route path="/aiml-master-package" element={<AIMLMasterPackage/>} /> 
          <Route path="/generate-payment" element={<PaymentGenerator/>} />
          <Route path="/playzone" element={<PlayZone/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;