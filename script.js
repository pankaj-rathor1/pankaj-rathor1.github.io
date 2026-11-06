document.getElementById('year').textContent = new Date().getFullYear();

async function startOrbitAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const outerOrbit = document.querySelector('.orbit-one');
  const innerOrbit = document.querySelector('.orbit-two');
  if (!outerOrbit || !innerOrbit) return;

  try {
    const { animate } = await import('https://cdn.jsdelivr.net/npm/motion@14.10.1/+esm');

    animate(outerOrbit, { rotate: [0, 360] }, {
      duration: 6,
      repeat: Infinity,
      ease: 'linear'
    });
    animate(innerOrbit, { rotate: [0, -360] }, {
      duration: 4,
      repeat: Infinity,
      ease: 'linear'
    });
    document.documentElement.dataset.orbitEngine = 'motion';
  } catch (error) {
    outerOrbit.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
      { duration: 6000, iterations: Infinity, easing: 'linear' }
    );
    innerOrbit.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-360deg)' }],
      { duration: 4000, iterations: Infinity, easing: 'linear' }
    );
    document.documentElement.dataset.orbitEngine = 'web-animations-fallback';
  }
}

startOrbitAnimation();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
