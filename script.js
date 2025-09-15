// =============================
// Unlock audio on first user interaction
// =============================
function unlockAudio() {
  // Short sound effects
  const shortSounds = ["typeSound", "clickSound", "slideSound", "glitchSound"];
  shortSounds.forEach(id => {
    const sound = document.getElementById(id);
    if (sound) {
      sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
      }).catch(() => {});
    }
  });

  // Ambient sound – play continuously
  const ambient = document.getElementById("ambientSound");
  if (ambient) {
    ambient.volume = 0.2; // set ambient sound volume
    ambient.play().catch(() => {});
  }

  document.removeEventListener("click", unlockAudio);
  document.removeEventListener("keydown", unlockAudio);
}
document.addEventListener("click", unlockAudio);
document.addEventListener("keydown", unlockAudio);

// =============================
// Helper: Play sound safely (prevent overlap)
// =============================
function playSound(id, volume = 1.0) {
  const sound = document.getElementById(id);
  if (sound) {
    sound.pause(); // stop if already playing
    sound.currentTime = 0;
    sound.volume = volume; 
    sound.play().catch(() => {});
  }
}

// =============================
// Typing Effect with Robotic Sound
// =============================
const texts = ["🚀 Software Developer", "🔬 Innovator", "🌌 Future Scientist"];
let i = 0, j = 0;
const typing = document.getElementById("typing");

function type() {
  if (j < texts[i].length) {
    typing.textContent += texts[i][j];
    j++;
    playSound("typeSound", 0.4); // softer robotic tick
    setTimeout(type, 90);
  } else {
    setTimeout(() => {
      typing.textContent = "";
      j = 0;
      i = (i + 1) % texts.length;
      type();
    }, 1500);
  }
}
type();

// =============================
// Particle Background
// =============================
const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1,
    size: 2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "cyan";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    // Draw connections
    particles.forEach(other => {
      let dist = Math.hypot(p.x - other.x, p.y - other.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = "rgba(0,255,255,0.2)";
        ctx.stroke();
      }
    });

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// =============================
// Robotic Sound Effects
// =============================

// Click sound (buttons/links only, not every click)
document.querySelectorAll("a, .btn-glow").forEach(el => {
  el.addEventListener("click", () => playSound("clickSound", 0.6));
});

// Scroll sound (trigger every ~250px)
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (Math.abs(currentScroll - lastScroll) > 250) {
    playSound("slideSound", 0.5);
    lastScroll = currentScroll;
  }
});

// Hover glitch sound (gentle futuristic zap)
document.querySelectorAll("a, .btn-glow, .card-glow").forEach(el => {
  el.addEventListener("mouseenter", () => playSound("glitchSound", 0.3));
});

// Dashboard pannel Selection sound
//Hover effect for pannels
document.querySelectorAll(".panel").forEach(panel => {
  panel.addEventListener("mouseenter", () => playSound("clickSound", 0.4));
  // Optional: play sound on click as well
  panel.addEventListener("click", () => playSound("clickSound", 0.5));
});