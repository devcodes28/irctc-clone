
        const form = document.getElementById('forgotForm');
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const successMessage = document.getElementById('successMessage');
        const sentEmail = document.getElementById('sentEmail');

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.value.trim())) {
                emailError.classList.remove('hidden');
                email.classList.add('border-red-500');
                return;
            }

            emailError.classList.add('hidden');
            email.classList.remove('border-red-500');

            sentEmail.textContent = email.value.trim();
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
        });
    
