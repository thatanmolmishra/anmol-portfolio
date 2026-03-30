/**
 * block-modal.js
 * Handles zooming a full content block into a centered modal.
 */

export function initBlockModal() {
  const backdrop = document.createElement('div');
  backdrop.className = 'block-modal-backdrop';
  backdrop.innerHTML = `
    <div class="block-modal-container">
      <button class="block-modal-close" aria-label="Close modal">&times;</button>
      <div class="block-modal-content"></div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const container = backdrop.querySelector('.block-modal-container');
  const content = backdrop.querySelector('.block-modal-content');
  const closeBtn = backdrop.querySelector('.block-modal-close');

  const openModal = (element) => {
    // Clear previous content
    content.innerHTML = '';
    
    // Clone the element
    const clone = element.cloneNode(true);
    
    // Remove slider buttons or other interactive elements that might conflict if needed
    // For now, let's keep them and see how it feels.
    
    content.appendChild(clone);
    
    // Force reset any slider logic in the clone if necessary
    // (This might require re-initializing the slider in the clone)
    reinitSlider(clone);
    reinitYoutube(clone);

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    // Stop any playing video in the modal
    content.innerHTML = '';
  };

  // Selectors for blocks that should be zoomable
  const selectors = '.ach-block-card, .yt-card, .news-card, .celeb-card, .cert-card';
  
  document.addEventListener('click', (e) => {
    const target = e.target.closest(selectors);
    if (target && !backdrop.contains(target)) {
      // Don't open if clicking a specific "view more" link unless intended
      // But the user wants the whole block, so let's just go for it.
      openModal(target);
    }
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop || e.target === container) {
      closeModal();
    }
  });

  // Re-init logic for sliders inside the cloned modal
  function reinitSlider(scope) {
    scope.querySelectorAll('.ach-block-slider').forEach(slider => {
      const imagesAttr = slider.dataset.images;
      if (!imagesAttr) return;
      const images = JSON.parse(imagesAttr);
      let cur = 0;
      const img = slider.querySelector('.ach-slide-img');
      const curEl = slider.querySelector('.ach-slide-cur');
      const prevBtn = slider.querySelector('.ach-slide-prev');
      const nextBtn = slider.querySelector('.ach-slide-next');

      const update = () => {
        img.style.opacity = 0;
        setTimeout(() => {
          img.src = images[cur];
          img.style.opacity = 1;
        }, 150);
        if (curEl) curEl.textContent = cur + 1;
      };

      if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); cur = (cur - 1 + images.length) % images.length; update(); });
      if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); cur = (cur + 1) % images.length; update(); });
      
      if (images.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
      }
    });
  }

  // Re-init logic for YouTube play buttons inside the cloned modal
  function reinitYoutube(scope) {
    scope.querySelectorAll('.yt-card').forEach(card => {
      const overlay = card.querySelector('.yt-play-overlay');
      const thumb = card.querySelector('img.yt-thumb');
      const frame = card.querySelector('.yt-embed-frame');
      const iframe = frame ? frame.querySelector('iframe') : null;
      const ytId = card.dataset.ytId;

      if (overlay && iframe) {
        overlay.addEventListener('click', (e) => {
          e.stopPropagation();
          iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
          thumb.style.display = 'none';
          overlay.style.display = 'none';
          frame.style.display = 'block';
        });
      }
    });
  }
}
