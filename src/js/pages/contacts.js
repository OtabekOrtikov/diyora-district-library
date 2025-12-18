/* global L */
import ApiClient from '../api/client.js';
import Breadcrumbs from '../components/breadcrumbs.js';

export default async function initContacts() {
  console.log('Contacts page initialized');

  const infoContainer = document.getElementById('contact-info');
  const breadcrumbs = new Breadcrumbs('breadcrumbs');

  breadcrumbs.render([
    { label: 'Home', url: 'index.html' },
    { label: 'Contacts', url: null },
  ]);

  try {
    const contactsData = await ApiClient.get('/contacts');
    const contact = contactsData[0]; // Assuming single contact object or array

    if (!contact) {
      infoContainer.innerHTML = '<p>Contact info not available.</p>';
      return;
    }

    renderContactInfo(contact);
    initMap(contact);
  } catch (error) {
    console.error('Failed to load contacts', error);
    infoContainer.innerHTML = '<p>Error loading contact info.</p>';
  }

  function renderContactInfo(contact) {
    infoContainer.innerHTML = `
      <div class="contact-item">
        <h3>Address</h3>
        <p>${contact.address}</p>
      </div>
      <div class="contact-item">
        <h3>Phone</h3>
        <p><a href="tel:${contact.phone}">${contact.phone}</a></p>
      </div>
      <div class="contact-item">
        <h3>Email</h3>
        <p><a href="mailto:${contact.email}">${contact.email}</a></p>
      </div>
    `;
  }

  function initMap(contact) {
    if (!window.L) {
      console.error('Leaflet not loaded');
      return;
    }

    const map = L.map('map').setView([contact.lat, contact.lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([contact.lat, contact.lng]).addTo(map)
      .bindPopup('District Library')
      .openPopup();
  }
}
