/**
 * OLANIYI HOTEL - Interactive JavaScript Architecture
 */

// Configuration Constants
const HOTEL_PHONE_WHATSAPP = "2348000000000"; // Replace with your hotel's official WhatsApp number
const HOTEL_EMAIL = "reservations@olaniyihotel.com"; // Replace with your hotel's official email

// Dynamic Room Dataset
const roomData = [
  {
    id: "std-1",
    cat: "standard",
    title: "Standard Room",
    badge: "Popular",
    desc: "Cozy accommodation equipped with essential modern amenities for a peaceful stay.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
    specs: ["Single/Double Bed", "Air Conditioning", "En-suite Bathroom", "24/7 Power Support"]
  },
  {
    id: "dlx-1",
    cat: "deluxe",
    title: "Deluxe Room",
    badge: "Enhanced Comfort",
    desc: "Spacious layout with modern workspace, high-speed Wi-Fi, and plush interior bedding.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    specs: ["King Size Bed", "Smart TV", "Mini Refrigerator", "High-Speed Wi-Fi"]
  },
  {
    id: "ste-1",
    cat: "suite",
    title: "Executive Suite",
    badge: "Luxury Choice",
    desc: "Premium multi-room suite with an exclusive living section tailored for VIP stays.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    specs: ["Private Lounge", "Super King Bed", "VIP Room Service", "Premium Satellite Channels"]
  }
];

// Amenities Dataset
const amenitiesData = [
  { icon: "⚡", title: "Uninterrupted Power", desc: "Constant standby power backup ensuring zero interruption." },
  { icon: "📶", title: "Complimentary Wi-Fi", desc: "High-speed wireless internet access across room facilities." },
  { icon: "🛡️", title: "Maximum Security", desc: "Continuous CCTV surveillance and trained security staff." },
  { icon: "❄️", title: "Climate Control", desc: "Fully air-conditioned suites and public areas." },
  { icon: "🍽️", title: "On-Site Dining", desc: "Freshly made Nigerian dishes and refreshment beverages." },
  { icon: "🚗", title: "Secure Parking", desc: "Ample, monitored vehicle parking for guests and visitors." }
];

