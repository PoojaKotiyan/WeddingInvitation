const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");

// Change this to your actual wedding date and local time.
// India Standard Time is UTC+05:30.
const weddingDate = new Date("2026-12-06T12:30:00+05:30");

// Replace this with the exact Google Maps share link for your venue.
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Nicchalamakki Shree Tirumala Venkataramana Sabhabhavana");

document.getElementById("mapLink").href = mapUrl;

// Open the invitation
openBtn.addEventListener("click", async () => {
  invitation.classList.remove("hidden");

  // Trigger the cover animation
  requestAnimationFrame(() => {
    cover.classList.add("closed");
  });

  // Browsers generally require a user interaction to start audio.
  try {
    await music.play();
    musicBtn.textContent = "♫";
  } catch (error) {
    console.log("Tap the music button to start playback.");
  }

  // Allow the page to scroll after the opening animation
  setTimeout(() => {
    cover.style.display = "none";
  }, 1100);
});

// Music play/pause
musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "♫";
    } catch (error) {
      console.log("Music could not be played.", error);
    }
  } else {
    music.pause();
    musicBtn.textContent = "♪";
  }
});

// Wedding countdown
function updateCountdown() {
  const now = new Date();
  const remaining = weddingDate.getTime() - now.getTime();

  if (remaining <= 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
    return;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (remaining / (1000 * 60)) % 60
  );
  const seconds = Math.floor((remaining / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Share the invitation
document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: "Wedding Invitation",
    text: "You're invited to celebrate the wedding of Raghavendra & Vidya!",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert("Invitation link copied!");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      alert("Please copy the website link from your browser.");
    }
  }
});
