$(document).ready(function () {
  //Owl
  $(".hero-slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    dots: false,
    navText: ["PREV", "NEXT"],
    smartSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 7000,
    responsive: {
      0: {
        nav: false,
      },
      768: {
        nav: true,
      },
    },
  });

  $("#projects-slider").owlCarousel({
    loop: true,
    nav: false,
    items: 2,
    dots: true,
    smartSpeed: 600,
    center: true,
    autoplay: true,
    autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
        margin: 8,
      },
    },
  });

  $(".reviews-slider").owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    smartSpeed: 900,
    items: 1,
    margin: 24,
    autoplay: true,
    autoplayTimeout: 4000,
  });
});



// Custom Javascript for Date Selection Logic

const availableDates = ["2024-11-10", "2024-11-15", "2024-11-20"]; 

function checkDateAvailability() {
  const appointmentDate = document.getElementById("appointmentDate").value;
  const timeSlotMessage = document.getElementById("timeSlotMessage");

  // Check if selected date is available
  if (availableDates.includes(appointmentDate)) {
    timeSlotMessage.value = "Slots are available for the selected date.";
    timeSlotMessage.classList.remove("no-slots");
    timeSlotMessage.classList.add("available-slots");
  } else {
    timeSlotMessage.value = "No available slots for the selected date.";
    timeSlotMessage.classList.remove("available-slots");
    timeSlotMessage.classList.add("no-slots");
  }
}

// Form submit validation
function checkAvailability() {
  const timeSlotMessage = document.getElementById("timeSlotMessage").value;

  // Agar slots available nahi hai toh form submit nahi hoga
  if (timeSlotMessage === "No available slots for the selected date.") {
    alert("Please select a date with available slots.");
    return false; // Form submit nahi hoga
  }
  return true; // Form submit hoga
}



// Appointment form submission script
async function submitForm(event) {
  event.preventDefault(); // Form ko reload hone se roke

  const formData = {
      name: document.querySelector('input[name="name"]').value,
      email: document.querySelector('input[name="email"]').value,
      appointmentDate: document.querySelector('input[name="appointmentDate"]').value,
      time: document.querySelector('input[name="time"]').value,
      phone: document.querySelector('input[name="phone"]').value,
      message: document.querySelector('textarea[name="message"]').value,
  };

  try {
      const response = await fetch("http://localhost:5007/send-appointment", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Show success alert if the email was sent successfully
      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Appointment Booked!',
              text: result.message,
              confirmButtonText: 'OK',
              timer: 3000 // Optional: Auto-close after 3 seconds
          });
      } else {
          // Show error alert if something went wrong
          Swal.fire({
              icon: 'error',
              title: 'Failed to Book Appointment',
              text: result.message || 'There was an error with your request.',
              confirmButtonText: 'Try Again'
          });
      }
  } catch (error) {
      console.error("Error submitting form:", error);

      // Show error alert if fetch request fails
      Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'Unable to connect to the server. Please try again later.',
          confirmButtonText: 'OK'
      });
  }
}