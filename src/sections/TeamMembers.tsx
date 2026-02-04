import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Github, Linkedin, Twitter, Mail, ExternalLink, Code, Cpu, Palette, Mic, Trophy, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: number;
  name: string;
  year: string;
  course: string;
  role: string;
  department: string;
  image: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const TeamMembers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Arjun Sharma',
      year: 'Final Year',
      course: 'Computer Engineering',
      role: 'Technical Head',
      department: 'Technical',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'arjun@zion.com',
      },
    },
    {
      id: 2,
      name: 'Priya Patel',
      year: 'Final Year',
      course: 'Information Technology',
      role: 'Event Coordinator',
      department: 'Management',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'priya@zion.com',
      },
    },
    {
      id: 3,
      name: 'Rahul Verma',
      year: 'Third Year',
      course: 'Electronics Engineering',
      role: 'Robotics Lead',
      department: 'Technical',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'rahul@zion.com',
      },
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      year: 'Final Year',
      course: 'Computer Engineering',
      role: 'Design Lead',
      department: 'Creative',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      socials: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        email: 'sneha@zion.com',
      },
    },
    {
      id: 5,
      name: 'Vikram Rao',
      year: 'Third Year',
      course: 'Mechanical Engineering',
      role: 'Sports Coordinator',
      department: 'Sports',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      socials: {
        linkedin: '#',
        email: 'vikram@zion.com',
      },
    },
    {
      id: 6,
      name: 'Ananya Desai',
      year: 'Second Year',
      course: 'Civil Engineering',
      role: 'Cultural Head',
      department: 'Cultural',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      socials: {
        twitter: '#',
        linkedin: '#',
        email: 'ananya@zion.com',
      },
    },
    {
      id: 7,
      name: 'Karan Malhotra',
      year: 'Final Year',
      course: 'Computer Engineering',
      role: 'Web Development Lead',
      department: 'Technical',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'karan@zion.com',
      },
    },
    {
      id: 8,
      name: 'Meera Iyer',
      year: 'Third Year',
      course: 'Electronics & Telecommunication',
      role: 'Marketing Head',
      department: 'Management',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'meera@zion.com',
      },
    },
  ];

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Technical':
        return Code;
      case 'Creative':
        return Palette;
      case 'Cultural':
        return Mic;
      case 'Sports':
        return Trophy;
      case 'Management':
        return Users;
      default:
        return Camera;
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Technical':
        return 'from-neon-blue to-neon-purple';
      case 'Creative':
        return 'from-neon-pink to-neon-purple';
      case 'Cultural':
        return 'from-neon-purple to-neon-pink';
      case 'Sports':
        return 'from-neon-cyan to-neon-blue';
      case 'Management':
        return 'from-amber-400 to-orange-500';
      default:
        return 'from-neon-purple to-neon-blue';
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.team-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Team cards stagger animation
      gsap.fromTo(
        '.team-card',
        { opacity: 0, y: 60, scale: 0.9, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: {
            each: 0.1,
            from: 'random',
          },
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Department badges animation
      gsap.fromTo(
        '.dept-badge',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.dept-filters',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    setHoveredCard(cardId);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setHoveredCard(null);
  };

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-20 w-48 h-48 bg-neon-pink/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-white/10">
              <Users className="w-4 h-4 text-neon-blue" />
              <span className="text-sm font-medium text-white/80">The Dream Team</span>
            </div>
            <h2 className="team-title font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">Meet Our </span>
              <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              The passionate individuals behind ZION 2026 who work tirelessly to make this event unforgettable.
            </p>
          </div>

          {/* Department Filters */}
          <div className="dept-filters flex flex-wrap justify-center gap-3 mb-12">
            {['All', 'Technical', 'Management', 'Creative', 'Cultural', 'Sports'].map((dept) => (
              <button
                key={dept}
                className="dept-badge px-4 py-2 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-neon-purple/50 hover:bg-neon-purple/10 transition-all duration-300 text-sm font-medium"
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => {
              const DeptIcon = getDepartmentIcon(member.department);
              const isHovered = hoveredCard === member.id;

              return (
                <div
                  key={member.id}
                  className="team-card group relative"
                  style={{ perspective: '1000px' }}
                  onMouseMove={(e) => handleMouseMove(e, member.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div 
                    className={`
                      relative glass rounded-apple-xl overflow-hidden
                      border border-white/10 transition-all duration-500
                      ${isHovered ? 'border-neon-purple/50 shadow-glow' : ''}
                    `}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      {/* Gradient Overlay */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-t ${getDepartmentColor(member.department)} opacity-20
                        transition-opacity duration-500 ${isHovered ? 'opacity-40' : ''}
                      `} />
                      
                      {/* Member Image */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Department Badge */}
                      <div className={`
                        absolute top-3 left-3 px-2 py-1 rounded-lg
                        bg-gradient-to-r ${getDepartmentColor(member.department)}
                        text-white text-xs font-semibold flex items-center gap-1
                        transition-transform duration-300 ${isHovered ? 'scale-110' : ''}
                      `}>
                        <DeptIcon className="w-3 h-3" />
                        {member.department}
                      </div>

                      {/* Role Badge */}
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full glass border border-white/20">
                        <span className="text-white text-xs font-medium">{member.role}</span>
                      </div>

                      {/* Hover Overlay with Social Links */}
                      <div className={`
                        absolute inset-0 bg-black/70 backdrop-blur-sm
                        flex items-center justify-center gap-3
                        transition-all duration-500
                        ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                      `}>
                        {member.socials.github && (
                          <a
                            href={member.socials.github}
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-neon-purple/30 transition-all duration-300 hover:scale-110"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-neon-blue/30 transition-all duration-300 hover:scale-110"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a
                            href={member.socials.twitter}
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-neon-cyan/30 transition-all duration-300 hover:scale-110"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                        {member.socials.email && (
                          <a
                            href={`mailto:${member.socials.email}`}
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-neon-pink/30 transition-all duration-300 hover:scale-110"
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-white mb-1 tracking-tight group-hover:text-neon-purple transition-colors duration-300">
                        {member.name}
                      </h3>
                      
                      {/* Year & Course */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Cpu className="w-3 h-3 text-neon-blue" />
                          <span className="font-light">{member.course}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-xs">
                          <span className="px-2 py-0.5 rounded bg-white/10">{member.year}</span>
                        </div>
                      </div>

                      {/* View Profile Button */}
                      <button
                        onClick={() => setSelectedMember(member)}
                        className={`
                          mt-4 w-full py-2 rounded-lg
                          bg-gradient-to-r ${getDepartmentColor(member.department)}
                          text-white text-sm font-medium
                          flex items-center justify-center gap-2
                          opacity-0 translate-y-4 transition-all duration-500
                          group-hover:opacity-100 group-hover:translate-y-0
                          hover:shadow-glow
                        `}
                      >
                        <span>View Profile</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Animated Border on Hover */}
                    <div className={`
                      absolute inset-0 rounded-apple-xl pointer-events-none
                      transition-opacity duration-500
                      ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}>
                      <div className={`
                        absolute inset-0 rounded-apple-xl
                        bg-gradient-to-r ${getDepartmentColor(member.department)}
                        opacity-20
                      `} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Team Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '50+', label: 'Team Members', icon: Users },
              { value: '5', label: 'Departments', icon: Code },
              { value: '6', label: 'Months Planning', icon: Cpu },
              { value: '100%', label: 'Dedication', icon: Trophy },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass rounded-apple p-6 text-center border border-white/10 hover:border-neon-purple/30 transition-all duration-300"
              >
                <stat.icon className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                <div className="font-display text-2xl font-bold gradient-text-animated">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="relative glass rounded-apple-xl max-w-lg w-full overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <span className="text-xl">&times;</span>
            </button>

            {/* Header Image */}
            <div className="relative h-48">
              <div className={`absolute inset-0 bg-gradient-to-r ${getDepartmentColor(selectedMember.department)} opacity-30`} />
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getDepartmentColor(selectedMember.department)} text-white text-sm font-semibold inline-flex items-center gap-1`}>
                  {(() => {
                    const Icon = getDepartmentIcon(selectedMember.department);
                    return <Icon className="w-4 h-4" />;
                  })()}
                  {selectedMember.department}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold text-white mb-1">{selectedMember.name}</h3>
              <p className="text-neon-purple font-medium mb-4">{selectedMember.role}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-white/70">
                  <Cpu className="w-5 h-5 text-neon-blue" />
                  <span>{selectedMember.course}</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="px-2 py-1 rounded bg-white/10 text-sm">{selectedMember.year}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {selectedMember.socials.github && (
                  <a href={selectedMember.socials.github} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-neon-purple/30 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {selectedMember.socials.linkedin && (
                  <a href={selectedMember.socials.linkedin} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-neon-blue/30 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {selectedMember.socials.twitter && (
                  <a href={selectedMember.socials.twitter} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-neon-cyan/30 transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {selectedMember.socials.email && (
                  <a href={`mailto:${selectedMember.socials.email}`} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-neon-pink/30 transition-all">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamMembers;
