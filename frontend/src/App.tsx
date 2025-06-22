import { useState, useEffect } from 'react';
import { ChevronDown, Github, ExternalLink, Code, Database, Speech} from 'lucide-react';
import './App.css';


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

  useEffect(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 150; i++) {
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
      if (Math.random() < 0.1) spawnShootingStar();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Board Game Script Reader",
      description: "A React Native app that lets players access and listen to the board game Etherfields story scripts.",
      technologies: [  "React", "React Native", "Expo", "TypeScript", "Node.js", "JavaScript", "JSON Data Handling"],
      icon: <Speech className="w-6 h-6" />, github: "https://github.com/JVanDenHurk/ess.web", live: "https://etherfieldssecretscripts.netlify.app/",
      color: "from-gray-500 to-black-600",
    },
    {
      id: 2,
      title: "Cybersecurity Portfolio",
      description: "A simple HTML and CSS portfolio showcasing my interest in cybersecurity.",
      technologies: ["HTML", "CSS", "GitHub Pages"],
      icon: <Code className="w-6 h-6" />, github: "https://github.com/JVanDenHurk/jvandenhurk.github.io", live: "https://jvandenhurk.github.io/",
      color: "from-green-500 to-teal-600",
    },
    // {
    //   id: 3,
    //   title: "Data Analytics Dashboard",
    //   description: "Real-time data visualization with charts and graphs.",
    //   technologies: ["React", "D3.js", "Python", "FastAPI"],
    //   icon: <Database className="w-6 h-6" />, github: "#", live: "#",
    //   color: "from-orange-500 to-red-600",
    // }
  ];

  const scrollToProjects = () => {
    const section = document.getElementById('projects');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => <Star key={star.id} {...star} />)}
        {shootingStars.map((star) => <ShootingStar key={star.id} top={star.top} id={0} />)}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 opacity-30 -z-10"></div>

        {/* GitHub Planet */}
        <a
          href="https://github.com/JVanDenHurk"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Link"
          className="hidden sm:flex absolute left-10 top-10 md:left-[10rem] md:top-[12rem] w-12 h-12 md:w-20 md:h-20 rounded-full bg-black shadow-lg hover:scale-110 transition-transform duration-300 items-center justify-center z-30"
          style={{ boxShadow: '0 0 20px rgb(255, 255, 255)' }}
        >
          <Github className="w-6 h-6 md:w-10 md:h-10 text-white" />
        </a>

        {/* Email Planet */}
        <a
          href="mailto:justin.t.hurk@gmail.com"
          aria-label="Email Justin"
          className="hidden sm:flex absolute right-10 top-40 md:top-[14rem] md:right-[10rem] w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 items-center justify-center hover:scale-110 transition-transform duration-300 z-30 shadow-lg"
          style={{ boxShadow: '0 0 20px #C5221F' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 md:w-10 md:h-10 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.03l8 6.47 8-6.47V18H4z" />
          </svg>
        </a>

        {/* LinkedIn Planet */}
        <a
          href="https://www.linkedin.com/in/justin-tom-van-den-hurk/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="hidden sm:flex absolute left-10 bottom-10 md:left-[6rem] md:bottom-[12rem] w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 items-center justify-center hover:scale-110 transition-transform duration-300 z-30 shadow-lg text-xl md:text-3xl font-bold text-white"
          style={{ boxShadow: '0 0 20px #55c9f7' }}
        >
          in
        </a>

        {/* Mobile */}
        <div className="absolute top-30 left-1/2 transform -translate-x-1/2 flex space-x-8 sm:hidden z-50">
          {/* GitHub */}
          <a
            href="https://github.com/JVanDenHurk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Link"
            className="w-10 h-10 rounded-full bg-black shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <Github className="w-6 h-6 text-white" />
          </a>

          {/* Email */}
          <a
            href="mailto:justin.t.hurk@gmail.com"
            aria-label="Email Justin"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.03l8 6.47 8-6.47V18H4z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/justin-tom-van-den-hurk/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg text-2xl font-bold text-white"
          >
            in
          </a>
        </div>


        <div className="text-center z-10 max-w-3xl">
          <h1 className="pb-2 text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 float-animation">
            Justin Van Den Hurk
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-4xl font-light text-gray-300 mb-4 tracking-widest">
            Developing one app at a time.
          </h2>

          <div
            onClick={scrollToProjects}
            role="button"
            tabIndex={0}
            aria-label="Scroll to projects"
            className="cursor-pointer group inline-block"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToProjects(); }}
          >
            <ChevronDown className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-blue-400 animate-bounce group-hover:text-purple-400 transition-colors duration-300" />
            <p className="text-sm text-gray-400 mt-2 group-hover:text-white transition-colors duration-300">
              Scroll to explore my work
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="min-h-screen py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="pb-2 text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700/50 hover:border-purple-500/50"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color} text-white`}>
                      {project.icon}
                    </div>
                    <div className="flex space-x-2">
                      <a href={project.github} target="_blank" className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={project.live} target="_blank" className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-200">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700/50 text-xs rounded-full text-gray-300 border border-gray-600/50"
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

      <footer className="py-4 text-center relative z-10 border-t border-gray-800/50">
        <p className="text-gray-400">© 2025 - Made with ☕ by Justin Van Den Hurk</p>
      </footer>
    </div>
  );
}

export default App;