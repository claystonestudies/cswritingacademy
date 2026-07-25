document.addEventListener('DOMContentLoaded', function () {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    const copyEmailButton = document.querySelector('.contact-copy-button');
    const copyEmailStatus = document.querySelector('.contact-copy-status');

    if (copyEmailButton) {
        copyEmailButton.addEventListener('click', async function () {
            const emailAddress = copyEmailButton.dataset.email;
            const originalLabel = copyEmailButton.textContent;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(emailAddress);
                } else {
                    const temporaryInput = document.createElement('textarea');
                    temporaryInput.value = emailAddress;
                    temporaryInput.setAttribute('readonly', '');
                    temporaryInput.style.position = 'fixed';
                    temporaryInput.style.opacity = '0';
                    document.body.appendChild(temporaryInput);
                    temporaryInput.select();
                    document.execCommand('copy');
                    temporaryInput.remove();
                }

                copyEmailButton.textContent = 'Copied';
                if (copyEmailStatus) {
                    copyEmailStatus.textContent = 'Email address copied.';
                }

                window.setTimeout(function () {
                    copyEmailButton.textContent = originalLabel;
                    if (copyEmailStatus) {
                        copyEmailStatus.textContent = '';
                    }
                }, 2200);
            } catch (error) {
                if (copyEmailStatus) {
                    copyEmailStatus.textContent = 'Select the email address to copy it.';
                }
            }
        });
    }
});
