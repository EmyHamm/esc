export default function mobileMenu() {
    const container = document.getElementById('mobile-menu-container');
    const menu = document.getElementById('mobile-menu');
    const trigger = document.querySelector('.nav-trigger');
    const nav = document.querySelector('.nav');
    const animatedClass = '--animatable';
    const openClass = '--open';
    const closeKeys = [27];

    return {
        toggle,
    };
    
    function toggle() {
        menu.style.willChange = "opacity";
        container.classList.add(animatedClass);

        if (container.classList.contains(animatedClass) && !container.classList.contains(openClass)) {
            document.body.style.overflowY = 'hidden';
            addEvents();
            build();
        } else {
            document.body.style.overflowY = 'auto';
            addEvents();
            remove();
        }

        menu.style.willChange = 'auto';
    }

    function onTransitionEnd() {
        container.classList.remove(animatedClass);
    }

    function closeKeyHandler(e) {
        if (closeKeys.includes(e.which)) {
            e.preventDefault();
            close();
        }
    }

    function build() {
        trigger.classList.add('is-active');
        container.classList.add(openClass);
        nav.classList.add(openClass);
    }

    function remove() {
        trigger.classList.remove('is-active');
        container.classList.remove(openClass);
        nav.classList.remove(openClass);
    }

    function addEvents() {
        container.addEventListener('transitionend', onTransitionEnd);
    }
}