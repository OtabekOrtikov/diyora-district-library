import ApiClient from '../api/client.js';
import Slider from '../components/slider.js';

export default async function initHome() {
  console.log('Home page initialized');

  // Initialize Slider
  const sliderImages = [
    { url: 'https://picsum.photos/id/1/1200/400', caption: 'Welcome to District Library' },
    { url: 'https://picsum.photos/id/2/1200/400', caption: 'Explore Our Collections' },
    { url: 'https://picsum.photos/id/3/1200/400', caption: 'Join Our Reading Clubs' },
  ];
  // eslint-disable-next-line no-unused-vars
  const slider = new Slider('slider', sliderImages);

  // Load Announcements
  try {
    const data = await ApiClient.get('/announcements');
    const list = document.getElementById('announcements-list');

    if (data.length === 0) {
      list.innerHTML = '<p>No announcements at this time.</p>';
      return;
    }

    list.innerHTML = data.map((item) => `
      <article class="announcement">
        <h3>${item.title}</h3>
        <p class="date">${item.date}</p>
        <p>${item.text}</p>
      </article>
    `).join('');
  } catch (error) {
    console.error('Failed to load announcements', error);
    document.getElementById('announcements-list').innerHTML = '<p>Error loading announcements.</p>';
  }
}
