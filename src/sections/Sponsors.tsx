import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Sparkles, Zap, Star, Crown, Gem, Award, Heart, Target, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Sponsor {
  id: number;
  name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  description: string;
  icon: React.ElementType;
}

const Sponsors = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sponsors: Sponsor[] = [
    {
      id: 1,
      name: 'TechCorp Industries',
      tier: 'platinum',
      description: 'Leading technology solutions provider empowering innovation',
      icon: Crown,
    },
    {
      id: 2,
      name: 'InnovateLabs',
      tier: 'platinum',
      description: 'Pioneering research and development in AI and robotics',
      icon: Gem,
    },
    {
      id: 3,
      name: 'CloudNine Systems',
      tier: 'gold',
      description: 'Cloud infrastructure and digital transformation experts',
      icon: Star,
    },
    {
      id: 4,
      name: 'DataFlow Analytics',
      tier: 'gold',
      description: 'Big data analytics and business intelligence solutions',
      icon: Zap,
    },
    {
      id: 5,
      name: 'CyberShield Security',
      tier: 'silver',
      description: 'Enterprise cybersecurity and threat protection',
      icon: Target,
    },
    {
      id: 6,
      name: 'CodeCraft Studios',
      tier: 'silver',
      description: 'Software development and digital experience design',
      icon: Sparkles,
    },
    {
      id: 7,
      name: 'FutureTech Solutions',
      tier: 'bronze',
      description: 'Emerging technology consulting and implementation',
      icon: Rocket,
    },
    {
      id: 8,
      name: 'DevOps Masters',
      tier: 'bronze',
      description: 'CI/CD pipeline automation and infrastructure management',
      icon: Award,
    },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'from-slate-300 via-slate-100 to-slate-300 border-slate-400/50';
      case 'gold':
        return 'from-amber-400 via-yellow-300 to-amber-400 border-amber-500/50';
      case 'silver':
        return 'from-gray-300 via-gray-100 to-gray-300 border-gray-400/50';
      case 'bronze':
        return 'from-orange-400 via-amber-600 to-orange-400 border-orange-500/50';
      default:
        return 'from-neon-purple to-neon-blue border-white/20';
    }
  };

  const getTierGlow = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'shadow-[0_0_30px_rgba(203,213,225,0.3)]';
      case 'gold':
        return 'shadow-[0_0_30px_rgba(251,191,36,0.3)]';
      case 'silver':
        return 'shadow-[0_0_30px_rgba(209,213,219,0.3)]';
      case 'bronze':
        return 'shadow-[0_0_30px_rgba(251,146,60,0.3)]';
      default:
        return 'shadow-glow';
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
      case 'gold':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/30';
      case 'silver':
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
      case 'bronze':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      default:
        return 'bg-neon-purple/20 text-neon-purple border-neon-purple/30';
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sponsors.length);
  }, [sponsors.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + sponsors.length) % sponsors.length);
  }, [sponsors.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 2000);
  }, [isPaused, nextSlide]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.sponsors-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.sponsors-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Carousel container animation
      gsap.fromTo(
        '.sponsors-carousel',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.sponsors-carousel',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Sponsor cards stagger animation
      gsap.fromTo(
        '.sponsor-card',
        { opacity: 0, y: 40, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.sponsors-carousel',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    // Start auto-scroll
    startAutoScroll();

    return () => {
      ctx.revert();
      stopAutoScroll();
    };
  }, [startAutoScroll, stopAutoScroll]);

  // Restart auto-scroll when slide changes manually
  useEffect(() => {
    startAutoScroll();
  }, [currentSlide, startAutoScroll]);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-neon-blue/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-white/10">
              <Heart className="w-4 h-4 text-neon-pink" />
              <span className="text-sm font-medium text-white/80">Our Partners</span>
            </div>
            <h2 className="sponsors-title font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">Our </span>
              <span className="gradient-text">Sponsors</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Proudly supported by industry leaders who believe in fostering innovation and creativity.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="sponsors-carousel relative">
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-apple-xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="sponsor-card w-full flex-shrink-0 px-4"
                  >
                    <div 
                      className={`
                        relative glass rounded-apple-xl p-8 sm:p-12 
                        border-2 ${getTierGlow(sponsor.tier)}
                        transition-all duration-500 hover:scale-[1.02]
                      `}
                      style={{
                        background: `linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(10, 10, 15, 0.95))`,
                      }}
                    >
                      {/* Tier Badge */}
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getTierBadgeColor(sponsor.tier)}`}>
                        {sponsor.tier}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col items-center text-center">
                        {/* Icon Container with Gradient Border */}
                        <div className={`
                          relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl 
                          bg-gradient-to-br ${getTierColor(sponsor.tier)}
                          p-[2px] mb-6
                        `}>
                          <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center">
                            <sponsor.icon className="w-12 h-12 sm:w-16 sm:h-16 text-white/80" />
                          </div>
                        </div>

                        {/* Sponsor Name */}
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                          {sponsor.name}
                        </h3>

                        {/* Description */}
                        <p className="text-white/60 text-sm sm:text-base max-w-md font-light leading-relaxed">
                          {sponsor.description}
                        </p>

                        {/* Decorative Line */}
                        <div className={`
                          mt-6 w-24 h-1 rounded-full bg-gradient-to-r ${getTierColor(sponsor.tier)}
                        `} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                stopAutoScroll();
                prevSlide();
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 z-10 border border-white/10"
              aria-label="Previous sponsor"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                stopAutoScroll();
                nextSlide();
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 z-10 border border-white/10"
              aria-label="Next sponsor"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {sponsors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    stopAutoScroll();
                    goToSlide(index);
                  }}
                  className={`
                    transition-all duration-300 rounded-full
                    ${currentSlide === index 
                      ? 'w-8 h-2 bg-gradient-to-r from-neon-purple to-neon-blue' 
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    }
                  `}
                  aria-label={`Go to sponsor ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-scroll indicator */}
            <div className="flex justify-center mt-4">
              <div className={`
                inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs
                ${isPaused ? 'bg-white/5 text-white/40' : 'bg-neon-purple/20 text-neon-purple'}
                transition-colors duration-300
              `}>
                <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-white/40' : 'bg-neon-purple animate-pulse'}`} />
                <span>{isPaused ? 'Paused' : 'Auto-scrolling (2s)'}</span>
              </div>
            </div>
          </div>

          {/* Sponsors Grid Preview */}
          <div className="mt-16">
            <h3 className="text-center text-white/50 text-sm uppercase tracking-wider mb-6">
              All Our Partners
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {sponsors.map((sponsor, index) => (
                <button
                  key={sponsor.id}
                  onClick={() => {
                    stopAutoScroll();
                    goToSlide(index);
                  }}
                  className={`
                    px-4 py-2 rounded-xl glass border transition-all duration-300
                    ${currentSlide === index 
                      ? 'border-neon-purple/50 bg-neon-purple/10 text-white' 
                      : 'border-white/10 text-white/50 hover:text-white/80 hover:border-white/30'
                    }
                  `}
                >
                  <span className="text-sm font-medium">{sponsor.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
