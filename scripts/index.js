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
const cardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#preview-modal");

const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const previewModalCloseBtn = previewModal.querySelector(
    ".modal__close-btn_type_preview"
);

const editFormElement = editModal.querySelector(".modal__form");
const cardFormElement = cardModal.querySelector(".modal__form");

const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
    "#profile-description-input"
);

const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const previewModalEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

function handleEscClose(event) {
    if (event.key === "Escape") {
        const openedModal = document.querySelector(".modal.modal_opened");
        if (openedModal) {
            closeModal(openedModal);
        }
    }
}

function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscClose);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    profileDescription.textContent = editModalDescriptionInput.value;
    closeModal(editModal);
}

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    const cardEl = getCardElement(newCard);
    cardsList.prepend(cardEl);
    cardsList.prepend(cardEl);
    cardFormElement.reset();
    disableButton(
        cardFormElement.querySelector(settings.submitButtonSelector),
        settings
    );
    closeModal(cardModal);
}

function getCardElement(data) {
    const cardElement = cardTemplate.content
        .querySelector(".card")
        .cloneNode(true);
    const cardNameEl = cardElement.querySelector(".card__title");
    const cardImgEl = cardElement.querySelector(".card__image");
    const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
    const cardLikeBtn = cardElement.querySelector(".card__like-btn");

    cardImgEl.src = data.link;
    cardImgEl.alt = data.name;
    cardNameEl.textContent = data.name;

    cardLikeBtn.addEventListener("click", () => {
        cardLikeBtn.classList.toggle("card__like-btn-liked");
    });

    cardDeleteBtn.addEventListener("click", () => {
        cardElement.remove();
    });

    cardImgEl.addEventListener("click", () => {
        previewModalEl.src = data.link;
        previewModalEl.alt = data.name;
        previewModalCaptionEl.textContent = data.name;
        openModal(previewModal);
    });

    return cardElement;
}
previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
});

editModalBtn.addEventListener("click", () => {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
    resetValidation(
        editFormElement,
        [editModalDescriptionInput, editModalNameInput],
        settings
    );
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

cardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((item) => {
    cardsList.prepend(getCardElement(item));
});
