const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
};

const showInputError = (formEl, inputEl, errorMsg) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputEl) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
        hideInputError(formEl, inputEl);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return input.validity.valid;
    });
};
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonEl);
    } else {
        buttonElement.disabled = false;
    }
    // add the css class for btn submit to be true
    // add a modifier class to the buttonEl to make it grey
};

const disableButton = (buttonEl) => {
    buttonEl.disabled = true;
};

const resetValidation = (formEl, inputList) => {
    inputList.forEach((input) => {
        hideInputError(formEl, input);
    });
};

//todo . use the setting object instead of hard coding strings

const setEventListeners = (formEl, config) => {
    console.log(formEl);
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonElement = formEl.querySelector(config.submitButtonSelector);

    console.log(inputList);
    console.log(buttonElement);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", function () {
            checkInputValidity(formEl, inputEl);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formEl) => {
        setEventListeners(formEl, config);
    });
};

enableValidation(settings);
