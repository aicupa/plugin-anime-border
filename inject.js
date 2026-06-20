(function () {
  if (window.__ANIME_ATMOSPHERE__) return;
  window.__ANIME_ATMOSPHERE__ = true;

  const ROOT_ID = "anime-atmosphere";

  let current = localStorage.getItem("anime_effect") || "rain";

  function ensureRoot() {
    let root = document.getElementById(ROOT_ID);

    if (!root) {
      root = document.createElement("div");

      root.id = ROOT_ID;

      root.style.cssText = `
        position:fixed;
        inset:0;
        pointer-events:none;
        overflow:hidden;
        z-index:2147483647;
      `;

      document.body.appendChild(root);
    }

    return root;
  }

  function renderRain(root) {
    root.innerHTML = "";

    for (let i = 0; i < 80; i++) {
      const rain = document.createElement("div");

      rain.className = "anime-rain";

      rain.style.left = Math.random() * 100 + "%";

      rain.style.animationDelay = Math.random() * 2 + "s";

      rain.style.animationDuration = 0.8 + Math.random() * 0.6 + "s";

      root.appendChild(rain);
    }
  }

  function renderSakura(root) {
    root.innerHTML = "";

    for (let i = 0; i < 40; i++) {
      const petal = document.createElement("div");

      petal.className = "anime-petal";

      petal.style.left = Math.random() * 100 + "%";

      petal.style.animationDuration = 8 + Math.random() * 8 + "s";

      root.appendChild(petal);
    }
  }

  function renderRipple(root) {
    root.innerHTML = "";

    const ripple = document.createElement("div");

    ripple.className = "anime-water-ripple";

    root.appendChild(ripple);
  }

  function renderGrass(root) {
    root.innerHTML = "";

    const grass = document.createElement("div");

    grass.className = "anime-grass";

    root.appendChild(grass);
  }

  function renderThunder(root) {
    root.innerHTML = "";

    const flash = document.createElement("div");

    flash.className = "anime-thunder";

    root.appendChild(flash);

    renderRain(root);

    setInterval(
      () => {
        flash.animate([{ opacity: 0 }, { opacity: 0.4 }, { opacity: 0 }], {
          duration: 250,
        });
      },
      10000 + Math.random() * 10000,
    );
  }

  function render(type) {
    const root = ensureRoot();

    switch (type) {
      case "sakura":
        renderSakura(root);
        break;

      case "water":
        renderRipple(root);
        break;

      case "grass":
        renderGrass(root);
        break;

      case "thunder":
        renderThunder(root);
        break;

      default:
        renderRain(root);
    }
  }

  const style = document.createElement("style");

  style.textContent = `

.anime-rain{
  position:absolute;
  top:-20px;
  width:1px;
  height:18px;

  background:
    linear-gradient(
      transparent,
      rgba(255,255,255,.5)
    );

  animation:
    animeRain linear infinite;
}

@keyframes animeRain{
  to{
    transform:
      translateY(110vh);
  }
}

.anime-petal{
  position:absolute;

  top:-30px;

  width:10px;
  height:14px;

  background:
    rgba(255,190,220,.8);

  border-radius:
    50% 50% 50% 0;

  animation:
    animePetal linear infinite;
}

@keyframes animePetal{
  to{
    transform:
      translateY(110vh)
      rotate(720deg)
      translateX(80px);
  }
}

.anime-water-ripple{
  position:absolute;
  inset:0;

  background:
    repeating-radial-gradient(
      circle at center,
      rgba(255,255,255,.03) 0px,
      transparent 20px,
      rgba(255,255,255,.02) 40px
    );

  animation:
    ripple 12s linear infinite;
}

@keyframes ripple{
  from{
    transform:scale(1);
  }

  to{
    transform:scale(1.2);
  }
}

.anime-grass{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  height:80px;

  background:
    linear-gradient(
      transparent,
      rgba(80,180,120,.15)
    );

  animation:
    grassWind 4s ease-in-out infinite;
}

@keyframes grassWind{
  50%{
    transform:
      skewX(2deg);
  }
}

.anime-thunder{
  position:absolute;
  inset:0;

  background:white;

  opacity:0;
}

`;

  document.head.appendChild(style);

  render(current);

  window.addEventListener("message", (e) => {
    const msg = e.data;

    if (msg?.type === "plugin-call" && msg?.method === "switchEffect") {
      current = msg.effect;

      localStorage.setItem("anime_effect", current);

      render(current);
    }
  });
})();
