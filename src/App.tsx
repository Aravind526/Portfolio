import React, { useState, useEffect } from 'react';
import { Menu, X, Github as GitHub, Linkedin, Mail, ExternalLink, Download } from 'lucide-react';
import './App.css';
import SkillBar from './components/SkillBar';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);

    // Initialize AOS animations
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
      mirror: false,
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navigation */}
      {/* Navigation */}
      <header className="fixed w-full z-50 bg-white shadow-md py-3 transition-all duration-300">
        <div className="relative container mx-auto px-4 flex justify-between items-center">
          {/* Logo on the left */}
          <a href="#home" className="text-2xl font-bold text-indigo-600">Aravindstack.dev</a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`${activeSection === item.toLowerCase() ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'} transition-colors duration-300`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Hamburger Button — on top right, floating above everything */}
        <div className="absolute top-6 right-6 md:hidden z-[999]">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
            <Menu size={28} />
          </button>
        </div>
      </header>



      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[60] transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden`}>
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="z-50 relative">
            <X size={28} className="text-gray-700 hover:text-indigo-600 transition-colors duration-300" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center space-y-6 mt-20">
          {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-xl font-medium text-gray-800 hover:text-indigo-600 transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 pt-20">
        {/* AWS Certified Badge in top-right corner */}
        <div className="absolute top-24 right-4 md:top-28 md:right-32 z-10">
          <img
            src={`${import.meta.env.BASE_URL}aws_certified_image.png`} // or direct URL
            alt="AWS Certified Developer – Associate"
            className="h-28 md:h-32 w-auto drop-shadow-xl hover:scale-105 transition-transform duration-300"
            title="AWS Certified Developer – Associate"
          />
        </div>

        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="block">Hi, I'm</span>
              <span className="text-indigo-600 block">Aravind Ravichandran</span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-gray-600 mb-6">
              <TypeAnimation
                sequence={[
                  'Fullstack Developer', 2000,
                  'Java Backend Engineer', 2000,
                  'Cloud-native Specialist', 2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h2>

            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              I specialize in building scalable, high-performance backend systems and responsive web applications using modern technologies like Java, Spring Boot, Angular, React, and AWS...
            </p>

            <div className="flex space-x-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center"
              >
                Get in Touch
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg transition-colors duration-300 flex items-center"
              >
                View Projects
              </button>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src={`${import.meta.env.BASE_URL}Aravind.jpg`}
                alt="Aravind Ravichandran"
                className="absolute inset-0 object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-20 bg-white" data-aos="fade-up" data-aos-duration="1000">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">About Me</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-1 rounded-lg shadow-lg">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-4">Who I Am</h3>
                  <p className="text-gray-700 mb-4">
                    I'm a results-driven Full Stack Java Developer with 5+ years of experience designing and building scalable, high-performance applications. Currently pursuing a Master’s in Computer Science at the University of Central Missouri, I bring a strong blend of academic knowledge and real-world development expertise.
                  </p>
                  <p className="text-gray-700 mb-4">
                    My skill set spans both frontend and backend technologies, including Java, Spring Boot, React, Node.js, and AWS. I have also  worked across diverse domains such as banking, healthcare, and in  e-commerce translating business needs into reliable, secure, and user-friendly solutions.
                  </p>
                  <p className="text-gray-700">
                    I’m passionate about clean code, cloud-native architectures, and solving complex technical challenges that deliver real impact.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">Education</h3>
                  <p className="font-medium">Master of Science in Computer Science</p>
                  <p className="text-gray-600">University of Central Missouri </p>
                  <p className="text-gray-500 text-sm">2023 - 2024</p>
                  <p className="font-medium">MLR Institute of technology</p>
                  <p className="text-gray-600">Bachelors in Electronics and Communication Engineering</p>
                  <p className="text-gray-500 text-sm">2014 - 2018</p>
                </div>

                <div className="flex space-x-4 mt-6">
                  <a href="https://github.com/Aravind526" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 transition-colors">
                    <GitHub size={24} />
                  </a>
                  <a href="https://linkedin.com/in/aravindravichandran5" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="mailto:aravindravichandran.sde@gmail.com" className="text-gray-700 hover:text-indigo-600 transition-colors">
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Work Experience</h2>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-indigo-200"></div>

              {/* Experience Items */}
              <div className="space-y-12">
                {/* Walmart */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-1 md:w-1/2 pr-10 md:text-right mb-6 md:mb-0">
                    {/* <div className="hidden md:block absolute right-0 transform translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div> */}
                    <h3 className="text-xl font-bold text-indigo-600">Full Stack Developer (Intern)</h3>
                    <p className="text-gray-700 font-medium">MetaState Bio-informatics System</p>
                    <p className="text-gray-500">Aug 2024 – Dec 2024</p>
                  </div>
                  {/* <div className="md:hidden absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div> */}
                  <div className="order-2 md:order-2 md:w-1/2 md:pl-10">
                    <div className="bg-white p-5 rounded-lg shadow-sm" data-aos="fade-right" data-aos-delay="200">
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Developed secure and scalable Spring Boot microservices with Spring Cloud and REST APIs, integrating OAuth2/JWT for authentication, and documenting APIs using Swagger and Postman</li>
                        <li>Optimized backend performance by tuning MySQL/PostgreSQL schemas, improving query speed by 30%, and deploying containerized applications on AWS (EC2, S3, Lambda) using Docker, Kubernetes, and CI/CD pipelines (Jenkins, GitHub Actions)</li>
                        <li>Engineered responsive Angular 14 interfaces with animations, enhancing UI responsiveness by 35%, while driving Agile ceremonies to boost sprint delivery by 25% and maintaining 99.9% uptime in production environments</li>

                      </ul>
                    </div>
                  </div>
                </div>

                {/* Infosys */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-2 md:w-1/2 pl-10 mb-6 md:mb-0">
                    {/* <div className="hidden md:block absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div> */}
                    <h3 className="text-xl font-bold text-indigo-600">Java Full Stack Developer</h3>
                    <p className="text-gray-700 font-medium">Infosys</p>
                    <p className="text-gray-500">Jan 2022 – Dec 2022</p>
                  </div>
                  {/* <div className="md:hidden absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div> */}
                  <div className="order-2 md:order-1 md:w-1/2 md:pr-10 md:text-right">
                    <div className="bg-white p-5 rounded-lg shadow-sm" data-aos="fade-left" data-aos-delay="200">
                      <ul className="list-disc list-inside text-gray-700 space-y-2 md:list-outside md:ml-auto">
                        <li>Developed scalable and efficient RESTful APIs using Spring Boot with MongoDB and PostgreSQL, improving response times by 30% and backend efficiency by 25%, while optimizing SQL and NoSQL queries across Oracle and DynamoDB</li>
                        <li>Implemented secure authentication and authorization using Spring Security, OAuth 2.0, and JWT; integrated Redis caching and connection pooling to reduce latency and enhance performance under high traffic</li>
                        <li>Built dynamic SPAs with Angular, integrated with Java-based APIs to enhance UI responsiveness and reduce page load time by 20%; automated API testing and documentation with TestNG and Swagger</li>
                        <li>Deployed microservices on AWS using EC2, Lambda, API Gateway, and S3; configured RDS for PostgreSQL with automated backups and managed IAM roles for secure access control</li>
                        <li>Containerized applications with Docker and orchestrated deployments using Kubernetes; integrated Kafka for event-driven architecture and ensured uptime through proactive root cause analysis and production support</li>

                      </ul>
                    </div>
                  </div>
                </div>

                {/* Capgemini */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-1 md:w-1/2 pr-10 md:text-right mb-6 md:mb-0">
                    {/* <div className="hidden md:block absolute right-0 transform translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div> */}
                    <h3 className="text-xl font-bold text-indigo-600">Java Developer</h3>
                    <p className="text-gray-700 font-medium">Capgemini</p>
                    <p className="text-gray-500">Mar 2019 – Jan 2022</p>
                  </div>
                  {/* <div className="md:hidden absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div> */}
                  <div className="order-2 md:order-2 md:w-1/2 md:pl-10">
                    <div className="bg-white p-5 rounded-lg shadow-sm" data-aos="fade-right" data-aos-delay="200">
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Developed scalable backend and full-stack applications using Java 11, Spring Boot, MongoDB, and React.js; enhanced system performance, maintainability, and frontend user experience across new and legacy components</li>
                        <li>Built and secured RESTful APIs with Spring Security (JWT) and role-based access control (RBAC) for sensitive financial workflows; integrated design patterns (DAO, DTO, Singleton) to support modular architecture</li>
                        <li>Optimized database interactions using Hibernate and Spring Data JPA, reducing query latency by 15%; implemented Kafka for stream processing and decoupled communication in financial transaction pipelines</li>
                        <li>Managed Jenkins-based CI/CD pipelines and Dockerized deployments across development, staging, and production; deployed cloud-native services on AWS EC2 and S3 to improve scalability and release consistency</li>
                        <li>Increased test coverage to 70% using JUnit and Jasmine, reducing production defects; collaborated cross-functionally in Agile sprints and maintained internal documentation using Confluence</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Silicon Matrix */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-2 md:w-1/2 pl-10 mb-6 md:mb-0">
                    {/* <div className="hidden md:block absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div> */}
                    <h3 className="text-xl font-bold text-indigo-600">Software Engineer</h3>
                    <p className="text-gray-700 font-medium">Silicon Matrix</p>
                    <p className="text-gray-500">Jan 2018 – Feb 2019</p>
                  </div>
                  {/* <div className="md:hidden absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white"></div> */}
                  <div className="order-2 md:order-1 md:w-1/2 md:pr-10 md:text-right">
                    <div className="bg-white p-5 rounded-lg shadow-sm" data-aos="fade-left" data-aos-delay="200">
                      <ul className="list-disc list-inside text-gray-700 space-y-2 md:list-outside md:ml-auto">
                        <li>Developed and optimized MongoDB filter queries for efficient JSON data retrieval, improving performance by 30% and integrating the data seamlessly into the service layer</li>
                        <li>Built high-performance RESTful APIs using Node.js and implemented SPAs with React.js and Redux, leading to a 20% boost in user engagement and 15% faster page load times</li>
                        <li>Engineered reusable stateful and stateless React components, enhancing user experience by 25% and simplifying maintenance by 20% across frontend modules</li>
                        <li>Designed a Spring Boot and Angular-based banking web application that improved refund processing efficiency by 50% and reduced transaction processing time by 20%</li>
                        <li>Automated testing with Selenium WebDriver and Java 8, increasing test efficiency by 80%; managed version control via Git and Bitbucket, and used Postman for API validation across distributed teams</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href={`${import.meta.env.BASE_URL}Aravind_Ravichandran_Resume.pdf`}
              download
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
            >
              <Download size={18} className="mr-2" />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Technical Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Frontend Development</h3>
              <div className="space-y-3">
                <SkillBar skill="Angular" percentage={90} />
                <SkillBar skill="React.js" percentage={90} />
                <SkillBar skill="JavaScript/TypeScript" percentage={85} />
                <SkillBar skill="Redux" percentage={80} />
                <SkillBar skill="Tailwind CSS" percentage={80} />
              </div>
            </div>

            {/* Backend */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Backend Development</h3>
              <div className="space-y-3">
                <SkillBar skill="Java/Spring Boot" percentage={90} />
                <SkillBar skill="Node.js" percentage={85} />
                <SkillBar skill="RESTful APIs" percentage={90} />
                <SkillBar skill="GraphQL" percentage={60} />
              </div>
            </div>

            {/* Database */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Database & ORM</h3>
              <div className="space-y-3">
                <SkillBar skill="MongoDB" percentage={85} />
                <SkillBar skill="PostgreSQL" percentage={80} />
                <SkillBar skill="MySQL" percentage={75} />
                <SkillBar skill="Oracle" percentage={80} />
              </div>
            </div>

            {/* DevOps */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">DevOps & Cloud</h3>
              <div className="space-y-3">
                <SkillBar skill="AWS" percentage={90} />
                <SkillBar skill="Docker" percentage={80} />
                <SkillBar skill="CI/CD" percentage={80} />
                <SkillBar skill="Kubernetes" percentage={75} />
                <SkillBar skill="Terraform" percentage={50} />
              </div>
            </div>

            {/* Testing */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Testing</h3>
              <div className="space-y-3">
                <SkillBar skill="Jest" percentage={75} />
                <SkillBar skill="React Testing Library" percentage={70} />
                <SkillBar skill="Mocha/Chai" percentage={60} />
                <SkillBar skill="Cypress" percentage={60} />
                <SkillBar skill="JUnit" percentage={85} />
              </div>
            </div>

            {/* Tools & Others */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Tools & Others</h3>
              <div className="space-y-3">
                <SkillBar skill="Git/GitHub" percentage={90} />
                <SkillBar skill="Agile/Scrum" percentage={85} />
                <SkillBar skill="JIRA" percentage={80} />
                <SkillBar skill="Webpack" percentage={75} />
                <SkillBar skill="Responsive Design" percentage={85} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Featured Projects</h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Project Card */}
            {[
              {
                title: "NEU Social Networking Portal",
                subtitle: "Full-stack Social Platform",
                description: "A full-stack application supporting live chat, user groups, role-based access control, and real-time updates via Firebase.",
                stack: ["React", "Redux", "Java", "Spring Boot", "Firebase", "Semantic UI", "Spring Security"],
                gradient: "from-indigo-500 to-purple-600",
                url: "https://github.com/Aravind526/Norheastern-Social-Network/tree/main/Northeastern-Social-Network-main"
              },
              {
                title: "Cloud-native Ridge REST API with AWS S3 Integration",
                subtitle: "RESTful API Backend",
                description: "Scalable Spring Boot REST API for user and image management, featuring AWS S3 file storage and PostgreSQL data integration.",
                stack: ["Spring Boot", "PostgreSQL", "AWS S3", "Java", "Spring Security"],
                gradient: "from-blue-500 to-teal-500",
                url: "https://github.com/Aravind526/REST-API-with-AWS-S3-Integration"
              },
              {
                title: "Netflix GPT",
                subtitle: "AI-based Content Platform",
                description: "Containerized AI-powered content platform using GPT, Docker, and Kubernetes with a modern React frontend.",
                stack: ["React 18", "GPT", "Firebase", "Spring Cloud", "Docker", "Kubernetes"],
                gradient: "from-pink-500 to-orange-500",
                url: "https://github.com/Aravind526/netflix-gpt"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.03, rotate: [-0.5, 0.5, -0.5], transition: { duration: 0.4 } }}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-xl"
              >
                <div className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center text-white`}>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm opacity-80">{project.subtitle}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <a href={project.url} className="text-indigo-600 hover:text-indigo-800 flex items-center" target="_blank" rel="noopener noreferrer">
                      <GitHub size={16} className="mr-1" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <a
              href="https://github.com/Aravind526"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <span>View more projects on GitHub</span>
              <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>

          <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Contact Information</h3>

          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            I’m currently seeking full-time opportunities as a Java Backend or Full Stack Developer (Fulltime/W2/C2C). Please feel free to reach out if you have any suitable openings or opportunities to collaborate.
          </p>

          <div className="space-y-4 text-left md:text-center max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <Mail className="text-indigo-600 mr-3" size={20} />
              <a href="mailto:aravindravichandran.sde@gmail.com" className="text-gray-700 hover:text-indigo-600 transition-colors">
                aravindravichandran.sde@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center">
              <Linkedin className="text-indigo-600 mr-3" size={20} />
              <a href="https://linkedin.com/in/aravindravichandran5" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 transition-colors">
                linkedin.com/in/aravindravichandran5
              </a>
            </div>
            <div className="flex items-center justify-center">
              <GitHub className="text-indigo-600 mr-3" size={20} />
              <a href="https://github.com/Aravind526" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 transition-colors">
                github.com/Aravind526
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-indigo-400">Aravind Ravichandran</h2>
              <p className="text-gray-400 mt-2">Fullstack Developer</p>
            </div>

            <div className="flex space-x-6">
              <a href="https://github.com/Aravind526" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <GitHub size={24} />
              </a>
              <a href="https://linkedin.com/in/aravindravichandran5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:aravindravichandran.sde@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Aravind Ravichandran. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Skill Bar Component
// const SkillBar = ({ skill, percentage }: { skill: string, percentage: number }) => {
//   return (
//     <div>
//       <div className="flex justify-between mb-1">
//         <span className="text-gray-700">{skill}</span>
//         <span className="text-gray-500">{percentage}%</span>
//       </div>
//       <div className="h-2 bg-gray-200 rounded-full">
//         <div
//           className="h-full bg-indigo-600 rounded-full"
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// };

export default App;