// Gallery Dataset
const galleryItems = [
  { cat: "Rooms", url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80", title: "Standard Suite Interior" },
  { cat: "Exterior", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", title: "Olaniyi Hotel Exterior" },
  { cat: "Dining", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", title: "Restaurant Area" },
  { cat: "Rooms", url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80", title: "Deluxe Bedroom Setup" },
  { cat: "Dining", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", title: "Fresh Culinary Preparation" },
  { cat: "Exterior", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", title: "Lobby & Reception Lounge" }
];

// FAQ Dataset
const faqData = [
  {
    question: "Where is OLANIYI HOTEL located?",
    answer: "OLANIYI HOTEL is located at 1, Ajowa Street, Agbaluku, Arigidi Akoko, Ondo State, Nigeria."
  },
  {
    question: "How do I make a room reservation?",
    answer: "You can reserve directly using the 'Book Stay' button on our website, through direct phone inquiry, or by sending us a message on WhatsApp or Email."
  },
  {
    question: "Is power supply guaranteed 24/7?",
    answer: "Yes, we maintain robust backup generators to ensure uninterrupted electricity for climate control, lighting, and entertainment."
  },
  {
    question: "Does the hotel have food & refreshment services?",
    answer: "Yes, our on-site restaurant serves freshly prepared local delicacies as well as continental meals and cold beverages."
  },
  {
    question: "Is there secure parking for guests?",
    answer: "Yes, we provide spacious and fully secure on-site vehicle parking guarded 24/7."
  }
];

let currentGalleryList = [...galleryItems];
let lbIndex = 0;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  renderRooms('all');
  renderAmenities();
  renderGallery('All');
  renderFAQs();
  bindFormEvents();
});

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show'));
  });
}

// Render Rooms with Filter Tabs
function renderRooms(filter) {
  const container = document.getElementById('rooms-cards-container');
  const filtered = filter === 'all' ? roomData : roomData.filter(r => r.cat === filter);

  container.innerHTML = filtered.map(room => `
    <div class="card room-card">
      <div class="room-thumb">
        <img src="${room.image}" alt="${room.title}" loading="lazy" />
        <span class="room-badge">${room.badge}</span>
      </div>
      <div class="room-body">
        <h3 class="room-title">${room.title}</h3>
        <p class="text-sm text-gray">${room.desc}</p>
        <div class="room-meta">
          <span>✓ Air Conditioned</span>
          <span>✓ En-suite Bath</span>
        </div>
        <div class="room-card-actions">
          <button class="btn btn-navy text-sm" onclick="showRoomDetails('${room.id}')">Details</button>
          <button class="btn btn-orange text-sm" onclick="openReservationModal('${room.title}')">Reserve</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Room Filter Buttons Handler
document.getElementById('room-tabs').addEventListener('click', (e) => {
  if (e.target.classList.contains('tab-btn')) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    renderRooms(e.target.dataset.filter);
  }
});

// Render Amenities
function renderAmenities() {
  const container = document.getElementById('amenities-container');
  container.innerHTML = amenitiesData.map(item => `
    <div class="card bg-navy" style="border:1px solid rgba(255,255,255,0.1)">
      <div style="font-size: 2rem; margin-bottom: 0.5rem">${item.icon}</div>
      <h3 class="text-white font-heading" style="font-size:1.1rem; margin-bottom:0.4rem;">${item.title}</h3>
      <p class="text-gray text-sm">${item.desc}</p>
    </div>
  `).join('');
}

// Render Gallery
function renderGallery(cat) {
  const container = document.getElementById('gallery-container');
  currentGalleryList = cat === 'All' ? galleryItems : galleryItems.filter(g => g.cat === cat);

  container.innerHTML = currentGalleryList.map((item, idx) => `
    <div class="gallery-card" onclick="openLightbox(${idx})">
      <img src="${item.url}" alt="${item.title}" loading="lazy" />
    </div>
  `).join('');
}

document.getElementById('gallery-filters').addEventListener('click', (e) => {
  if (e.target.classList.contains('gal-filter-btn')) {
    document.querySelectorAll('.gal-filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    renderGallery(e.target.dataset.cat);
  }
});

// Render FAQ Accordion
function renderFAQs() {
  const accordion = document.getElementById('faq-accordion');
  accordion.innerHTML = faqData.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <button class="faq-question" onclick="toggleFaq(${index})">
        <span>${faq.question}</span>
        <span class="faq-icon">▼</span>
      </button>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');
}

function toggleFaq(index) {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item, i) => {
    if (i === index) {
      item.classList.toggle('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Lightbox Handler
function openLightbox(index) {
  lbIndex = index;
  updateLightboxContent();
  document.getElementById('gallery-lightbox').classList.add('active');
}

function updateLightboxContent() {
  const item = currentGalleryList[lbIndex];
  document.getElementById('lb-img').src = item.url;
  document.getElementById('lb-caption').innerText = `${item.title} (${item.cat})`;
}

document.getElementById('lb-close').addEventListener('click', () => {
  document.getElementById('gallery-lightbox').classList.remove('active');
});

document.getElementById('lb-prev').addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
  updateLightboxContent();
});

document.getElementById('lb-next').addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % currentGalleryList.length;
  updateLightboxContent();
});

// Room Details Modal
function showRoomDetails(roomId) {
  const room = roomData.find(r => r.id === roomId);
  if (!room) return;

  const modalBody = document.getElementById('room-modal-body');
  modalBody.innerHTML = `
    <img src="${room.image}" alt="${room.title}" style="width:100%; height:220px; object-fit:cover; border-radius:10px; margin-bottom:1rem;" />
    <h3 class="modal-heading">${room.title}</h3>
    <p class="text-sm text-gray mb-4">${room.desc}</p>
    <h4 style="font-size:0.9rem; margin-bottom:0.5rem;">Included Specifications:</h4>
    <ul class="text-sm text-gray" style="padding-left:1.2rem; margin-bottom:1.5rem;">
      ${room.specs.map(spec => `<li>${spec}</li>`).join('')}
    </ul>
    <button class="btn btn-orange w-full" onclick="closeRoomModal(); openReservationModal('${room.title}');">Proceed to Booking</button>
  `;
  document.getElementById('room-detail-modal').classList.add('active');
}

function closeRoomModal() {
  document.getElementById('room-detail-modal').classList.remove('active');
}

document.getElementById('close-room-modal').addEventListener('click', closeRoomModal);

// Booking Modal
function openReservationModal(roomName = '') {
  if (roomName) {
    const select = document.getElementById('res-room-type');
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().includes(roomName.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  document.getElementById('booking-modal').classList.add('active');
}

document.getElementById('close-booking-modal').addEventListener('click', () => {
  document.getElementById('booking-modal').classList.remove('active');
});

document.getElementById('nav-book-btn').addEventListener('click', () => openReservationModal());

// Form Event Bindings for Dual Send (WhatsApp & Gmail)
function bindFormEvents() {
  // Quick Strip Search
  document.getElementById('strip-booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedRoom = document.getElementById('strip-room').value;
    const checkin = document.getElementById('strip-checkin').value;
    const checkout = document.getElementById('strip-checkout').value;
    
    if (checkin) document.getElementById('res-checkin').value = checkin;
    if (checkout) document.getElementById('res-checkout').value = checkout;

    openReservationModal(selectedRoom);
  });

  // Contact Form - WhatsApp Handler
  document.getElementById('btn-send-contact-wa').addEventListener('click', () => {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const msg = document.getElementById('contact-msg').value.trim();

    if (!name || !phone || !msg) {
      alert('Please fill in your Name, Phone Number, and Message.');
      return;
    }

    const waText = `*ENQUIRY - OLANIYI HOTEL*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*Message:* ${msg}`;

    window.open(`https://wa.me/${HOTEL_PHONE_WHATSAPP}?text=${encodeURIComponent(waText)}`, '_blank');
    triggerToast('Opening WhatsApp...');
  });

  // Contact Form - Gmail/Email Handler
  document.getElementById('btn-send-contact-email').addEventListener('click', () => {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const msg = document.getElementById('contact-msg').value.trim();

    if (!name || !email || !msg) {
      alert('Please fill in your Name, Email Address, and Message.');
      return;
    }

    const subject = `Website Enquiry from ${name}`;
    const body = `Hello Olaniyi Hotel,\n\nYou have received a new message via the website contact form:\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${msg}`;

    window.location.href = `mailto:${HOTEL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    triggerToast('Launching email app...');
  });

  // Booking Modal Form - WhatsApp Handler
  document.getElementById('btn-send-res-wa').addEventListener('click', () => {
    const name = document.getElementById('res-name').value.trim();
    const phone = document.getElementById('res-phone').value.trim();
    const email = document.getElementById('res-email').value.trim();
    const checkin = document.getElementById('res-checkin').value;
    const checkout = document.getElementById('res-checkout').value;
    const room = document.getElementById('res-room-type').value;

    if (!name || !phone || !checkin || !checkout) {
      alert('Please complete all required reservation fields.');
      return;
    }

    const waText = `*ROOM RESERVATION REQUEST*\n\n` +
      `*Hotel:* OLANIYI HOTEL (Arigidi Akoko)\n` +
      `*Guest Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*Room Category:* ${room}\n` +
      `*Check-In Date:* ${checkin}\n` +
      `*Check-Out Date:* ${checkout}`;

    document.getElementById('booking-modal').classList.remove('active');
    window.open(`https://wa.me/${HOTEL_PHONE_WHATSAPP}?text=${encodeURIComponent(waText)}`, '_blank');
    triggerToast('Opening WhatsApp with reservation details...');
  });

  // Booking Modal Form - Gmail/Email Handler
  document.getElementById('btn-send-res-email').addEventListener('click', () => {
    const name = document.getElementById('res-name').value.trim();
    const phone = document.getElementById('res-phone').value.trim();
    const email = document.getElementById('res-email').value.trim();
    const checkin = document.getElementById('res-checkin').value;
    const checkout = document.getElementById('res-checkout').value;
    const room = document.getElementById('res-room-type').value;

    if (!name || !email || !checkin || !checkout) {
      alert('Please complete all required reservation fields.');
      return;
    }

    const subject = `Room Reservation Request - ${name}`;
    const body = `Hello Olaniyi Hotel Front Desk,\n\nI would like to reserve accommodation at Olaniyi Hotel, Arigidi Akoko.\n\n` +
      `Guest Name: ${name}\n` +
      `Phone Number: ${phone}\n` +
      `Email Address: ${email}\n` +
      `Selected Room: ${room}\n` +
      `Check-In Date: ${checkin}\n` +
      `Check-Out Date: ${checkout}\n\nPlease confirm availability and details. Thank you!`;

    document.getElementById('booking-modal').classList.remove('active');
    window.location.href = `mailto:${HOTEL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    triggerToast('Launching email app...');
  });
}

// Toast Notifications
function triggerToast(msg) {
  const container = document.getElementById('toast-wrapper');
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerText = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4500);
}
