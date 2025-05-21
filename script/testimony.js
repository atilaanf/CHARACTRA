document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('testimony-form');
    const name = document.getElementById('name');
    const status = document.getElementById('status');
    const message = document.getElementById('message');
    

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (validateInputs()) {
        form.action = "https://formspree.io/f/mldbvprb";
        form.submit();
        location.reload();
    }
    });

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const validateInputs = () => {
        let isFormValid = true;

        const nameValue = name.value.trim();
        const statusValue = status.value.trim();
        const messageValue = message.value.trim();

        if (nameValue === '') {
            setError(name, 'Name is required');
            isFormValid = false;
        } else {
            setSuccess(name);
        }

        if (statusValue === '') {
            setError(status, 'Status is required');
            isFormValid = false;
        } else {
            setSuccess(status);
        }

        if (messageValue === '') {
            setError(message, 'Message is required');
            isFormValid = false;
        } else {
            setSuccess(message);
        }

        return isFormValid;
    };
});
