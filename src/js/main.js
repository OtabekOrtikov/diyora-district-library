// SCSS is compiled separately, no import here

import NavDropdown from './components/navDropdown.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Navigation Dropdown
    new NavDropdown();

    const page = document.body.dataset.page;
    if (page) {
        import(`./pages/${page}.js`)
            .then((module) => {
                if (module.default) {
                    module.default();
                }
            })
            .catch((err) => {
                console.error(`Failed to load script for page: ${page}`, err);
            });
    }
});
