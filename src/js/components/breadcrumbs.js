export default class Breadcrumbs {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(items) {
    if (!this.container) return;

    // items: [{ label: 'Home', url: 'index.html' }, { label: 'Catalog', url: null }]
    this.container.innerHTML = items.map((item) => {
      if (item.url) {
        return `<a href="${item.url}">${item.label}</a>`;
      }
      return `<span>${item.label}</span>`;
    }).join(' > ');
  }
}
