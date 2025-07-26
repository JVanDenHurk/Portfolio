import { useState, useEffect } from 'react';
import { ChevronDown, Github, ExternalLink, Code, Speech, User, Mail, MapPin, Calendar, BookOpen, Cog } from 'lucide-react';

// Type definitions
type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkle: boolean;
};

type ShootingStar = {
  id: number;
  top: number;
};

// Star component
const Star = ({ x, y, size, opacity, twinkle }: Star) => (
  <div
    className={`absolute bg-white rounded-full ${twinkle ? 'animate-pulse' : ''}`}
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      opacity: opacity,
    }}
  />
);

// Shooting star component
const ShootingStar = ({ top }: ShootingStar) => (
  <div
    className="absolute w-1 h-1 bg-white rounded-full"
    style={{
      left: '-10px',
      top: `${top}%`,
      animation: `shootingStar 3s linear forwards`,
    }}
  />
);

function App() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [activeSection, setActiveSection] = useState('welcome');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() > 0.7,
      });
    }
    setStars(newStars);
  }, []);

  useEffect(() => {
    const spawnShootingStar = () => {
      const id = Date.now();
      const top = Math.random() * 70;
      setShootingStars([{ id, top }]);
      setTimeout(() => {
        setShootingStars([]);
      }, 3000);
    };

    const interval = setInterval(() => {
      if (Math.random() < 0.15) spawnShootingStar();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Scroll spy effect
  useEffect(() => {
    const sections = ['welcome', 'about', 'skills', 'projects', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "Board Game Script Reader",
      description: "A React Native app that lets players access and listen to the board game Etherfields story scripts with immersive audio features.",
      technologies: ["React", "React Native", "Expo", "TypeScript", "Node.js", "JavaScript", "JSON Data Handling"],
      icon: <Speech className="w-6 h-6" />,
      github: "https://github.com/JVanDenHurk/ess.web",
      live: "https://etherfieldssecretscripts.netlify.app/",
      color: "from-purple-500 to-pink-600",
      featured: true
    },
    {
      id: 2,
      title: "Cybersecurity Portfolio",
      description: "A responsive portfolio that highlights cybersecurity interests and projects using modern, minimalist design.",
      technologies: ["HTML", "CSS", "GitHub Pages", "Responsive Design"],
      icon: <Code className="w-6 h-6" />,
      github: "https://github.com/JVanDenHurk/jvandenhurk.github.io",
      live: "https://jvandenhurk.github.io/",
      color: "from-green-500 to-teal-600",
      featured: false
    }
    ,
    {
      id: 3,
      title: "Clockin",
      description:  "An automation tool that clocks in for work on Deputy using Python, Selenium, and cron jobs.",
      technologies: ["Python", "Selenium", "Cron"],
      icon: <Cog className="w-6 h-6" />,
      github: "https://github.com/JVanDenHurk/clockin",
      live: "https://github.com/JVanDenHurk/clockin",
      color: "from-blue-500 to-teal-600",
      featured: false
    }
    
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        {stars.map((star) => <Star key={star.id} {...star} />)}
        {shootingStars.map((star) => <ShootingStar key={star.id} top={star.top} id={0} />)}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-4">
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8 justify-center">
              {['Welcome', 'About', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setIsMobileMenuOpen(false); // Close menu on click (safety)
                  }}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-purple-400 bg-purple-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Hamburger button (mobile only) */}
            <button
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-6 h-0.5 bg-current"></span>
              </div>
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-4">
              {['Welcome', 'About', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setIsMobileMenuOpen(false); // Auto close menu
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-purple-400 bg-purple-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-4">
            <div className="hidden md:flex space-x-8">
              {['Welcome', 'About', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-purple-400 bg-purple-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav> */}

      {/* Welcome Section */}
      <section id="welcome" className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-32 pb-20 backdrop-blur-xs">

        <div className="text-center z-10 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 leading-tight">
              Justin Van Den Hurk
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8 rounded-full"></div>
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300 mb-8 tracking-wide">
            Forever Debugging the Universe
          </h2>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Crafting beautiful, functional applications one line of code at a time. 
            Solving real problems with clean code and creative thinking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-purple-500 rounded-full text-purple-400 font-medium hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          <div
            onClick={() => scrollToSection('about')}
            role="button"
            tabIndex={0}
            className="cursor-pointer group inline-block"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('about'); }}
          >
            <ChevronDown className="w-8 h-8 mx-auto text-blue-400 animate-bounce group-hover:text-purple-400 transition-colors duration-300" />
            <p className="text-sm text-gray-400 mt-2 group-hover:text-white transition-colors duration-300">
              Discover more about me
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-50 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <User className="w-8 h-8 text-purple-400 mr-4" />
                  <h3 className="text-2xl font-bold">Who Am I?</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm a curious builder and digital tinkerer, always exploring new ways to solve problems. 
                  My journey in technology started with curiosity and has evolved into a commitment 
                  to building applications that make a difference.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, sourcing the next big project or diving deep into the latest development trends.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-400 mr-3" />
                  <span className="text-gray-300">Based in Australia</span>
                </div>
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-gray-300">Available for new opportunities</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 text-yellow-400 mr-3" />
                  <span className="text-gray-300">Continuous learner</span>
                </div>
              </div>
              

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <h4 className="text-xl font-bold mb-4 text-purple-300">Current Focus</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Building scalable React applications</li>
                  <li>• Exploring AI agents and autonomous workflows</li>
                  <li>• Advancing cybersecurity knowledge</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-25 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-blue-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-500 hover:scale-[1.02] border border-gray-700/50 hover:border-purple-500/50 ${
                  project.featured ? 'lg:col-span-2' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${project.color} text-white shadow-lg`}>
                      {project.icon}
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-700/70 hover:bg-gray-600 rounded-xl transition-all duration-200 hover:scale-110 group/link"
                      >
                        <Github className="w-5 h-5 group-hover/link:text-purple-400 transition-colors" />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-600/80 hover:bg-blue-500 rounded-xl transition-all duration-200 hover:scale-110 group/link"
                      >
                        <ExternalLink className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gray-700/50 text-sm rounded-full text-gray-300 border border-gray-600/50 hover:border-purple-500/50 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Let's connect and discuss how we can bring your ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a
              href="mailto:justin.t.hurk@gmail.com"
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">Email</h3>
              <p className="text-gray-400">justin.t.hurk@gmail.com</p>
            </a>

            <a
              href="https://www.linkedin.com/in/justin-tom-van-den-hurk/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-2xl font-bold text-white">
                in
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">LinkedIn</h3>
              <p className="text-gray-400">Connect with me</p>
            </a>

            <a
              href="https://github.com/JVanDenHurk"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gray-800 border-2 border-gray-600 group-hover:border-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all">
                <Github className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">GitHub</h3>
              <p className="text-gray-400">View my code</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center relative z-10 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-400 mb-4">
            © 2025 Justin Van Den Hurk. Built with React, TypeScript & Tailwind CSS
          </p>
          <p className="text-sm text-gray-500">
            Made with ☕ and lots of ❤️
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(50vh) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default App;