import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Countdown timer
    const targetDate = new Date('2026-03-15T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 100, rotateX: -45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      gsap.fromTo(
        '.hero-description',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.9,
        }
      );

      gsap.fromTo(
        '.hero-buttons',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 1.2,
        }
      );

      gsap.fromTo(
        '.countdown-container',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          delay: 1.5,
        }
      );

      // Parallax effect on scroll
      gsap.to('.hero-content', {
        yPercent: 30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.video-overlay', {
        opacity: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Video Background - Much More Transparent */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.7 }}
        >
          <source src="/legacy.mp4" type="video/mp4" />
        </video>
        {/* Very light overlay for minimal darkening */}
        <div className="video-overlay absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        {/* Subtle side gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="hero-content relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title - Using Apple-style font */}
          <h1 className="hero-title font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight">
            <span className="gradient-text-animated">ZION</span>
            <span className="text-white ml-2 sm:ml-4 font-light">2026</span>
          </h1>

          {/* Theme */}
          <div className="hero-subtitle mb-6">
            <span className="font-grotesk text-xl sm:text-2xl md:text-3xl text-white/90 tracking-widest uppercase">
              Palimpsest
            </span>
            <span className="block text-neon-purple text-lg sm:text-xl mt-1 font-light">
              — Rewrite the Future —
            </span>
          </div>

          {/* Description */}
          

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="btn-magnetic bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white font-semibold px-8 py-6 rounded-full text-lg transition-all duration-300 hover:shadow-glow animate-pulse-glow"
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('#schedule')}
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg transition-all duration-300 group"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              View Schedule
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="countdown-container">
            <p className="text-white/60 text-sm mb-4 tracking-wider uppercase font-medium">
              Event Starts In
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Mins' },
                { value: timeLeft.seconds, label: 'Secs' },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center">
                  <div className="glass rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3 sm:py-4 min-w-[60px] sm:min-w-[90px]">
                    <div className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs sm:text-sm text-white/50 mt-1 font-medium">
                      {item.label}
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="text-neon-purple text-xl sm:text-2xl font-bold mx-1 sm:mx-2 animate-pulse">
                      :
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={() => scrollToSection('#about')}
          className="text-white/50 hover:text-white transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-neon-purple/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-neon-blue/20 rounded-full blur-3xl animate-float-delayed" />
    </section>
  );
};

export default Hero;
