import './ContactUsPage.css';

function ContactUsPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="contact-container">
            <div className="contact-hero">
                <h1>Get in Touch</h1>
                <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            <div className="contact-content">
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group-contactus">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-group-contactus">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="Enter your email address"
                            />
                        </div>

                        <div className="form-group-contactus">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="form-group-contactus">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                placeholder="Write your message here"
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="contact-info">
                    <div className="info-item">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            Address
                        </h3>
                        <p>123 Education Street, Learning District<br />New Delhi, 110001</p>
                    </div>

                    <div className="info-item">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            Contact Information
                        </h3>
                        <p>Email: info@lakshayacademy.com<br />Phone: +91 98765 43210<br />Toll-Free: 1800 123 4567</p>
                    </div>

                    <div className="info-item">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Business Hours
                        </h3>
                        <p>Monday - Saturday: 9:00 AM - 7:00 PM<br />Sunday: Closed</p>
                    </div>

                    
                </div>
            </div>
            <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.5726064497164!2d77.2090675!3d28.5272225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMxJzM4LjAiTiA3N8KwMTInMzIuNiJF!5e0!3m2!1sen!2sin!4v1629789876543!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Location Map"
                        ></iframe>
                    </div>
        </div>
    );
}

export default ContactUsPage;