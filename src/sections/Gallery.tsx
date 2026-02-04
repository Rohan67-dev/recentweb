import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, Film, ChevronLeft, ChevronRight, Eye, Pause } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isAutoScrolling] = useState(true);

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      if (scrollContainerRef.current && isAutoScrolling) {
        const container = scrollContainerRef.current;
        const scrollWidth = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3000);
  }, [isAutoScrolling]);

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
        '.gallery-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Video section animation
      gsap.fromTo(
        '.video-section',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.video-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Memory cards animation
      gsap.fromTo(
        '.memory-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.memories-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );


    }, sectionRef);

    // Start auto-scroll
    startAutoScroll();

    // Auto-play hero video
    if (heroVideoRef.current) {
      heroVideoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      ctx.revert();
      stopAutoScroll();
    };
  }, [startAutoScroll, stopAutoScroll]);

  // Memory cards data - limited to 3
  const memories = [
    {
      id: 1,
      mainImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      overlayImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=80',
      title: 'Opening Ceremony',
      description: 'The grand beginning of ZION 2025',
    },
    {
      id: 2,
      mainImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
      overlayImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80',
      title: 'Night Concert',
      description: 'Unforgettable musical performances',
    },
    {
      id: 3,
      mainImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      overlayImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
      title: 'Hackathon Arena',
      description: 'Coding challenges and innovation',
    },
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden';
    stopAutoScroll();
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = 'auto';
    startAutoScroll();
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % memories.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const toggleVideo = () => {
    if (heroVideoRef.current) {
      if (isPlaying) {
        heroVideoRef.current.pause();
      } else {
        heroVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-white/10">
              <Film className="w-4 h-4 text-neon-purple" />
              <span className="text-sm font-medium text-white/80">Memories</span>
            </div>
            <h2 className="gallery-title font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">ZION </span>
              <span className="gradient-text">Gallery</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Relive the magic of past editions. A glimpse into the unforgettable moments.
            </p>
          </div>

          {/* Featured Video - Auto Playing */}
          <div className="video-section mb-20">
            <div 
              className="relative rounded-apple overflow-hidden border border-white/10"
              style={{
                background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(10, 10, 15, 0.95))',
              }}
            >
              <div className="aspect-video relative">
                <video
                  ref={heroVideoRef}
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"
                  onEnded={() => setIsPlaying(false)}
                  loop
                  muted
                  playsInline
                  autoPlay
                >
                  <source src="/legacy.mp4" type="video/mp4" />
                </video>
                
                {/* Play/Pause Overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30 cursor-pointer"
                  onClick={toggleVideo}
                >
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    )}
                  </div>
                </div>

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              
              {/* Video Info */}
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
                    ZION 2025 Highlights
                  </h3>
                  <p className="text-white/50 text-sm font-light">Official aftermovie - Auto playing</p>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-sm bg-white/5 px-4 py-2 rounded-full">
                  <Film className="w-4 h-4" />
                  <span>2:34</span>
                </div>
              </div>
            </div>
          </div>

          {/* Memory Cards - Design like Screenshot */}
          <div className="memories-grid mb-20">
            <div className="text-center mb-12">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                Cherished <span className="gradient-text">Moments</span>
              </h3>
              <p className="text-white/50 text-sm font-light">Limited collection of our best memories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {memories.map((memory, index) => (
                <div
                  key={memory.id}
                  className="memory-card group cursor-pointer"
                  onClick={() => openLightbox(index)}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Image Holder Design - Like Screenshot */}
                  <div className="relative">
                    {/* Main Large Image with Rounded Corners */}
                    <div className="relative overflow-hidden rounded-[2rem] shadow-2xl bg-slate-900 aspect-[4/3] border border-white/10">
                      <img
                        src={memory.mainImage}
                        alt={memory.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* View Icon on Hover */}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    {/* Overlay Circular Image - Bottom Right */}
                    <div className="absolute -bottom-8 -right-4 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-black shadow-2xl z-10">
                      <img
                        src={memory.overlayImage}
                        alt={`${memory.title} overlay`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Memory Info */}
                  <div className="mt-10 pr-8">
                    <span className="text-neon-purple text-xs font-medium uppercase tracking-wider mb-1 block">
                      Memory {String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors tracking-tight">
                      {memory.title}
                    </h4>
                    <p className="text-white/50 text-sm font-light">
                      {memory.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <img
            src={memories[lightboxIndex]?.mainImage}
            alt={memories[lightboxIndex]?.title}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center bg-black/50 backdrop-blur px-6 py-3 rounded-full">
            <p className="text-white font-semibold tracking-tight">{memories[lightboxIndex]?.title}</p>
            <p className="text-neon-purple text-sm">{memories[lightboxIndex]?.description}</p>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white/60 text-sm">
            {lightboxIndex + 1} / {memories.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
