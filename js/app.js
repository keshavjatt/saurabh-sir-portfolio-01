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

const busyDates = ["2024-11-10", "2024-11-15", "2024-11-20"]; // Dummy array jisme busy dates hain (Format: YYYY-MM-DD)

function checkDateAvailability() {
  const appointmentDate = document.getElementById("appointmentDate").value;
  const timeSlotMessage = document.getElementById("timeSlotMessage");

  // Check if selected date is busy
  if (busyDates.includes(appointmentDate)) {
    timeSlotMessage.value = "No available slots for the selected date.";
    timeSlotMessage.classList.remove("available-slots");
    timeSlotMessage.classList.add("no-slots");
  } else {
    timeSlotMessage.value = "Slots is available for the selected date.";
    timeSlotMessage.classList.remove("no-slots");
    timeSlotMessage.classList.add("available-slots");
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
