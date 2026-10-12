/**
 * Mobile-Readiness & Host Container Adapter
 * Lightweight, zero-dependency layer for future mobile application & WebView compatibility.
 * 
 * Capabilities:
 * - Detects touch pointers, standalone PWA display mode, and native WebView shells.
 * - Handles viewport height & safe-area dynamic adjustments.
 * - Provides bidirectional message dispatcher for future native iOS/Android hosts.
 */

/**
 * Dispatch an event or message to a host mobile application container (if embedded).
 * Gracefully no-ops in standard desktop and browser environments.
 * 
 * @param {string} type - Event identifier (e.g. 'THEME_CHANGED', 'NAVIGATED')
 * @param {object} payload - Optional event metadata
 */
export function postMessageToHostApp(type, payload = {}) {
  if (typeof window === 'undefined') return;

  const message = {
    source: 'sahith-portfolio-web',
    type,
    payload,
    timestamp: Date.now()
  };

  try {
    // 1. React Native WebView container
    if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
      return;
    }

    // 2. iOS WKWebView native message handlers
    if (window.webkit?.messageHandlers?.hostApp?.postMessage) {
      window.webkit.messageHandlers.hostApp.postMessage(message);
      return;
    }

    // 3. Android native JavascriptInterface bridge
    if (window.AndroidHost?.postMessage) {
      window.AndroidHost.postMessage(JSON.stringify(message));
      return;
    }

    // 4. Standard iframe / embedded parent window
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(message, '*');
    }
  } catch (err) {
    // Non-fatal: container dispatch suppressed
  }
}

/**
 * Initializes mobile and host-shell readiness adapters.
 * Returns a cleanup function for React component lifecycle.
 */
export function initMobileReadiness() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const root = document.documentElement;

  // 1. Detect Touch Device Capabilities non-invasively
  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;

  root.setAttribute('data-touch-device', isTouchDevice ? 'true' : 'false');

  // 2. Detect Host Container / Standalone Display Mode
  const isStandalone =
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;

  const isWebView = Boolean(
    window.ReactNativeWebView ||
    window.webkit?.messageHandlers?.hostApp ||
    window.AndroidHost ||
    isStandalone
  );

  root.setAttribute('data-webview-container', isWebView ? 'true' : 'false');

  // 3. Dynamic Viewport Sizing Token (addresses mobile browser URL-bar collapse)
  const updateViewportHeightToken = () => {
    const vh = window.innerHeight * 0.01;
    root.style.setProperty('--vh', `${vh}px`);
  };

  updateViewportHeightToken();
  window.addEventListener('resize', updateViewportHeightToken, { passive: true });
  window.addEventListener('orientationchange', updateViewportHeightToken, { passive: true });

  // 4. Inbound Host Container Message Handler (allows host app to trigger navigation or theme)
  const handleHostMessage = (event) => {
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (!data || typeof data !== 'object') return;

      // Host Command: Set Theme
      if (data.type === 'HOST_SET_THEME' && (data.theme === 'light' || data.theme === 'dark')) {
        root.setAttribute('data-theme', data.theme);
        try {
          localStorage.setItem('portfolio-theme', data.theme);
        } catch (e) {}
      }

      // Host Command: Scroll to Section
      if (data.type === 'HOST_NAVIGATE_SECTION' && data.sectionId) {
        const targetId = data.sectionId.replace(/^#/, '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } catch (e) {
      // Ignored for foreign/untrusted messages
    }
  };

  window.addEventListener('message', handleHostMessage);

  // Notify potential host that portfolio web view is initialized
  postMessageToHostApp('PORTFOLIO_READY', {
    theme: root.getAttribute('data-theme') || 'dark',
    touchDevice: isTouchDevice,
    standalone: isStandalone
  });

  // Return lifecycle cleanup function
  return () => {
    window.removeEventListener('resize', updateViewportHeightToken);
    window.removeEventListener('orientationchange', updateViewportHeightToken);
    window.removeEventListener('message', handleHostMessage);
  };
}
