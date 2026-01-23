/**
 * Text Reveal Animation
 * Animates text word-by-word when scrolling into view
 * Uses Intersection Observer for performance
 */

function wrapWordsInSpans(element: HTMLElement): void {
  // Create a document fragment to build the new content
  const fragment = document.createDocumentFragment();

  // Process each child node
  const childNodes = Array.from(element.childNodes);

  childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Text node - split into words
      const text = node.textContent || '';
      const words = text.split(/(\s+)/);

      words.forEach((word) => {
        if (/^\s+$/.test(word)) {
          // Preserve whitespace
          fragment.appendChild(document.createTextNode(word));
        } else if (word) {
          // Wrap word in spans
          const wrapper = document.createElement('span');
          wrapper.className = 'text-reveal-word';
          const inner = document.createElement('span');
          inner.textContent = word;
          wrapper.appendChild(inner);
          fragment.appendChild(wrapper);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Element node (like <br>) - keep as is
      fragment.appendChild(node.cloneNode(true));
    }
  });

  // Replace content
  element.textContent = '';
  element.appendChild(fragment);
}

function initTextReveal(): void {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const textElements = document.querySelectorAll<HTMLElement>('.text-reveal');

  textElements.forEach((element) => {
    // Skip if already processed
    if (element.dataset.processed === 'true') return;
    element.dataset.processed = 'true';

    // Wrap words in spans using safe DOM methods
    wrapWordsInSpans(element);

    // If reduced motion, show immediately
    if (prefersReducedMotion) {
      element.classList.add('is-visible');
      return;
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add slight delay for smoother experience
            requestAnimationFrame(() => {
              entry.target.classList.add('is-visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTextReveal);
} else {
  initTextReveal();
}

// Re-initialize on page navigation (Astro View Transitions)
document.addEventListener('astro:page-load', initTextReveal);
