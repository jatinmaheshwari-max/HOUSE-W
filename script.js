/* ==========================================================================
   INDIAN HOUSEWARMING (GRIHA PRAVESH) INVITATION JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Dismiss preloader after 3.5 seconds
    setTimeout(() => {
        dismissPreloader();
    }, 3500);

    loadSavedData();
});

// Preloader Dismiss
function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }
}

// Theme Dropdown Toggle
function toggleThemeMenu() {
    const menu = document.getElementById('themeMenu');
    if (menu) menu.classList.toggle('hidden');
}

// Set Theme (Peacock, Maroon, Ivory)
function setTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    localStorage.setItem('griha_theme', themeName);
    const menu = document.getElementById('themeMenu');
    if (menu) menu.classList.add('hidden');
}

// Audio Toggle
let isPlayingAudio = false;
function toggleAudio() {
    const audio = document.getElementById('bgAudio');
    const btnText = document.querySelector('#musicToggleBtn .btn-text');
    if (!audio) return;

    if (isPlayingAudio) {
        audio.pause();
        isPlayingAudio = false;
        if (btnText) btnText.textContent = 'Music Off';
    } else {
        audio.play().then(() => {
            isPlayingAudio = true;
            if (btnText) btnText.textContent = 'Music On 🎵';
        }).catch(err => {
            alert('Tap screen again to allow background music playback.');
        });
    }
}

// Customize Family Name
function editHostName() {
    const currentName = document.getElementById('hostFamilyName').textContent;
    document.getElementById('newFamilyInput').value = currentName;
    document.getElementById('editNameModal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editNameModal').classList.add('hidden');
}

function saveFamilyName() {
    const newName = document.getElementById('newFamilyInput').value.trim();
    if (newName) {
        document.getElementById('hostFamilyName').textContent = newName;
        localStorage.setItem('griha_family_name', newName);
    }
    closeEditModal();
}

// RSVP Modal Logic
let currentAttendingState = true;

function openRsvpModal(isAttending) {
    currentAttendingState = isAttending;
    const modal = document.getElementById('rsvpModal');
    const title = document.getElementById('modalTitle');
    const attendingFields = document.getElementById('attendingFields');

    if (isAttending) {
        title.textContent = '✅ Confirm Attendance';
        attendingFields.style.display = 'block';
    } else {
        title.textContent = '✉️ Send Regrets / Warm Wishes';
        attendingFields.style.display = 'none';
    }

    modal.classList.remove('hidden');
}

function closeRsvpModal() {
    document.getElementById('rsvpModal').classList.add('hidden');
}

function handleRsvpSubmit(event) {
    event.preventDefault();
    const guestName = document.getElementById('guestName').value.trim();
    const guestCount = document.getElementById('guestCount').value;
    const dietPref = document.getElementById('dietPref').value;
    const guestMessage = document.getElementById('guestMessage').value.trim();

    if (!guestName) return;

    const rsvpData = {
        name: guestName,
        attending: currentAttendingState,
        count: currentAttendingState ? guestCount : 0,
        diet: currentAttendingState ? dietPref : 'N/A',
        message: guestMessage,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('griha_user_rsvp', JSON.stringify(rsvpData));
    closeRsvpModal();
    updateRsvpDisplay(rsvpData);

    alert(`Thank you ${guestName}! Your RSVP response has been received.`);
}

function updateRsvpDisplay(rsvp) {
    const box = document.getElementById('rsvpResponseBox');
    if (!box) return;

    if (rsvp.attending) {
        box.innerHTML = `
            <div style="background: rgba(46, 139, 87, 0.25); border: 1px solid #4CAF50; padding: 12px; border-radius: 12px; color: #FFF;">
                <p style="font-weight: 700; color: #FFE58F;">🎉 Response Saved: Attending!</p>
                <p style="font-size: 0.8rem; margin-top: 4px;">Guests: ${rsvp.count} | Menu: ${rsvp.diet}</p>
                <button onclick="openRsvpModal(true)" style="background:none; border:none; color:#FFE58F; text-decoration:underline; font-size:0.75rem; cursor:pointer; margin-top:6px;">Update Response</button>
            </div>
        `;
    } else {
        box.innerHTML = `
            <div style="background: rgba(225, 112, 85, 0.2); border: 1px solid #e17055; padding: 12px; border-radius: 12px; color: #FFF;">
                <p style="font-weight: 700; color: #FFD700;">✉️ Response Saved: Unable to Attend</p>
                <button onclick="openRsvpModal(true)" style="background:none; border:none; color:#FFE58F; text-decoration:underline; font-size:0.75rem; cursor:pointer; margin-top:6px;">Change to Attending</button>
            </div>
        `;
    }
}

// Add to Calendar
function addToCalendar() {
    const title = encodeURIComponent('Griha Pravesh & Vastu Shanti - The Aggarwal Family');
    const details = encodeURIComponent('Cordially inviting you for Vastu Shanti Puja (10:30 AM), Maha Aarti (12:30 PM), and Griha Pravesh Dinner Feast (6:30 PM Onwards).');
    const location = encodeURIComponent('The Serene Haven, Villa A-45, Emerald Greens Layout, Bengaluru');
    
    const startDate = '20241124T050000Z';
    const endDate = '20241124T153000Z';

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
}

// WhatsApp Share
function shareOnWhatsApp() {
    const family = document.getElementById('hostFamilyName').textContent;
    const text = encodeURIComponent(
        `🏡 *GRIHA PRAVESH & VASTU SHANTI INVITATION*\n\n` +
        `*${family}* cordially invites you and your family to celebrate the auspicious opening of our new home!\n\n` +
        `📅 *Date:* Sunday, 24th November 2024\n` +
        `⏰ *Timings:*\n` +
        `• 10:30 AM - Vastu Shanti Puja\n` +
        `• 12:30 PM - Maha Aarti\n` +
        `• 06:30 PM - Griha Pravesh Dinner\n\n` +
        `📍 *Venue:* The Serene Haven, Villa A-45, Emerald Greens, Bengaluru\n\n` +
        `We eagerly look forward to seeing you!`
    );

    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// Load Saved Preferences
function loadSavedData() {
    const savedTheme = localStorage.getItem('griha_theme');
    if (savedTheme) setTheme(savedTheme);

    const savedFamily = localStorage.getItem('griha_family_name');
    if (savedFamily) document.getElementById('hostFamilyName').textContent = savedFamily;

    const savedRsvp = localStorage.getItem('griha_user_rsvp');
    if (savedRsvp) {
        try { updateRsvpDisplay(JSON.parse(savedRsvp)); } catch(e) {}
    }
}