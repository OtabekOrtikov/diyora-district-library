import ApiClient from '../api/client.js';
import Breadcrumbs from '../components/breadcrumbs.js';

export default async function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const emptyState = document.getElementById('galleryEmpty');
  const breadcrumbs = new Breadcrumbs('breadcrumbs');

  breadcrumbs.render([
    { label: 'Home', url: 'index.html' },
    { label: 'Gallery', url: null },
  ]);

  try {
    const images = await ApiClient.get('/gallery');

    if (!images || images.length === 0) {
      grid.innerHTML = '';
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    grid.innerHTML = images.map((img) => `
      <div class="gallery__item">
        <img 
          class="gallery__img"
          src="${img.url}" 
          alt="${img.caption || 'Gallery Image'}" 
          loading="lazy"
          onerror="this.onerror=null; this.src='https://placehold.co/300x300?text=Image+Not+Found';"
        >
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load gallery', error);
    grid.innerHTML = '';
    emptyState.textContent = 'Failed to load images. Please try again later.';
    emptyState.hidden = false;
  }
}
