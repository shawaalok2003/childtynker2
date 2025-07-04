import "./AchievementsSection.css"
const AchievementsSection = () => {
  return (
    <div className="achievements-section">
      {/* Top Info Section */}
      <div className="top-info">
        <div className="stat-card">
          <div className="stat-image">
            <img src="/images/ForkidsAge3-16yr-mi.jpeg" alt="Students" />
          </div>
          <p style={{ color: 'black' }}>3 to 16 Years Kids</p>
        </div>
        <div className="stat-card">
          <div className="stat-image">
            <img src="/images/Students2-mi.jpeg" alt="Students" />
          </div>
          <p style={{ color: 'black' }}>1600+ Students</p>
        </div>
        <div className="stat-card">
          <div className="stat-image">
            <img src="/images/Group10-mi.jpeg" alt="Countries" />
          </div>
          <p style={{ color: 'black' }}>4 Countries</p>
        </div>
        <div className="stat-card">
          <div className="stat-image">
            <img src="/images/rating-min-mi.jpeg" alt="Reviews" />
          </div>
          <p style={{ color: 'black' }}>4.6/5 on Google & FB</p>
        </div>
      </div>
      {/* Achievements Details Section */}
      <div className="achievements-details">
        <div className="achievement-card">
          <h3 className="achievement-title">Product built by an Alumni of</h3>
          <div className="achievement-logo">
            <img src="/images/Group13-mi.jpeg" alt="Microsoft Award" />
          </div>
        </div>

        <div className="achievement-card">
          <h3 className="achievement-title">Awards</h3>
          <div className="achievement-logo">
            <img src="/images/AWARDES & ACCOLADES.png" alt="India Book of Records" className="awards-image" />
          </div>
        </div>

        <div className="achievement-card">
          <h3 className="achievement-title">Accredited by</h3>
          <div className="achievement-logo">
            <img src="/images/ACCREDITED BY.png" alt="STEM.org Certified" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AchievementsSection
