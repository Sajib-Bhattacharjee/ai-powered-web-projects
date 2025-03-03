document.addEventListener("DOMContentLoaded", () => {
  if (typeof marked === "undefined") {
    showError("Markdown parser not loaded!");
    return;
  }

  // Configure marked
  marked.setOptions({
    breaks: true,
    highlight: (code) => hljs.highlightAuto(code).value,
  });

  // Elements
  const elements = {
    editor: document.getElementById("editor"),
    preview: document.getElementById("preview"),
    themeToggle: document.getElementById("themeToggle"),
    wordCount: document.getElementById("wordCount"),
    statusIndicator: document.getElementById("statusIndicator"),
  };

  // Default content
  const defaultContent = `# Welcome!
## Start writing Markdown...

**Features:**
- Real-time preview
- Dark/Light themes
- Word count
- Mobile-friendly
- Syntax highlighting

\`\`\`javascript
function greeting() {
    console.log('Hello Markdown!');
}
\`\`\`

[Learn Markdown](https://www.markdownguide.org)`;

  // Initialize app
  initialize();

  function initialize() {
    loadContent();
    setupEventListeners();
    setupMobileHeight();
    updateStatus("Ready");
  }

  function loadContent() {
    elements.editor.value = localStorage.getItem("mdContent") || defaultContent;
    updatePreview();
    applyTheme(localStorage.getItem("theme") || "light");
  }

  function setupEventListeners() {
    elements.editor.addEventListener("input", handleInput);
    elements.themeToggle.addEventListener("click", toggleTheme);
    window.addEventListener("resize", handleResize);
  }

  function handleInput() {
    updatePreview();
    debounce(saveContent, 500)();
    updateWordCount();
  }

  function updatePreview() {
    try {
      elements.preview.innerHTML = marked.parse(elements.editor.value);
      updateStatus("Preview updated");
    } catch (error) {
      showError("Error parsing Markdown");
    }
  }

  function toggleTheme() {
    const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    elements.themeToggle.textContent =
      newTheme === "dark" ? "🌞 Light" : "🌙 Dark";
  }

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
  }

  function updateWordCount() {
    const words = elements.editor.value.trim().split(/\s+/).length;
    elements.wordCount.textContent =
      elements.editor.value.trim() === "" ? 0 : words;
  }

  function saveContent() {
    localStorage.setItem("mdContent", elements.editor.value);
    updateStatus("Saved");
  }

  function updateStatus(message) {
    elements.statusIndicator.textContent = message;
    setTimeout(() => (elements.statusIndicator.textContent = ""), 2000);
  }

  function setupMobileHeight() {
    const setHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", setHeight);
    setHeight();
  }

  function handleResize() {
    updateStatus(`Screen: ${window.innerWidth}px`);
  }

  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function showError(message) {
    console.error(message);
    elements.preview.innerHTML = `<div class="error">${message}</div>`;
  }
});
