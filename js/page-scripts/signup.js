
        const form = document.getElementById('signupForm');

        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const mobile = document.getElementById('mobile');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        const fullnameError = document.getElementById('fullnameError');
        const emailError = document.getElementById('emailError');
        const mobileError = document.getElementById('mobileError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        function togglePasswordField(buttonId, inputId) {
            const btn = document.getElementById(buttonId);
            const input = document.getElementById(inputId);
            btn.addEventListener('click', function () {
                const isHidden = input.type === 'password';
                input.type = isHidden ? 'text' : 'password';
                btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
            });
        }
        togglePasswordField('togglePassword', 'password');
        togglePasswordField('toggleConfirmPassword', 'confirmPassword');

        function showError(input, errorEl, show) {
            errorEl.classList.toggle('hidden', !show);
            input.classList.toggle('border-red-500', show);
        }

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            let isValid = true;

            if (fullname.value.trim().length < 2) {
                showError(fullname, fullnameError, true);
                isValid = false;
            } else {
                showError(fullname, fullnameError, false);
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                showError(email, emailError, true);
                isValid = false;
            } else {
                showError(email, emailError, false);
            }

            const mobilePattern = /^[0-9]{10}$/;
            if (!mobilePattern.test(mobile.value.trim())) {
                showError(mobile, mobileError, true);
                isValid = false;
            } else {
                showError(mobile, mobileError, false);
            }

            if (password.value.length < 6) {
                showError(password, passwordError, true);
                isValid = false;
            } else {
                showError(password, passwordError, false);
            }

            if (confirmPassword.value !== password.value || confirmPassword.value === '') {
                showError(confirmPassword, confirmPasswordError, true);
                isValid = false;
            } else {
                showError(confirmPassword, confirmPasswordError, false);
            }

            if (isValid) {
                try {
                    // Call DB_API to save user and wait for the response
                    const result = await DB_API.registerUser({
                        fullName: fullname.value.trim(),
                        email: email.value.trim(),
                        mobile: mobile.value.trim(),
                        password: password.value
                    });

                    if (result && result.success) {
                        alert('Registration successful! Please log in with your credentials.');
                        form.reset();
                        window.location.href = 'login.html'; // Redirect to login
                    } else {
                        alert(result?.message || 'Registration failed.'); // Show error if email/mobile already exists
                    }
                } catch (error) {
                    alert("Server connection failed. Is your backend running?");
                    console.error(error);
                }
            }
        });
    
