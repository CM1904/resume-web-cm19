import './App.css';

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { ReactTyped } from 'react-typed';
import ProgressBar from './components/ProgressBar';
import { IntlProvider, FormattedMessage } from 'react-intl'; 
const messages_es = require('./components/translations/es.json'); 
const messages_en = require('./components/translations/en.json'); 
const currentYear = new Date().getFullYear();
const images = require.context('../public/assets/images', true);
const imageUrl = images('./fondo2.jpeg');

const App = () => {
    // Estado para almacenar el idioma
    const [locale, setLocale] = useState(navigator.language.split(/[-_]/)[0]); // Obtiene el idioma principal del navegador

    // Efecto para actualizar el idioma al cambiar navigator.language
    useEffect(() => {
      const handleLanguageChange = () => {
        setLocale(navigator.language.split(/[-_]/)[0]);
      };

      window.addEventListener('languagechange', handleLanguageChange);

      return () => {
        window.removeEventListener('languagechange', handleLanguageChange);
      };
    }, []);

    // Obtiene los mensajes de traducción según el idioma seleccionado
    let messages;
    switch (locale) {
      case 'en':
        messages = messages_en;
        break;
      case 'es':
        messages = messages_es;
        break;
      default:
        messages = messages_en; // Por defecto, usa inglés
    }

    //copiar email
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
      const email = "carlosmiers19@gmail.com";
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reinicia el estado después de 3 segundos
    };

    //desactivar animaciones
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Cambia a true si el ancho es menor o igual a 768px
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // animaciones
    
    // Simula un aumento gradual del porcentaje para demostrar la animación
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        if (percentage < 100) {
          setPercentage(percentage + 10);
        } else {
          clearInterval(interval);
        }
      }, 1000); // Ajusta el intervalo de tiempo según tu necesidad

      return () => clearInterval(interval);
    }, [percentage]);
    
    const { ref, inView } = useInView({
      threshold: 0.5, // Porcentaje de visibilidad necesario para activar la animación (por ejemplo, 0.5 es la mitad del elemento visible)
    });


    const h3Animation = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(-100px)',
      from: { opacity: 0, transform: 'translateY(100px)' }, 
      config: { duration: 500 }, // Duración de la animación
    });
    
    const h1Animation = useSpring({ 
      opacity: inView ? 1 : 0, 
      transform: inView ? 'translateY(0)' : 'translateY(-100px)', 
      from: { opacity: 0, transform: 'translateY(100px)' }, 
      delay: 500, config: { duration: 500 } });


    const h2skills = useSpring({ 
      opacity: inView ? 1 : 0, 
      transform: inView ? 'translateY(0)' : 'translateY(-100px)', 
      from: { opacity: 0, transform: 'translateY(100px)' }, 
      config: { duration: 500 } });

    const imgAnimation = useSpring({
      loop: { reverse: true }, // Repite la animación en un bucle
      from: { opacity: 1, transform: 'translateY(-50px)' },
      to: [
        { opacity: 1, transform: 'translateY(0px)' },
        { opacity: 1, transform: 'translateY(-50px)' },
      ],
      config: { duration: 1000 }, // Duración de cada iteración de la animación
    });

    const [activeLink, setActiveLink] = useState('home');
    const [menuActive, setMenuActive] = useState(false);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setActiveLink(getActiveLink());
            setIsHeaderSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getActiveLink = () => {
        const sections = document.querySelectorAll('section');
        const top = window.scrollY + 150;

        for (const sec of sections) {
            const offset = sec.offsetTop;
            const height = sec.offsetHeight;

            if (top >= offset && top < offset + height) {
                return sec.getAttribute('id');
            }
        }

        return 'home';
    };

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const handleNavLinkClick = () => {
      setMenuActive(false);
    };

    return (
      <IntlProvider locale={locale} messages={messages}>

        <div>
          {/* header */}
          <header className={`header ${isHeaderSticky ? 'sticky' : ''}`}>
            <a href="#" className="logo">
              <FormattedMessage id="nav_title" />
            </a>
            <i className="fa fa-bars" aria-hidden="true" id="menu-icon"  onClick={toggleMenu}></i>
            <nav className={`navbar ${menuActive ? 'active' : ''}`}>
                <a href="#home" onClick={handleNavLinkClick} className={activeLink === 'home' ? 'active' : ''}><FormattedMessage id="nav_home" /></a>
                <a href="#skills" onClick={handleNavLinkClick} className={activeLink === 'skills' ? 'active' : ''}><FormattedMessage id="nav_skills" /></a>
                <a href="#projects" onClick={handleNavLinkClick} className={activeLink === 'projects' ? 'active' : ''}><FormattedMessage id="nav_projects" /></a>
                <a href="#contact" onClick={handleNavLinkClick} className={activeLink === 'contact' ? 'active' : ''}><FormattedMessage id="nav_contact" /></a>
            </nav>
          </header>
          <main>
          <div>

          {/* section home   */}

          <section className="home" id="home" ref={ref} style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* <section className="home" id="home" ref={ref}> */}
            <div className="home-content">
                <animated.h3 className="home-content-h3" style={isMobile ? {} : h3Animation}>
                  <FormattedMessage id="home1" />
                </animated.h3>
                <animated.h1 className="home-content-h1" style={isMobile ? {} : h1Animation}>
                  <FormattedMessage id="home2" />
                </animated.h1>
                <animated.div style={isMobile ? {} : h3Animation}>
                  <h3 className="home-content-h3">
                <ReactTyped
                    strings={["Front end developer","Back end developer"]}
                    typeSpeed={70} // Velocidad de escritura en milisegundos por caracter
                    backSpeed={50} // Velocidad de borrado en milisegundos por caracter
                    loop // Repetir la animación en un bucle
                  />
                  </h3>
                  <p><FormattedMessage id="home3" /></p>
                  {/* <div className="social-media">
                      <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                      <a href="#"><i className="fa fa-twitch" aria-hidden="true"></i></a>
                  </div> */}
                  <a href="https://drive.google.com/file/d/1hiO_12qCT8DgnaxaGw0ZUoAjy3e4f6Qp/view?usp=sharing" className="btn"><FormattedMessage id="home4" /></a>
                </animated.div>
            </div>
            {/* <div>

            </div> */}
            {/* <div className="home-img">
                <animated.img style={isMobile ? {} : imgAnimation} src={images(`./home.png`)} alt="home"></animated.img>
            </div> */}
          </section>

          {/* section skills */}

          <section className="skills" id="skills">
            <h2 className="heading"> <FormattedMessage id="skills_title1" /><span><FormattedMessage id="skills_title2" /></span></h2>
            <div className="skills-container">
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
                  <h3>Node JS</h3>
                  <ProgressBar percentage={70} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                  <h3>React JS</h3>
                  <ProgressBar percentage={50} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
                  <h3>JavaScript</h3>
                  <ProgressBar percentage={80} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" />
                  <h3>PHP</h3>
                  <ProgressBar percentage={100} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" />
                  <h3>Laravel</h3>
                  <ProgressBar percentage={70} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
                  <h3>Python</h3>
                  <ProgressBar percentage={40} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
                  <h3>HTML5</h3>
                  <ProgressBar percentage={100} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
                  <h3>CSS</h3>
                  <ProgressBar percentage={80} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" />
                  <h3>npm</h3>
                  <ProgressBar percentage={100} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" />
                  <h3>MySQL</h3>
                  <ProgressBar percentage={90} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
                  <h3>PostgreSQL</h3>
                  <ProgressBar percentage={90} />
              </div>
              <div className="skills-box">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" />
                  <h3>Oracle</h3>
                  <ProgressBar percentage={70} />
              </div>
            </div>
          </section>

          {/* section projects */}

          <section className="projects" id="projects">
            <h2 className="heading"><FormattedMessage id="projects_title1" /><span><FormattedMessage id="projects_title2" /></span></h2>
            <div className="projects-container">     
              <div className="projects-box">
                <img src={images(`./sgrpy.png`)} alt="sgrpy"></img>
                <div className="projects-layer">
                  <h4>SGR.PY</h4>
                  <p><FormattedMessage id="proj1" /></p>
                  <p><FormattedMessage id="proj2" /></p>
                  <div className="projects-languages">
                    <i className="devicon-php-plain"></i>
                    <i className="devicon-javascript-plain"></i>
                    <i className="devicon-html5-plain"></i>
                    <i className="devicon-css3-plain"></i>
                  </div>
                </div>
              </div>
              <div className="projects-box">
                <img src={images(`./sysrec.png`)} alt="sgrpy"></img>
                <div className="projects-layer">
                  <h4>SysREC</h4>
                  <p><FormattedMessage id="proj3" /></p>
                  <p><FormattedMessage id="proj4" /></p>
                  <div className="projects-languages">
                    <i className="devicon-php-plain"></i>
                    <i className="devicon-javascript-plain"></i>
                    <i className="devicon-laravel-plain"></i>
                    <i className="devicon-html5-plain"></i>
                    <i className="devicon-css3-plain"></i>
                  </div>
                </div>
              </div>
              <div className="projects-box">
                <img src={images(`./busqueda.png`)} alt="sgrpy"></img>
                <div className="projects-layer">
                  <h4>Busqueda REC</h4>
                  <p><FormattedMessage id="proj5" /></p>
                  <p><FormattedMessage id="proj6" /></p>
                  <div className="projects-languages">
                    <i className="devicon-php-plain"></i>
                    <i className="devicon-javascript-plain"></i>
                    <i className="devicon-html5-plain"></i>
                    <i className="devicon-css3-plain"></i>
                  </div>
                </div>
              </div>
              <div className="projects-box">
                <img src={images(`./syscvt.png`)} alt="sgrpy"></img>
                <div className="projects-layer">
                  <h4>SysCVT</h4>
                  <p><FormattedMessage id="proj7" /></p>
                  <p><FormattedMessage id="proj8" /></p>
                  <div className="projects-languages">
                    <i className="devicon-php-plain"></i>
                    <i className="devicon-javascript-plain"></i>
                    <i className="devicon-html5-plain"></i>
                    <i className="devicon-css3-plain"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* section contact */}

          <section className="contact" id="contact">
            <h2 className="heading"><FormattedMessage id="contact_title1" /><span><FormattedMessage id="contact_title2" /></span></h2><br/>
            <div className="contact-content">
              <h3><FormattedMessage id="cont1" /></h3>
              <div className="contact-media">
                <a href="https://github.com/CM1904"><i className="devicon-github-original"></i></a>
                <a href="https://www.linkedin.com/in/carlos-miers-dev"><i className="devicon-linkedin-plain"></i></a>
                <button onClick={handleCopyEmail}><i className="fa fa-envelope" aria-hidden="true"></i></button>
              </div>
              <p>Mail: carlosmiers19@gmail.com</p>
              {copied && (<p> <FormattedMessage id="cont2" /></p>)}
            </div>
          </section>

          {/* footer */}
          
          <footer className="footer">
            <div className="footer-text">
              <p>Copyright &copy; {currentYear}<FormattedMessage id="copy" /></p>
            </div>
            <div className="footer-iconTop">
              <a href="#home"><i className="fa fa-arrow-up" aria-hidden="true"></i></a>
            </div>
          </footer>
          </div>
          </main>
        </div>
        </IntlProvider>
    );
};

export default App;