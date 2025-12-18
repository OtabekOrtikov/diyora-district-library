// SCSS is compiled separately, no import here

document.addEventListener('DOMContentLoaded', () => {
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
