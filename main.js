// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript is connected!");

  // Hamburger menu functionality
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Handle booking form submission
  const bookingForm = document.getElementById("bookingForm");
  const confirmation = document.getElementById("confirmation");
  if (bookingForm && confirmation) {
    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent default form submission

      // Collect form data
      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData.entries());

      // Validate form data
      if (!validateForm(data)) {
        alert("Please fill out all required fields correctly.");
        return;
      }

      // Send data to the backend using Fetch API
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          bookingForm.style.display = "none";
          confirmation.style.display = "block";
        } else {
          alert("Failed to submit your booking. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Unable to connect to the server. Please try again later.");
      }
    });
  }

  // Handle contact form submission
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Your message has been sent successfully!");
          contactForm.reset();
        } else {
          alert("Failed to send your message. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Unable to connect to the server. Please try again later.");
      }
    });
  }

  // Validate form fields
  function validateForm(data) {
    const { name, email, phone, service, date } = data;

    if (!name || !email || !phone || !service || !date) {
      return false; // Ensure all required fields are filled
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[0-9\s-]+$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return false;
    }

    return true;
  }
});