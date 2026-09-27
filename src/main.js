import { createStandaloneApplication } from './standalone/application.js';
import { describeError } from './standalone/errors.js';
import { initNmLanguageAndGuide } from './ui/nmLanguageGuide.js';

// Initialize N&M Studio Bilingual Slice (EN/VN) and Tactical Guide Modal
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNmLanguageAndGuide);
} else {
  initNmLanguageAndGuide();
}

const application = createStandaloneApplication({
  googleApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
  cesiumToken: import.meta.env.CESIUM_ION_TOKEN,
  allowQaRegistration: import.meta.env.DEV,
});

application.start().then(() => {
  // Re-apply language once dynamic UI elements mount
  initNmLanguageAndGuide();
}).catch((error) => {
  console.error("God's Eye View initialization failed:", error);
  const loaderStatus = document.querySelector('#loading-screen .loader-status');
  if (loaderStatus) {
    loaderStatus.textContent = `Error: ${describeError(error)}`;
    loaderStatus.style.color = '#ff4444';
  }
});

export { application };

