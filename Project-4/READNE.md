# 📸 CSS Photo Gallery Documentation

Welcome to the **CSS Photo Gallery** project! This documentation provides a step-by-step guide to setting up and using the gallery. 🚀

---

## 🛠️ **Setup Instructions**

### 1. **Folder Structure**

Here’s the folder structure for the project:

css-photo-gallery/
├── index.html
├── styles/
│ ├── styles.css
│ └── animations.css
├── scripts/
│ └── script.js
├── images/
│ ├── nature1.jpg
│ ├── city1.jpg
│ ├── animal1.jpg
│ └── ...

# CSS Photo Gallery Project Structure

## Root Directory

- **css-photo-gallery/**
  - `index.html` - Main HTML file for the gallery

## Styles

- **styles/**
  - `styles.css` - Main CSS file for styling the gallery
  - `animations.css` - CSS file for animations (e.g., hover effects)

## Scripts

- **scripts/**
  - `script.js` - JavaScript file for gallery functionality

## Images

- **images/**
  - `nature1.jpg` - Sample nature image
  - `city1.jpg` - Sample city image
  - `animal1.jpg` - Sample animal image
  - `...` - Add more images as needed

---

### 2. **Installation**

1. **Download the Project**: Clone or download the project to your local machine.
2. **Open in Browser**: Open the `index.html` file in your browser to view the gallery.

---

## 🎨 **Key Features**

### 1. **Responsive Grid Layout**

- 🌐 The gallery uses a **CSS Grid** layout to display images.
- 🖼️ Images are organized in a grid that adapts to different screen sizes (desktop, tablet, mobile).

### 2. **Lightbox Functionality**

- 🔍 Click on any image to view it in a **lightbox**.
- 🖼️ The lightbox displays the image in a larger view with a dark overlay.

### 3. **Search and Filter**

- 🔍 Use the **search bar** to filter images by caption.
- 🏷️ Use the **category buttons** to filter images by category (e.g., nature, city, animals).

### 4. **Dark Mode**

- 🌙 Toggle between **light** and **dark themes** using the "Dark Mode" button.

---

## 🖼️ **Adding Images**

### 1. **Static Images**

- Place your images in the `images/` folder.
- Use the naming convention: `${category}${number}.jpg` (e.g., `nature1.jpg`, `city2.jpg`).
- Add the image references in the `index.html` file:
  ```html
  <div class="gallery-item" data-category="nature">
    <img src="images/nature1.jpg" alt="Nature Image 1" loading="lazy" />
    <div class="caption">Nature Image 1</div>
  </div>
  ```

---

## 🛠️ **Customization**

### 1. **Adding More Categories**

- Add more categories by updating the `categories` array in `script.js`:
  ```javascript
  const categories = ["nature", "city", "animals", "new-category"];
  ```

### 2. **Changing Styles**

- Edit `styles.css` to customize the gallery's appearance (e.g., colors, spacing, fonts).
- Add animations in `animations.css` for hover effects or transitions.

### 3. **Modifying Lightbox**

- Customize the lightbox styles in `styles.css` under the `.lightbox` class.

---

## 🚀 **How to Run**

1. Open the `index.html` file in your browser.
2. Use the **search bar** to filter images by caption.
3. Use the **category buttons** to filter images by category.
4. Click on any image to view it in the **lightbox**.
5. Toggle between **light** and **dark themes** using the "Dark Mode" button.

---

## 🐛 **Troubleshooting**

### 1. **Images Not Loading**

- Ensure the images are placed in the `images/` folder.
- Check the browser console for errors.

### 2. **Lightbox Not Working**

- Ensure the `openLightbox` function is correctly defined in `script.js`.

### 3. **Search or Filter Not Working**

- Check the `filterImages` and `filterByCategory` functions in `script.js`.

---

Enjoy building and customizing your CSS Photo Gallery! 🎉 If you have any questions, feel free to ask. 😊
