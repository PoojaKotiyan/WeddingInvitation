// ===== Premium opening =====
document.body.classList.add("locked");
const opening = document.getElementById("opening");
const enterBtn = document.getElementById("enterBtn");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

enterBtn.addEventListener("click", () => {
    opening.classList.add("opened");
    setTimeout(() => {
        opening.classList.add("hide");
        document.body.classList.remove("locked");
    }
        , 950);
    bgMusic.play().then(() => {
        musicBtn.textContent = "❚❚";
    }
    ).catch(() => { }
    );
}
);

setTimeout(() => {
    if (!opening.classList.contains("opened")) {
        opening.classList.add("opened");
        setTimeout(() => {
            opening.classList.add("hide");
            document.body.classList.remove("locked");
        }
            , 950);
    }
}
    , 9000);

// ===== Wedding app settings =====
const WEDDING_DATE = new Date("2026-12-06T12:05:00+05:30");

// Replace this with your exact Google Maps share URL when ready.
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Nicchalamakki%20Shree%20Tirumala%20Venkataramana%20Sabhabhavana%20Asarkeri";
document.getElementById("mapBtn").href = MAP_URL;

function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;
    const ids = ["days", "hours", "minutes", "seconds"];
    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = '<div style="grid-column:1/-1;border:0"><strong>♥</strong><span>Today is the day!</span></div>';
        return;
    }
    const values = [Math.floor(diff / 86400000), Math.floor((diff / 3600000) % 24), Math.floor((diff / 60000) % 60), Math.floor((diff / 1000) % 60)];
    ids.forEach((id, i) => document.getElementById(id).textContent = String(values[i]).padStart(2, "0"));
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("shareBtn").addEventListener("click", async () => {
    const text = `     ✨✨ 𝑴𝒂𝒏𝒊𝒌𝒂𝒏𝒏𝒂𝒚𝒂𝒏𝒂𝒎𝒂𝒏𝒆'𝒔 𝑾𝒆𝒅𝒅𝒊𝒏𝒈 𝑰𝒏𝒗𝒊𝒕𝒂𝒕𝒊𝒐𝒏 ✨✨
    
With immense joy and happiness, we cordially invite you & your family to wedding Ceremony of    
 𝐑𝐚𝐠𝐡𝐚𝐯𝐞𝐧𝐝𝐫𝐚 ❤️ 𝐕𝐢𝐝𝐲𝐚 

📅 Date: Sunday, 06 December 2026

📍 Venue: Nichalamakki Shri Tirumala Venkataramana Sabhabhavan, Asarkeri

🕒 Muhurtham: 12-05 PM

Your presence and blessings will make our special day even more memorable! ❤️

🙏 We look forward to celebrating with you! 🙏

✨ 𝐂𝐥𝐢𝐜𝐤 𝐭𝐡𝐞 𝐥𝐢𝐧𝐤 𝐛𝐞𝐥𝐨𝐰 𝐭𝐨 𝐯𝐢𝐞𝐰 𝐨𝐮𝐫 𝐰𝐞𝐝𝐝𝐢𝐧𝐠 𝐢𝐧𝐯𝐢𝐭𝐚𝐭𝐢𝐨𝐧! ❤️
`;
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Raghavendra & Vidya — Wedding Invitation",
                text,
                url: location.href
            });
        } catch (e) { }
    } else {
        window.open("https://wa.me/?text=" + encodeURIComponent(text + " " + location.href), "_blank");
    }
}
);

document.getElementById("musicBtn").addEventListener("click", () => {
    const audio = document.getElementById("bgMusic");
    if (audio.paused) {
        audio.play().catch(() => { }
        );
        musicBtn.textContent = "❚❚";
    } else {
        audio.pause();
        musicBtn.textContent = "♫";
    }
}
);
