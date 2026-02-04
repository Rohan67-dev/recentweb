import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contact section animation
      gsap.fromTo(
        '.contact-section-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-section-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Contact Us Section */}
          <div className="contact-section-content">
            <div className="glass rounded-apple-xl p-8 sm:p-12 border border-white/10">
              <div className="text-center mb-12">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                  Contact <span className="gradient-text">Us</span>
                </h3>
                <p className="text-white/60 font-light">Get in touch with us</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-6">
                  {/* Institute Name */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-neon-purple font-bold text-lg">Z</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Institute</h4>
                      <p className="text-white/60 font-light">
                        Dr. D. Y. Patil Institute of Technology, Pimpri, Pune
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <a 
                    href="mailto:zion.dit@dypvp.edu.in"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-blue/30 transition-colors">
                      <Mail className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-white/60 group-hover:text-white/80 transition-colors font-light">
                        zion.dit@dypvp.edu.in
                      </p>
                    </div>
                  </a>

                  {/* Map Link */}
                  <a 
                    href="https://www.google.com/maps?ll=18.623083,73.81602&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=11226582201806666806"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-neon-pink/20 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-pink/30 transition-colors">
                      <MapPin className="w-5 h-5 text-neon-pink" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Location</h4>
                      <p className="text-white/60 group-hover:text-white/80 transition-colors font-light">
                        View on Google Maps
                      </p>
                    </div>
                  </a>
                </div>

                {/* Map Embed */}
                <div className="rounded-apple overflow-hidden border border-white/10 h-full min-h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.374446953!2d73.81602!3d18.623083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9b6a0a0a0a1%3A0x9b8c7d6e5f4a3b2c!2sDr.%20D.%20Y.%20Patil%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dr. D. Y. Patil Institute of Technology Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
