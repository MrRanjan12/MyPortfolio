const title = "Hello, I'm Ranjan Kumar";
const subtitle = "Full-Stack Developer | Aspiring AI Engineer";

function typeWriter(element, text, delay, callback) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            if (callback) callback(); // Call the callback function after finishing typing
        }
    }, delay);
}

window.onload = () => {
    const typingElement = document.getElementById('typing');
    const subtitleElement = document.getElementById('subtitle');

    // Typewriter effect for the name
    typeWriter(typingElement, title, 100, () => {
        // After typing the name, type the subtitle
        setTimeout(() => {
            // Clear the subtitle before typing
            subtitleElement.textContent = '';
            typeWriter(subtitleElement, subtitle, 100, () => {
                // After typing the subtitle, start the Typed.js effect
                const typed = new Typed('.multiple-text', {
                    strings: ['Full-Stack Developer', 'JavaScript Developer', 'Software Engineer'],
                    typeSpeed: 50,
                    backSpeed: 50,
                    backDelay: 1000,
                    loop: true,
                    
                });
            });
        }, 500); // Short delay before typing the subtitle
    });
};

// jQuery for smooth scrolling and form submission
$(document).ready(function() {
    // Smooth scrolling for links
    $("a.nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 50
            }, 800);
        }
    });

    // Form submission (dummy functionality)
    $("#contact-form").on("submit", function(e) {
        e.preventDefault();
        alert("Message sent successfully!");
    });
});
