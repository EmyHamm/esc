import axios from 'axios';
import notifications from './notifications';
import { onBlur } from './validator';

export default function contact() {
    const formWrappers = document.querySelectorAll('.form-wrapper');
    const formInputs = document.querySelectorAll('.form-input');
    const submitButton = document.querySelector('.form-submit');
    const successContent = document.getElementById('contact-success');
    const failureContent = document.getElementById('contact-failure');
    const errorContent = document.getElementById('contact-error');
    const contactState = {
        name: '',
        email: '',
        phone: '',
        message: '',
    };

    const successNotify = new notifications({
        content: successContent,
        timeout: 2000,
        type: 'success',
    });

    const failureNotify = new notifications({
        content: failureContent,
        timeout: 2000,
        type: 'danger',
    });

    const errorNotify = new notifications({
        content: errorContent,
        timeout: 2000,
        type: 'warning',
    });

    function updateState(node) {
        const inputName = node.name;
        const value = node.value;

        contactState[node.name] = value;
    }

    onBlur(formInputs, updateState);

    function sendMessage() {
        if (submitButton.classList.contains('form-valid')) {
            submitButton.classList.add('form-loading');

            axios.post('/contact', contactState, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    const success = new Event('message-sent');

                    submitButton.classList.remove('form-loading');
                    submitButton.classList.add('form-success');
                    window.dispatchEvent(success);
                } else {
                    const failure = new Event('message-failed');

                    submitButton.classList.remove('form-loading');
                    window.dispatchEvent(failure);
                }
            })
            .then(() => {
                resetForm();
                submitButton.classList.remove('form-success');
            })
            .catch(err => {
                const failure = new Event('message-failed');

                submitButton.classList.remove('form-loading');
                window.dispatchEvent(failure);
            })
        } else {
            const error = new Event('message-error');
            window.dispatchEvent(error);
        }
    }

    function resetForm() {
        for (let input of formInputs) {
            input.value = '';
            input.classList.remove('valid');
        }
    }

    submitButton.addEventListener('click', sendMessage, false);
    window.addEventListener('message-sent', successNotify.open, false);
    window.addEventListener('message-failed', failureNotify.open, false);
    window.addEventListener('message-error', errorNotify.open, false);
}