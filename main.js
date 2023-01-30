'use strict'

// Make navbar transparent when it is on the top 
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link === null) {
        return;
    } 
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectedNavItem(target);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});


// Navbar menu items activated when scrolling to section
    // 1. Call all section elements
    // 2. Use IntersectionObserver and oberserve all sections
    // 3. Activate all menu items as scrolls to the sections
    const sectionIds = [
        '#home',
        '#direction',
        '#hours',
        '#owners',
    ];

    const sections = sectionIds.map((id) => document.querySelector(id));
    const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));

    let selectedNavIndex = 0;
    let selectedNavItem = navItems[0];
    function selectNavItem(selected) {
        selectedNavItem.classList.remove('active');
        selectedNavItem = selected;
        selectedNavItem.classList.add('active');
    }
    
    function scrollIntoView(selector) {
        const scrollTo = document.querySelector(selector);
        scrollTo.scrollIntoView({behavior:'smooth'});
        selectNavItem(navItems[sectionIds.indexOf(selector)]);
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.intersectionRatio > 0) {
                const index = sectionIds.indexOf(`#${entry.target.id}`);
                if (entry.boundingClientRect.y < 0) {
                    selectedNavIndex = index + 1;
                } else {
                    selectedNavIndex = index - 1;
                }
            }  
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            selectedNavIndex = 0;
        } else if (window.scrollY + window.innerHeight ===
            document.body.scrollHeight
        ) {
            selectedNavIndex = navItems.length - 1;
        }
        selectNavItem(navItems[selectedNavIndex]);
    });