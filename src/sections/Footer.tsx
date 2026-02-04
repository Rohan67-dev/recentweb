import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  MapPin, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin,
  ArrowUpRight,
  Heart,
  Github
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Team', href: '#team' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Rohan67-dev/varapp', label: 'GitHub' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden"
    >
      {/* CTA Section */}
      <div className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/10" />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">Ready to </span>
              <span className="gradient-text">Join?</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto font-light">
              Don't miss out on the biggest college festival of the year. 
              Register now and be part of the ZION experience.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold text-lg hover:shadow-glow transition-all duration-300 group">
              <span>Register Now</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-content relative border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {/* Brand */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <span className="font-display text-2xl font-bold gradient-text tracking-tight">
                    ZION
                  </span>
                </div>
                <p className="text-white/60 mb-6 max-w-md leading-relaxed font-light">
                  Annual Technical and Cultural Festival at 
                  Dr. D. Y. Patil Institute of Technology, Pimpri, Pune. 
                  Where innovation meets celebration.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <a 
                    href="mailto:zion.dit@dypvp.edu.in" 
                    className="flex items-center gap-3 text-white/60 hover:text-neon-purple transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="font-light">zion.dit@dypvp.edu.in</span>
                  </a>
                  <a
                    href="https://www.google.com/maps?ll=18.623083,73.81602&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=11226582201806666806"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/60 hover:text-neon-purple transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    <span className="font-light">Dr. D. Y. Patil Institute of Technology, Pimpri, Pune</span>
                  </a>
                  
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-display text-white font-semibold mb-4 tracking-tight">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        className="text-white/60 hover:text-neon-purple transition-colors inline-flex items-center gap-1 group font-light"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <h4 className="font-display text-white font-semibold mb-4 tracking-tight">
                  Follow Us
                </h4>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-neon-purple hover:bg-white/10 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm text-center sm:text-left font-light">
                © 2026 ZION. All rights reserved.
              </p>
              <p className="text-white/40 text-sm flex items-center gap-1 font-light">
                Made with <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" /> by ZION Team
              </p>
              <p className="text-white/40 text-sm font-light">
                Theme: <span className="text-neon-purple font-medium">Palimpsest</span> — Rewrite the Future
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;
