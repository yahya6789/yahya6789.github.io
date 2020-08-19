/**
 * Smooth scroll and scroll spy in Bulma
 * https://mybyways.com/blog/single-page-bulma-template-with-smooth-scroll-and-scroll-spy-javascript
 */
const navItems = document.getElementById('mainNavbar').firstElementChild.children
navSections = new Array(navItems.length)
for (i = 0; i < navItems.length; i++)
    navSections[i] = document.getElementById(navItems[i].dataset.target)

const navbarHeight = document.getElementById('mainNavbar').offsetHeight

function isVisible(el) {
    const r = el.getBoundingClientRect();
    const h = (window.innerHeight || document.documentElement.clientHeight);
    const w = (window.innerWidth || document.documentElement.clientWidth);
    return (r.top <= h) && (r.top + r.height - menuBarHeight >= 0) && (r.left <= h) && (r.left + r.width >= 0);
}

function activateIfVisible() {
    for (b = true, i = 0; i < navItems.length; i++) {
        if (b && isVisible(navSections[i])) {
            navItems[i].classList.add('is-active');
            b = false;
        } else
            navItems[i].classList.remove('is-active');
    }
}

var isTicking = null;
window.addEventListener('scroll', () => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            activateIfVisible();
            isTicking = false;
        });
        isTicking = true;
    }
}, false);

for (item of navItems) {
    item.addEventListener('click', e => {
        e.preventDefault();
        window.scroll({
            behavior: 'smooth', left: 0,
            top: document.getElementById(e.target.dataset.target).getBoundingClientRect().top + window.scrollY
        });
    });
}