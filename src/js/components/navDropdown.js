export default class NavDropdown {
    constructor() {
        this.dropdowns = document.querySelectorAll('.nav__item--has-submenu');
        this.init();
    }

    init() {
        this.dropdowns.forEach((dropdown) => {
            const link = dropdown.querySelector('.nav__link--submenu');
            const submenu = dropdown.querySelector('.nav__submenu');

            if (!link || !submenu) return;

            // Toggle on click
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle(dropdown, link, submenu);
            });

            // Close on Escape
            dropdown.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.close(dropdown, link, submenu);
                }
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            this.dropdowns.forEach((dropdown) => {
                if (!dropdown.contains(e.target)) {
                    const link = dropdown.querySelector('.nav__link--submenu');
                    const submenu = dropdown.querySelector('.nav__submenu');
                    if (link && submenu) {
                        this.close(dropdown, link, submenu);
                    }
                }
            });
        });
    }

    toggle(dropdown, link, submenu) {
        const isExpanded = link.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            this.close(dropdown, link, submenu);
        } else {
            this.open(dropdown, link, submenu);
        }
    }

    open(dropdown, link, submenu) {
        // Close others first
        this.dropdowns.forEach((d) => {
            if (d !== dropdown) {
                const l = d.querySelector('.nav__link--submenu');
                const s = d.querySelector('.nav__submenu');
                if (l && s) this.close(d, l, s);
            }
        });

        dropdown.classList.add('nav__item--open');
        link.setAttribute('aria-expanded', 'true');
        submenu.hidden = false; // eslint-disable-line no-param-reassign
    }

    // eslint-disable-next-line class-methods-use-this
    close(dropdown, link, submenu) {
        dropdown.classList.remove('nav__item--open');
        link.setAttribute('aria-expanded', 'false');
        submenu.hidden = true; // eslint-disable-line no-param-reassign
    }
}
