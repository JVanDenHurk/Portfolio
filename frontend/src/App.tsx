import { useState, useEffect } from 'react';
import { ChevronDown, Github, ExternalLink, Code, Database, Globe, Smartphone } from 'lucide-react';

// Star component
const Star = ({ x, y, size, opacity, twinkle }) => (
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
const ShootingStar = ({ top }) => (
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
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [planets, setPlanets] = useState([]);

  // Generate stars and planets
  useEffect(() => {
    const newStars = [];
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

  // Shooting stars randomly
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
      if (Math.random() < 0.4) {
        spawnShootingStar();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      icon: <Globe className="w-6 h-6" />,
      github: "#",
      live: "#",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management with drag-and-drop and real-time updates.",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      icon: <Code className="w-6 h-6" />,
      github: "#",
      live: "#",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      description: "Real-time data visualization with charts and graphs.",
      technologies: ["React", "D3.js", "Python", "FastAPI"],
      icon: <Database className="w-6 h-6" />,
      github: "#",
      live: "#",
      color: "from-orange-500 to-red-600"
    }
    // Add more projects as needed
  ];

  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Custom animations */}
      <style jsx>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0px) translateY(0px);
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(100px);
            opacity: 0;
          }
        }

        @keyframes floatPlanet {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <Star key={star.id} {...star} />
        ))}
        {shootingStars.map((star) => (
          <ShootingStar key={star.id} top={star.top} />
        ))}
      </div>

{/* Hero section */}
<section className="min-h-screen flex flex-col items-center justify-center relative px-4">
  {/* Background gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 opacity-30 -z-10"></div>

  <div className="text-center z-10 max-w-3xl">
    <h1 className="text-5xl sm:text-7xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 float-animation">
      Justin Van Den Hurk
    </h1>
    <h2 className="text-xl sm:text-3xl md:text-4xl font-light text-gray-300 mb-4 tracking-widest">
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
      <ChevronDown className="w-12 h-12 mx-auto text-blue-400 animate-bounce group-hover:text-purple-400 transition-colors duration-300" />
      <p className="text-sm text-gray-400 mt-2 group-hover:text-white transition-colors duration-300">
        Scroll to explore my work
      </p>
    </div>
  </div>
</section>

      {/* Projects */}
      <section id="projects" className="min-h-screen py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700/50 hover:border-purple-500/50"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color} text-white`}>
                      {project.icon}
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href={project.github} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={project.live} className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-200">
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

      {/* Footer */}
      <footer className="py-12 text-center relative z-10 border-t border-gray-800/50">
        <p className="text-gray-400">
          © 2025 Justin
        </p>
      </footer>
    </div>
  );
}

export default App;
