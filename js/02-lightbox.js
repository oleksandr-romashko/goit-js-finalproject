import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
gallery.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));

let lightbox = new SimpleLightbox(".gallery a", {
  /* options */
});

lightbox.on("show.simplelightbox", function () {
  // do something…
});

lightbox.on("error.simplelightbox", function (error) {
  console.log(error);
});

/**
 * * Generates markup of gallery items.
 * @param {object[]} objArr Array of gallery item objects.
 * @returns {string} Gallery items markup in text format.
 */
function createMarkup(objArr) {
  return objArr
    .map(
      ({ preview, original, description }) => `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}">
          </a>
        </li>
      `
    )
    .join("");
}
