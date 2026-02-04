import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Music, 
  Trophy, 
  Mic2, 
  Palette, 
  Gamepad2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  title: string;
  category: string;
  description: string;
  details: string;
  date: string;
  time: string;
  venue: string;
  prize: string;
  icon: React.ElementType;
  gradient: string;
  image: string;
}

const Events = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.events-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.events-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.event-card-wrapper',
        { opacity: 0, y: 80, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.events-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const events: Event[] = [
    {
      id: 1,
      title: 'Hackathon',
      category: 'Technical',
      description: '24-hour coding marathon',
      details: 'Build innovative solutions to real-world problems. Teams of 3-4 members.',
      date: 'March 15',
      time: '10:00 AM',
      venue: 'Tech Block',
      prize: '₹50,000',
      icon: Code2,
      gradient: 'from-neon-purple to-neon-blue',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    },
    {
      id: 2,
      title: 'Battle of Bands',
      category: 'Cultural',
      description: 'Rock the stage',
      details: 'Showcase your musical talent. Original compositions preferred.',
      date: 'March 16',
      time: '6:00 PM',
      venue: 'Main Ground',
      prize: '₹30,000',
      icon: Music,
      gradient: 'from-neon-pink to-neon-purple',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    },
    {
      id: 3,
      title: 'E-Sports',
      category: 'Gaming',
      description: 'BGMI & Valorant',
      details: 'Compete in popular esports titles. Solo and team categories.',
      date: 'March 15-17',
      time: 'All Day',
      venue: 'Gaming Arena',
      prize: '₹25,000',
      icon: Gamepad2,
      gradient: 'from-neon-blue to-neon-cyan',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    },
    {
      id: 4,
      title: 'Tech Talks',
      category: 'Technical',
      description: 'Learn from experts',
      details: 'Industry leaders share insights on AI, ML, and emerging technologies.',
      date: 'March 16',
      time: '2:00 PM',
      venue: 'Auditorium',
      prize: 'Certificate',
      icon: Mic2,
      gradient: 'from-neon-cyan to-neon-purple',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    },
    {
      id: 5,
      title: 'Fashion Show',
      category: 'Cultural',
      description: 'Walk the ramp',
      details: 'Theme-based fashion showcase. Individual and group entries.',
      date: 'March 17',
      time: '7:00 PM',
      venue: 'Main Stage',
      prize: '₹20,000',
      icon: Palette,
      gradient: 'from-neon-purple to-neon-pink',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    },
    {
      id: 6,
      title: 'Robo Wars',
      category: 'Technical',
      description: 'Battle of bots',
      details: 'Build and battle your robots. Weight categories apply.',
      date: 'March 16',
      time: '11:00 AM',
      venue: 'Robotics Lab',
      prize: '₹35,000',
      icon: Trophy,
      gradient: 'from-neon-blue to-neon-purple',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-white/10">
              <Sparkles className="w-4 h-4 text-neon-purple" />
              <span className="text-sm font-medium text-white/80">Exciting Competitions</span>
            </div>
            <h2 className="events-title font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">Featured </span>
              <span className="gradient-text">Events</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Something for everyone. From coding challenges to dance battles, 
              find your passion and showcase your talent.
            </p>
          </div>

          {/* Events Grid with 3D Flip Cards */}
          <div 
            className="events-grid cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            style={{ perspective: '1000px' }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="event-card-wrapper event-card"
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flip-card h-[420px] cursor-pointer">
                  <div 
                    className="flip-card-inner relative w-full h-full"
                    style={{
                      transform: hoveredCard === event.id ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front of Card */}
                    <div className="flip-card-front rounded-apple overflow-hidden border-2 border-white/20 hover:border-neon-purple/50 transition-colors duration-300"
                      style={{
                        background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.95), rgba(10, 10, 15, 0.98))',
                      }}
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
                        {/* Category Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${event.gradient} text-white shadow-lg`}>
                          {event.category}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${event.gradient} mb-4 shadow-lg`}>
                          <event.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-white mb-2 tracking-tight">
                          {event.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-4 font-light">
                          {event.description}
                        </p>
                        <div className="flex items-center text-neon-purple text-sm font-medium">
                          <span>Hover to explore</span>
                          <ArrowRight className="w-4 h-4 ml-2 animate-pulse" />
                        </div>
                      </div>
                      
                      {/* Bottom border glow */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${event.gradient} opacity-50`} />
                    </div>

                    {/* Back of Card */}
                    <div 
                      className="flip-card-back rounded-apple overflow-hidden p-6 flex flex-col border-2 border-neon-purple/50"
                      style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15), rgba(10, 10, 15, 0.95))',
                      }}
                    >
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${event.gradient} mb-4 self-start shadow-lg`}>
                        <event.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="font-display text-2xl font-bold text-white mb-3 tracking-tight">
                        {event.title}
                      </h3>
                      
                      <p className="text-white/80 text-sm mb-4 flex-grow font-light">
                        {event.details}
                      </p>
                      
                      <div className="space-y-2 mb-4 bg-black/30 rounded-xl p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/50 font-light">Date</span>
                          <span className="text-white font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/50 font-light">Time</span>
                          <span className="text-white font-medium">{event.time}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/50 font-light">Venue</span>
                          <span className="text-white font-medium">{event.venue}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div>
                          <span className="text-white/50 text-xs block font-light">Prize Pool</span>
                          <span className="text-neon-purple font-display font-bold text-lg tracking-tight">{event.prize}</span>
                        </div>
                        <button className={`px-5 py-2.5 rounded-full bg-gradient-to-r ${event.gradient} text-white text-sm font-medium hover:shadow-glow transition-all duration-300 hover:scale-105`}>
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-white font-medium hover:bg-white/10 transition-all duration-300 group border border-white/20 hover:border-neon-purple/50">
              <span>View All Events</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .flip-card-inner {
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }

        /* Blur effect for non-hovered cards */
        .cards-container:hover .event-card-wrapper:not(:hover) {
          filter: blur(4px);
          opacity: 0.6;
          transform: scale(0.95);
        }

        .event-card-wrapper {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .event-card-wrapper:hover {
          z-index: 10;
        }

        @media (max-width: 768px) {
          .cards-container:hover .event-card-wrapper:not(:hover) {
            filter: none;
            opacity: 1;
            transform: none;
          }
          
          .flip-card-inner {
            transition: transform 0.5s ease;
          }
        }
      `}</style>
    </section>
  );
};

export default Events;
