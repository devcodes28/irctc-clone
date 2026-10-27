
    console.log(" Contact script loaded!"); 

    document.addEventListener('DOMContentLoaded', () => {
        console.log(" DOM fully loaded");
        
        const currentUser = DB_API.getCurrentUser();
        
        // Auto-fill name and email if logged in
        if (currentUser) {
            const nameInput = document.getElementById('contactName');
            const emailInput = document.getElementById('contactEmail');
            if (nameInput && !nameInput.value) nameInput.value = currentUser.fullName || '';
            if (emailInput && !emailInput.value) emailInput.value = currentUser.email || '';
        }

        // Handle Form Submission
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) {
            console.error(" ERROR: Could not find element with id='contactForm' in HTML!");
            return;
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log(" Form submit button clicked!");

            const nameInput = document.getElementById('contactName');
            const emailInput = document.getElementById('contactEmail');
            const subjectInput = document.getElementById('contactSubject');
            const messageInput = document.getElementById('contactMessage');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields before submitting.');
                return;
            }

            const payload = {
                userId: currentUser?._id || currentUser?.id || null,
                name,
                email,
                subject,
                message
            };

            console.log(" Sending payload to DB_API:", payload);
            const result = await DB_API.submitContactMessage(payload);

            if (result && result.success) {
                alert(result.message);
                contactForm.reset();
                if (currentUser) {
                    if (nameInput) nameInput.value = currentUser.fullName || '';
                    if (emailInput) emailInput.value = currentUser.email || '';
                }
            } else {
                alert(result?.message || 'Failed to submit message. Please try again.');
            }
        });
    });

