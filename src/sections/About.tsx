import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Music, Trophy, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        '.about-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description animation
      gsap.fromTo(
        '.about-description',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-description',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Feature cards animation
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '9+', label: 'Events', icon: Trophy },
    { value: '1838+', label: 'Participants', icon: Users },
    { value: '0L+', label: 'Prize Pool', icon: Cpu },
    { value: '0', label: 'Days of Fun', icon: Music },
  ];

  const features = [
    {
      title: 'Technical Events',
      description: 'Hackathons, coding competitions, robotics, and more.',
      icon: Cpu,
      color: 'from-neon-purple to-neon-blue',
    },
    {
      title: 'Cultural Events',
      description: 'Dance, music, drama, and fashion shows.',
      icon: Music,
      color: 'from-neon-pink to-neon-purple',
    },
    {
      title: 'Sports Events',
      description: 'Cricket, football, basketball, and esports tournaments.',
      icon: Trophy,
      color: 'from-neon-blue to-neon-cyan',
    },
    {
      title: 'Workshops',
      description: 'Learn from industry experts hands-on.',
      icon: Users,
      color: 'from-neon-cyan to-neon-purple',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
          alt="Festival Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/80" />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Decorative Glows */}
      <div className="about-glow-1 absolute top-20 -left-32 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl" />
      <div className="about-glow-2 absolute bottom-20 -right-32 w-80 h-80 bg-neon-blue/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="about-title font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">About </span>
              <span className="gradient-text">ZION</span>
            </h2>
            <p className="about-description text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
              Where Innovation Meets Celebration. ZION is not just a fest; it's a movement. 
              From cutting-edge technical competitions to breathtaking cultural performances, 
              we bring together the brightest minds and most talented artists.
            </p>
          </div>

          {/* Theme Highlight */}
          <div className="glass rounded-apple p-8 sm:p-12 mb-16 text-center relative overflow-hidden group border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-neon-blue/10 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <span className="text-neon-purple text-sm tracking-widest uppercase mb-2 block font-medium">
                This Year's Theme
              </span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                PALIMPSEST
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                Celebrates the layers of stories, experiences, and memories that make ZION what it is — 
                a canvas that keeps evolving with each passing year.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card glass rounded-apple p-6 text-center group hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-neon-purple/50"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 mb-4 group-hover:scale-110 transition-transform border border-white/10">
                  <stat.icon className="w-6 h-6 text-neon-purple" />
                </div>
                <div className="font-display text-3xl sm:text-4xl font-bold gradient-text-animated mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card glass rounded-apple p-6 group hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 border border-white/10 hover:border-neon-purple/50"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-white text-lg mb-2 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-white/50 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
