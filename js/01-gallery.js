import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

gallery.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));

gallery.addEventListener("click", handleImageClick);

/**
 * * Generates markup for gallery items.
 * @param {object[]} arr Array of gallery objects.
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

function handleImageClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  const gallery = event.target.closest(".gallery");
  const originalImg = event.target.dataset.source;
  const description = event.target.alt;

  console.log(gallery);
  console.log(originalImg);
  console.log(description);
}
