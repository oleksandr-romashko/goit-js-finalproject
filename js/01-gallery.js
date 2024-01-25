import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
gallery.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));
gallery.addEventListener("click", handleImageClick);

/**
 * * Generates markup for gallery items.
 * @param {object[]} arr Array of gallery item objects.
 * @returns {string} Gallery items markup in text format.
 */
function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`
    )
    .join("");
}

/**
 * * Handles click on gallery item.
 * @param {Event} event Occurred event.
 */
function handleImageClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  const originalImgSource = event.target.dataset.source;
  const description = event.target.alt;

  showModal(originalImgSource, description);

  /**
   * ! Prevents side effect.
   * * When modal window showed, focus stays on gallery item element,
   * * and when `Enter` key is hit, opens a new modal windows above previous one.
   * * Modal windows have `undefiden` label in the middle of a modal window.
   * ? Found answer here: https://stackoverflow.com/a/4075072
   * Alternatively use: event.target.parentNode.blur();
   */
  document.activeElement.blur();
}

/**
 * * Shows modal widnow with imagem.
 * @param {string} imageSource Image link.
 * @param {string} description Image description.
 */
function showModal(imageSource, description) {
  const instance = basicLightbox.create(
    `
      <div class="modal">
        <img class="modal__image" src="${imageSource}" width="1400" height="900" alt=${description}>
      </div>
    `,
    {
      className: "lightbox-modal",
      escapeHandler: null,
      onShow(instance) {
        this.escapeHandler = onEscape.bind(instance);
        document.addEventListener("keydown", this.escapeHandler);
        instance.element().querySelector(".modal").onclick = instance.close;
      },
      onClose() {
        document.removeEventListener("keydown", this.escapeHandler);
        instance.element().removeEventListener("click", this.clickHandler);
      },
    }
  );

  instance.show();
}

/**
 * Handles Escape button event.
 * @param {Event} event Occurred keyboard event.
 * @param {string} event.code Keyboard key code.
 */
function onEscape({ code }) {
  if (code === "Escape") {
    this.close();
  }
}
