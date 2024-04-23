import './App.css';

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { ReactTyped } from 'react-typed';

const images = require.context('../public/assets/images', true);
const App = () => {
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

    const { ref, inView } = useInView({
      threshold: 1, // Porcentaje de visibilidad necesario para activar la animación (por ejemplo, 0.5 es la mitad del elemento visible)
    });
    const h3Animation = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0)' : 'translateX(-100px)',
      config: { duration: 500 }, // Duración de la animación
    });
    
    const h1Animation = useSpring({ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(100px)', from: { opacity: 0, transform: 'translateY(100px)' }, delay: 500, config: { duration: 500 } });
  
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
        <div>
          {/* header */}
          <header className={`header ${isHeaderSticky ? 'sticky' : ''}`}>
            <a href="#" className="logo">Portfolio</a>
            <i className="fa fa-bars" aria-hidden="true" id="menu-icon"  onClick={toggleMenu}></i>
            <nav className={`navbar ${menuActive ? 'active' : ''}`}>
                <a href="#home" onClick={handleNavLinkClick} className={activeLink === 'home' ? 'active' : ''}>Home</a>
                <a href="#skills" onClick={handleNavLinkClick} className={activeLink === 'skills' ? 'active' : ''}>Skills</a>
                <a href="#projects" onClick={handleNavLinkClick} className={activeLink === 'projects' ? 'active' : ''}>Projects</a>
                <a href="#contact" onClick={handleNavLinkClick} className={activeLink === 'contact' ? 'active' : ''}>Contact</a>
            </nav>
          </header>
          <main>
          <div>

          {/* section home   */}

          <section className="home" id="home" ref={ref}>
            <div className="home-content">
                <animated.h3 className="home-content-h3" style={isMobile ? {} : h3Animation}>
                  Hello, It's me (React Spring)
                </animated.h3>
                <animated.h1 className="home-content-h1" style={isMobile ? {} : h1Animation}>
                  Mario (React Spring)
                </animated.h1>
                <animated.div style={isMobile ? {} : h3Animation}>
                  <h3 className="home-content-h3">Mamma mia, and I'm a {' '}
                  <ReactTyped
                    strings={['Fontaner', 'Super Hero']}
                    typeSpeed={50} // Velocidad de escritura en milisegundos por caracter
                    backSpeed={30} // Velocidad de borrado en milisegundos por caracter
                    loop // Repetir la animación en un bucle
                  />
                  </h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan ornare neque sit amet malesuada. Sed bibendum eleifend interdum. Suspendisse felis risus, facilisis quis dui at, tincidunt varius sem.</p>
                  <div className="social-media">
                      <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                      <a href="#"><i className="fa fa-twitch" aria-hidden="true"></i></a>
                  </div>
                  <a href="#" className="btn">Download resume</a>
                </animated.div>
            </div>
            <div>

            </div>
            <div className="home-img">
                <animated.img style={isMobile ? {} : imgAnimation} src={images(`./home.png`)} alt="home"></animated.img>
            </div>
          </section>

          {/* section skills */}

          <section className="skills" id="skills">
            <h2 className="heading">Our <span>Skills</span></h2>
            <div className="skills-container">
              <div className="skills-box">
                  <i className="fa fa-instagram"></i>
                  <h3>Web Developmen</h3>
                  <p>ahsdhadhsahdakjsdkhaksdhjashdjasdkhasgdadj</p>
                  <a href="https://www.google.com" class="btn">Read more</a>
              </div>
              <div className="skills-box">
                  <i className="fa fa-instagram"></i>
                  <h3>Web Developmen</h3>
                  <p>ahsdhadhsahdakjsdkhaksdhjashdjasdkhasgdadj</p>
                  <a href="https://www.google.com" class="btn">Read more</a>
              </div>
              <div className="skills-box">
                  <i className="fa fa-instagram"></i>
                  <h3>Web Developmen</h3>
                  <p>ahsdhadhsahdakjsdkhaksdhjashdjasdkhasgdadj</p>
                  <a href="https://www.google.com" class="btn">Read more</a>
              </div>
              <div className="skills-box">
                  <i className="fa fa-instagram"></i>
                  <h3>Web Developmen</h3>
                  <p>ahsdhadhsahdakjsdkhaksdhjashdjasdkhasgdadj</p>
                  <a href="https://www.google.com" class="btn">Read more</a>
              </div>
              <div className="skills-box">
                  <i className="fa fa-instagram"></i>
                  <h3>Web Developmen</h3>
                  <p>ahsdhadhsahdakjsdkhaksdhjashdjasdkhasgdadj</p>
                  <a href="https://www.google.com" class="btn">Read more</a>
              </div>
              <div className="skills-box">
                  <i className="fa fa-instagram"></i>
                  <h3>Web Developmen</h3>
                  <p>ahsdhadhsahdakjsdkhaksdhjashdjasdkhasgdadj</p>
                  <a href="https://www.google.com" class="btn">Read more</a>
              </div>
            </div>
          </section>

          {/* section projects */}

          <section className="projects" id="projects">
            <h2 className="heading">Latest <span>Project</span></h2>
            <div className="projects-container">     
              <div className="projects-box">
                <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/08/setup-gaming-2444707.jpg" alt="hola"></img>
                <div class="projects-layer">
                  <h4>Web Design</h4>
                  <p>LORAEHFHSDJKJKASDHJhsdjhajksdhjasdjkhasjkdhajksdhjkashdasd</p>
                </div>
              </div>
              <div className="projects-box">
                <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/08/setup-gaming-2444707.jpg" alt="hola"></img>
                <div class="projects-layer">
                  <h4>Web Design</h4>
                  <p>LORAEHFHSDJKJKASDHJhsdjhajksdhjasdjkhasjkdhajksdhjkashdasd</p>
                </div>
              </div>
              <div className="projects-box">
                <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/08/setup-gaming-2444707.jpg" alt="hola"></img>
                <div class="projects-layer">
                  <h4>Web Design</h4>
                  <p>LORAEHFHSDJKJKASDHJhsdjhajksdhjasdjkhasjkdhajksdhjkashdasd</p>
                </div>
              </div>
              <div className="projects-box">
                <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/08/setup-gaming-2444707.jpg" alt="hola"></img>
                <div class="projects-layer">
                  <h4>Web Design</h4>
                  <p>LORAEHFHSDJKJKASDHJhsdjhajksdhjasdjkhasjkdhajksdhjkashdasd</p>
                </div>
              </div>
            </div>
          </section>

          {/* section contact */}

          <section className="contact" id="contact">
            <h2 className="heading">Contact <span>me</span></h2>
            <div className="contact-content">
              <h3>Get in touch with me through the following channels:</h3>
              <div className="contact-media">
                <a href="#home"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="#home"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="#home"><i className="fa fa-instagram" aria-hidden="true"></i></a>
              </div>
            </div>
          </section>

          {/* footer */}
          
          <footer className="footer">
            <div className="footer-text">
              <p>Copyright &copy; 2024 by Carlito | All Rights Reserved.</p>
            </div>
            <div className="footer-iconTop">
              <a href="#home"><i className="fa fa-instagram" aria-hidden="true"></i></a>
            </div>
          </footer>
          </div>
          </main>
        </div>
    );
};

export default App;