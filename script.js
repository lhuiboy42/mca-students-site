document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const modal = document.getElementById("copyModal");
    const copyText = document.getElementById("copyText");
    const copyBtn = document.getElementById("copyBtn");
    const closeModal = document.getElementById("closeModal");

    const whatsappBtn = document.getElementById("whatsappBtn");
    const messengerBtn = document.getElementById("messengerBtn");

    // ✅ Helper: Clear all input fields
    function clearFields() {
        [nameInput, emailInput, messageInput].forEach(el => el.value = "");
    }

    // ✅ Helper: Validate form
    function validateFields() {
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            alert("Please fill in all fields before sending.");
            return false;
        }
        return true;
    }

    // ✅ WhatsApp button
    whatsappBtn.addEventListener("click", function () {
        if (!validateFields()) return;

        const phoneNumber = "639171892177"; // Replace with your WhatsApp number
        const text = encodeURIComponent(
            `Name: ${nameInput.value}\nEmail: ${emailInput.value}\nMessage: ${messageInput.value}`
        );
        const url = `https://wa.me/${phoneNumber}?text=${text}`;

        window.open(url, "_blank");
        clearFields();
    });

    // ✅ Messenger button
    messengerBtn.addEventListener("click", function () {
        if (!validateFields()) return;

        const formattedMessage = `Name: ${nameInput.value}\nEmail: ${emailInput.value}\nMessage: ${messageInput.value}`;
        copyText.value = formattedMessage;
        modal.classList.remove("hidden");

        const pageUsername = "mschingartchestra"; // Replace with your page username
        window.open(`https://m.me/${pageUsername}`, "_blank");

        clearFields();
    });

    // ✅ Copy to clipboard (modern API instead of deprecated execCommand)
    copyBtn.addEventListener("click", async function () {
        try {
            await navigator.clipboard.writeText(copyText.value);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    });

    // ✅ Close modal
    closeModal.addEventListener("click", function () {
        modal.classList.add("hidden");
    });
});

// ============================
// 🎥 Video modal controls  //
// ============================
function openVideo(src) {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    modal.classList.remove("hidden");
    modalVideo.src = src;
    modalVideo.play();
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    modal.classList.add("hidden");
    modalVideo.pause();
    modalVideo.src = ""; // Reset to stop playback
}

//=====================
// Open image modal  //
//=====================
const galleryImages = document.querySelectorAll('.service-photos img, .about-gallery img');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
let currentIndex = 0;

// Open modal with selected image
galleryImages.forEach((img, index) => {
  img.addEventListener('click', function () {
    modal.classList.remove('hidden');
    modalImg.src = this.src;
    currentIndex = index;
  });
});

// Close modal
document.getElementById('closeImageModal').addEventListener('click', function () {
  modal.classList.add('hidden');
});

// Close modal when clicking outside modal-content
modal.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Next button
document.getElementById('nextImage').addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
});

// Prev button
document.getElementById('prevImage').addEventListener('click', function () {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
});
