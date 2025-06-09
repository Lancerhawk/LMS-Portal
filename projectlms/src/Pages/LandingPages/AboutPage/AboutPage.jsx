import './AboutPage.css';

function AboutPage() {
  const stats = [
    { number: '1000+', label: 'Active Students' },
    { number: '50+', label: 'Expert Teachers' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Success Rate' }
  ];

  const values = [
    {
      title: 'Academic Excellence',
      description: 'Dedicated to providing comprehensive education with focus on strong academic foundation.'
    },
    {
      title: 'Experienced Faculty',
      description: 'Our teachers are highly qualified with years of experience in CBSE and ICSE curricula.'
    },
    {
      title: 'Individual Attention',
      description: 'Small batch sizes ensure personalized attention and better learning outcomes.'
    },
    {
      title: 'Holistic Development',
      description: 'Focus on academic growth along with personality development and confidence building.'
    }
  ];

  return (
    <div className='about-container'>
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Lakshay Academy</h1>
        <p>Nurturing young minds with quality education from Class 1 to 12</p>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At Lakshay Academy, we are committed to academic excellence and student success.
            Our mission is to provide comprehensive coaching in all subjects for primary classes,
            and specialized focus on Mathematics, Science, English, and Computer Science for secondary classes,
            along with expert guidance in PCM for Classes 11-12.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-content">
          <h2>Join Our Academic Family</h2>
          <p>
            Be part of an institution that has been shaping academic success stories for over 15 years.
            Our dedicated teachers and proven methodology ensure your child's academic excellence.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;