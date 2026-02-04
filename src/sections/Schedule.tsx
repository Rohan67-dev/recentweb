import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScheduleItem {
  time: string;
  title: string;
  venue: string;
  category: string;
}

interface DaySchedule {
  day: number;
  date: string;
  items: ScheduleItem[];
}

const Schedule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.schedule-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.schedule-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Tab animation
      gsap.fromTo(
        '.day-tabs',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.day-tabs',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scheduleData: DaySchedule[] = [
    {
      day: 1,
      date: 'March 15',
      items: [
        { time: '9:00 AM', title: 'Opening Ceremony', venue: 'Main Auditorium', category: 'Main' },
        { time: '10:30 AM', title: 'Hackathon Kickoff', venue: 'Tech Block', category: 'Technical' },
        { time: '12:00 PM', title: 'Robo Wars Round 1', venue: 'Robotics Lab', category: 'Technical' },
        { time: '2:00 PM', title: 'Workshop: AI & ML', venue: 'Lab 101', category: 'Workshop' },
        { time: '4:00 PM', title: 'E-Sports Qualifiers', venue: 'Gaming Arena', category: 'Gaming' },
        { time: '7:00 PM', title: 'Cultural Night', venue: 'Open Stage', category: 'Cultural' },
      ],
    },
    {
      day: 2,
      date: 'March 16',
      items: [
        { time: '9:00 AM', title: 'Tech Talks', venue: 'Auditorium', category: 'Technical' },
        { time: '11:00 AM', title: 'Coding Competition', venue: 'Lab 201', category: 'Technical' },
        { time: '1:00 PM', title: 'Lunch & Networking', venue: 'Food Court', category: 'Main' },
        { time: '3:00 PM', title: 'Workshop: Web3', venue: 'Lab 102', category: 'Workshop' },
        { time: '5:00 PM', title: 'Battle of Bands', venue: 'Main Ground', category: 'Cultural' },
        { time: '8:00 PM', title: 'DJ Night', venue: 'Main Stage', category: 'Cultural' },
      ],
    },
    {
      day: 3,
      date: 'March 17',
      items: [
        { time: '9:00 AM', title: 'Hackathon Finals', venue: 'Tech Block', category: 'Technical' },
        { time: '11:00 AM', title: 'Robo Wars Finals', venue: 'Robotics Lab', category: 'Technical' },
        { time: '1:00 PM', title: 'E-Sports Finals', venue: 'Gaming Arena', category: 'Gaming' },
        { time: '4:00 PM', title: 'Fashion Show', venue: 'Main Stage', category: 'Cultural' },
        { time: '6:00 PM', title: 'Prize Distribution', venue: 'Main Auditorium', category: 'Main' },
        { time: '8:00 PM', title: 'Closing Ceremony', venue: 'Main Ground', category: 'Main' },
      ],
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'bg-neon-purple/20 text-neon-purple border-neon-purple/40';
      case 'Cultural':
        return 'bg-neon-pink/20 text-neon-pink border-neon-pink/40';
      case 'Gaming':
        return 'bg-neon-blue/20 text-neon-blue border-neon-blue/40';
      case 'Workshop':
        return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/40';
      default:
        return 'bg-white/10 text-white border-white/30';
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'from-neon-purple to-neon-blue';
      case 'Cultural':
        return 'from-neon-pink to-neon-purple';
      case 'Gaming':
        return 'from-neon-blue to-neon-cyan';
      case 'Workshop':
        return 'from-neon-cyan to-neon-purple';
      default:
        return 'from-white/50 to-white/30';
    }
  };

  const currentSchedule = scheduleData.find((d) => d.day === activeDay);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-white/10">
              <Sparkles className="w-4 h-4 text-neon-purple" />
              <span className="text-sm font-medium text-white/80">Plan Your Experience</span>
            </div>
            <h2 className="schedule-title font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">Event </span>
              <span className="gradient-text">Schedule</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Three days of non-stop excitement. Plan your ZION experience.
            </p>
          </div>

          {/* Day Tabs - Premium Design */}
          <div className="day-tabs flex justify-center gap-3 sm:gap-4 mb-12">
            {scheduleData.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`relative px-5 sm:px-8 py-4 sm:py-5 rounded-apple transition-all duration-500 ${
                  activeDay === day.day
                    ? 'bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 border-2 border-neon-purple/50 shadow-glow'
                    : 'glass border border-white/10 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                <div className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                  Day {day.day}
                </div>
                <div className={`text-xs mt-1 font-medium ${activeDay === day.day ? 'text-neon-purple' : 'text-white/40'}`}>
                  {day.date}
                </div>
                {activeDay === day.day && (
                  <>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-purple rounded-full animate-pulse" />
                    <div className="absolute inset-0 rounded-apple bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 blur-xl -z-10" />
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Timeline - Premium Design */}
          <div className="timeline-container relative">
            {/* Timeline Line with Gradient */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-neon-purple via-neon-blue to-neon-pink" />
            </div>

            {/* Schedule Items */}
            <div className="space-y-4 sm:space-y-5">
              {currentSchedule?.items.map((item, index) => (
                <div
                  key={index}
                  className="timeline-item relative pl-14 sm:pl-20 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border-2 border-neon-purple group-hover:border-neon-blue group-hover:scale-125 transition-all duration-300 z-10">
                    <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${getCategoryGradient(item.category)}`} />
                  </div>

                  {/* Card - Premium Design */}
                  <div 
                    className="relative rounded-apple p-5 sm:p-6 group-hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden border border-white/10 group-hover:border-neon-purple/40"
                    style={{
                      background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(10, 10, 15, 0.95))',
                    }}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(item.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Time */}
                      <div className="flex items-center gap-2 text-neon-purple font-display font-semibold min-w-[100px]">
                        <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-sm sm:text-base">{item.time}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h4 className="text-white font-semibold text-base sm:text-lg mb-1 group-hover:text-neon-purple transition-colors tracking-tight">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-white/50 text-sm font-light">
                          <MapPin className="w-3 h-3" />
                          <span>{item.venue}</span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className={`px-4 py-1.5 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-neon-purple group-hover:translate-x-1 transition-all hidden sm:block" />
                    </div>

                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${getCategoryGradient(item.category)} group-hover:w-full transition-all duration-500`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Schedule */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-neon-purple/50 transition-all duration-300 group">
              <Calendar className="w-5 h-5 group-hover:text-neon-purple transition-colors" />
              <span className="font-medium">Download Full Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
