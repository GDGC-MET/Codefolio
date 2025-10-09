document.addEventListener('DOMContentLoaded', function() {
    // Initialize tsParticles
    tsParticles.load("particles-js", {
        autoPlay: true,
        background: {
            color: {
                value: "#000"
            },
            opacity: 1
        },
        backgroundMask: {
            composite: "destination-out",
            cover: {
                color: {
                    value: "#fff"
                },
                opacity: 1
            },
            enable: false
        },
        defaultThemes: {},
        delay: 0,
        fullScreen: {
            enable: false,
            zIndex: -1
        },
        detectRetina: true,
        duration: 0,
        fpsLimit: 120,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: {
                    enable: true,
                    mode: "push"
                },
                onDiv: {
                    selectors: [],
                    enable: false,
                    mode: [],
                    type: "circle"
                },
                onHover: {
                    enable: true,
                    mode: "grab",
                    parallax: {
                        enable: true,
                        force: 60,
                        smooth: 10
                    }
                },
                resize: {
                    delay: 0.5,
                    enable: true
                }
            },
            modes: {
                trail: {
                    delay: 1,
                    pauseOnStop: false,
                    quantity: 1
                },
                attract: {
                    distance: 200,
                    duration: 0.4,
                    easing: "ease-out-quad",
                    factor: 1,
                    maxSpeed: 50,
                    speed: 1
                },
                bounce: {
                    distance: 200
                },
                bubble: {
                    distance: 400,
                    duration: 2,
                    mix: false,
                    opacity: 0.8,
                    size: 40,
                    divs: {
                        distance: 200,
                        duration: 0.4,
                        mix: false,
                        selectors: []
                    }
                },
                connect: {
                    distance: 80,
                    links: {
                        opacity: 0.5
                    },
                    radius: 60
                },
                grab: {
                    distance: 400,
                    links: {
                        blink: false,
                        consent: false,
                        opacity: 1
                    }
                },
                push: {
                    default: true,
                    groups: [],
                    quantity: 4
                },
                remove: {
                    quantity: 2
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                    factor: 100,
                    speed: 1,
                    maxSpeed: 50,
                    easing: "ease-out-quad",
                    divs: {
                        distance: 200,
                        duration: 0.4,
                        factor: 100,
                        speed: 1,
                        maxSpeed: 50,
                        easing: "ease-out-quad",
                        selectors: []
                    }
                },
                slow: {
                    factor: 3,
                    radius: 200
                },
                light: {
                    area: {
                        gradient: {
                            start: {
                                value: "#ffffff"
                            },
                            stop: {
                                value: "#000000"
                            }
                        },
                        radius: 1000
                    },
                    shadow: {
                        color: {
                            value: "#000000"
                        },
                        length: 2000
                    }
                }
            }
        },
        particles: {
            bounce: {
                horizontal: {
                    random: {
                        enable: false,
                        minimumValue: 0.1
                    },
                    value: 1
                },
                vertical: {
                    random: {
                        enable: false,
                        minimumValue: 0.1
                    },
                    value: 1
                }
            },
            collisions: {
                absorb: {
                    speed: 2
                },
                bounce: {
                    horizontal: {
                        random: {
                            enable: false,
                            minimumValue: 0.1
                        },
                        value: 1
                    },
                    vertical: {
                        random: {
                            enable: false,
                            minimumValue: 0.1
                        },
                        value: 1
                    }
                },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: {
                    enable: true,
                    retries: 0
                }
            },
            color: {
                value: "#ff0000",
                animation: {
                    h: {
                        count: 0,
                        enable: true,
                        offset: 0,
                        speed: 20,
                        delay: 0,
                        decay: 0,
                        sync: true
                    },
                    s: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        delay: 0,
                        decay: 0,
                        sync: true
                    },
                    l: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        delay: 0,
                        decay: 0,
                        sync: true
                    }
                }
            },
            groups: {},
            move: {
                angle: {
                    offset: 0,
                    value: 90
                },
                attract: {
                    distance: 200,
                    enable: false,
                    rotate: {
                        x: 3000,
                        y: 3000
                    }
                },
                center: {
                    x: 50,
                    y: 50,
                    mode: "percent",
                    radius: 0
                },
                decay: 0,
                distance: {},
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                    acceleration: 9.81,
                    enable: false,
                    inverse: false,
                    maxSpeed: 50
                },
                path: {
                    clamp: true,
                    delay: {
                        random: {
                            enable: false,
                            minimumValue: 0
                        },
                        value: 0
                    },
                    enable: false,
                    options: {}
                },
                outModes: {
                    default: "out",
                    bottom: "out",
                    left: "out",
                    right: "out",
                    top: "out"
                },
                random: false,
                size: false,
                speed: 6,
                spin: {
                    acceleration: 0,
                    enable: false
                },
                straight: false,
                trail: {
                    enable: false,
                    length: 10,
                    fill: {}
                },
                vibrate: false,
                warp: false
            },
            number: {
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080
                },
                limit: 0,
                value: 100
            },
            opacity: {
                random: {
                    enable: true,
                    minimumValue: 0.1
                },
                value: {
                    min: 0.1,
                    max: 0.5
                },
                animation: {
                    count: 0,
                    enable: true,
                    speed: 3,
                    decay: 0,
                    delay: 0,
                    sync: false,
                    mode: "auto",
                    startValue: "random",
                    destroy: "none",
                    minimumValue: 0.1
                }
            },
            reduceDuplicates: false,
            shadow: {
                blur: 0,
                color: {
                    value: "#000"
                },
                enable: false,
                offset: {
                    x: 0,
                    y: 0
                }
            },
            shape: {
                close: true,
                fill: true,
                options: {},
                type: "circle"
            },
            size: {
                random: {
                    enable: true,
                    minimumValue: 1
                },
                value: {
                    min: 0.1,
                    max: 5
                },
                animation: {
                    count: 0,
                    enable: true,
                    speed: 20,
                    decay: 0,
                    delay: 0,
                    sync: false,
                    mode: "auto",
                    startValue: "random",
                    destroy: "none",
                    minimumValue: 0.1
                }
            },
            stroke: {
                width: 0
            },
            zIndex: {
                random: {
                    enable: false,
                    minimumValue: 0
                },
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1
            },
            destroy: {
                bounds: {},
                mode: "none",
                split: {
                    count: 1,
                    factor: {
                        random: {
                            enable: false,
                            minimumValue: 0
                        },
                        value: 3
                    },
                    rate: {
                        random: {
                            enable: false,
                            minimumValue: 0
                        },
                        value: {
                            min: 4,
                            max: 9
                        }
                    },
                    sizeOffset: true
                }
            },
            roll: {
                darken: {
                    enable: false,
                    value: 0
                },
                enable: false,
                enlighten: {
                    enable: false,
                    value: 0
                },
                mode: "vertical",
                speed: 25
            },
            tilt: {
                random: {
                    enable: false,
                    minimumValue: 0
                },
                value: 0,
                animation: {
                    enable: false,
                    speed: 0,
                    decay: 0,
                    sync: false
                },
                direction: "clockwise",
                enable: false
            },
            twinkle: {
                lines: {
                    enable: false,
                    frequency: 0.05,
                    opacity: 1
                },
                particles: {
                    enable: false,
                    frequency: 0.05,
                    opacity: 1
                }
            },
            wobble: {
                distance: 5,
                enable: false,
                speed: {
                    angle: 50,
                    move: 10
                }
            },
            life: {
                count: 0,
                delay: {
                    random: {
                        enable: false,
                        minimumValue: 0
                    },
                    value: 0,
                    sync: false
                },
                duration: {
                    random: {
                        enable: false,
                        minimumValue: 0.0001
                    },
                    value: 0,
                    sync: false
                }
            },
            rotate: {
                random: {
                    enable: false,
                    minimumValue: 0
                },
                value: 0,
                animation: {
                    enable: false,
                    speed: 0,
                    decay: 0,
                    sync: false
                },
                direction: "clockwise",
                path: false
            },
            orbit: {
                animation: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: false
                },
                enable: false,
                opacity: 1,
                rotation: {
                    random: {
                        enable: false,
                        minimumValue: 0
                    },
                    value: 45
                },
                width: 1
            },
            links: {
                blink: false,
                color: {
                    value: "#ffffff"
                },
                consent: false,
                distance: 150,
                enable: true,
                frequency: 1,
                opacity: 0.4,
                shadow: {
                    blur: 5,
                    color: {
                        value: "#000"
                    },
                    enable: false
                },
                triangles: {
                    enable: false,
                    frequency: 1
                },
                width: 1,
                warp: false
            },
            repulse: {
                random: {
                    enable: false,
                    minimumValue: 0
                },
                value: 0,
                enabled: false,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1
            }
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        responsive: [],
        smooth: false,
        style: {},
        themes: [],
        zLayers: 100,
        motion: {
            disable: false,
            reduce: {
                factor: 4,
                value: true
            }
        }
    });
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 1500
                    }
                },
                color: {
                    value: "#00d8ff"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d8ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Loading screen functionality
    const loadingScreen = document.getElementById('loading-screen');
    
    // Header scroll functionality
    const header = document.getElementById('header');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.getElementById('navLinks');
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader();
    
    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    }
    
    // Smooth scrolling and active link highlighting
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        const headerHeight = header.offsetHeight;
        
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Update active link
        updateActiveLink(sectionId);
    }
    
    function updateActiveLink(sectionId) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition <= section.offsetTop + section.offsetHeight
            ) {
                updateActiveLink(section.id);
            }
        });
    });
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
});