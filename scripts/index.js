const initialCards = [
    {
        name: "Val Thorens",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
    {
        name: "Restaurant terrace",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    },
    {
        name: "An outdoor cafe",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
    {
        name: "A very long bridge, over the forest and through the trees",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
    {
        name: "Tunnel with morning light",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
    {
        name: "Mountain house",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    },
];

const editModalBtn = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");

const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");

const editFormElement = editModal.querySelector(".modal__form");

const editModalCloseBtn = editModal.querySelector(".modal__close-btn");

const editModalNameInput = editModal.querySelector("#profile-name-input");

const editModalDescriptionInput = editModal.querySelector(
    "#profile-description-input"
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const cardModal = document.querySelector("#add-card-modal");
const cardFormElement = cardModal.querySelector(".modal__form");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
    ".modal__close-btn_type_preview"
);

function openModal(modal) {
    // Refactored this code to the editModalBtn function with eventlistener
    // editModalNameInput.value = profileName.textContent;
    // editModalDescriptionInput.value = profileDescription.textContent;
    modal.classList.add("modal_opened");
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    profileDescription.textContent = editModalDescriptionInput.value;
    closeModal(editModal);
}

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    console.log(cardNameInput.value);
    console.log(cardLinkInput.value);
    const inputValue = { name: cardNameInput.value, link: cardLinkInput.value };
    const cardEl = getCardElement(inputValue);
    cardsList.prepend(cardEl);
    evt.target.reset();
    closeModal(cardModal);
}

function getCardElement(data) {
    console.log(data);
    const cardElement = cardTemplate.content
        .querySelector(".card")
        .cloneNode(true);

    const cardNameEl = cardElement.querySelector(".card__title");
    const cardImgEl = cardElement.querySelector(".card__image");
    //declaring variable of the Delete button

    const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

    //declaring variable to keeping the button active in eventlistener below
    const cardLikedBtn = cardElement.querySelector(".card__like-btn");
    //Keeping the buttons active when clicking for Liked in the cards
    cardLikedBtn.addEventListener("click", () => {
        cardLikedBtn.classList.toggle("card__like-btn-liked");
    });

    cardImgEl.addEventListener("click", () => {
        openModal(previewModal);
        previewModalEl.src = data.link;
        previewModalEl.alt = data.name;
        previewModalCaptionEl.textContent = data.name;
    });

    //create a event as a paramater event.target.closest search card  .remove
    cardDeleteBtn.addEventListener("click", () => {
        cardElement.remove();
    });

    cardNameEl.textContent = data.name;
    cardImgEl.src = data.link;
    cardImgEl.alt = data.name;

    return cardElement;
}
previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
});

editModalBtn.addEventListener("click", () => {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
    openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
    closeModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
    openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
    closeModal(cardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

// for (let i = 0; i < initialCards.length; i++) {
//     const cardElement = getCardElement(initialCards[i]);
//     cardsList.prepend(cardElement);
// }

// for (let i = 0; i < initialCards.length; i++) {
//     cardsList.prepend(getCardElement(initialCards[i]));
// }

cardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((item) => {
    cardsList.prepend(getCardElement(item));
});
