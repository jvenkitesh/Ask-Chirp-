(() => {
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const browseBtn = document.getElementById("browseBtn");
  const pdfViewer = document.getElementById("pdfViewer");
  const pdfEmbed = document.getElementById("pdfEmbed");
  const fileName = document.getElementById("fileName");
  const clearBtn = document.getElementById("clearBtn");

  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  let currentObjectUrl = null;

  function loadPdf(file) {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
    }

    currentObjectUrl = URL.createObjectURL(file);
    pdfEmbed.setAttribute("src", currentObjectUrl);
    fileName.textContent = file.name;

    dropZone.hidden = true;
    pdfViewer.hidden = false;
  }

  function clearPdf() {
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
    }
    pdfEmbed.removeAttribute("src");
    fileInput.value = "";
    pdfViewer.hidden = true;
    dropZone.hidden = false;
  }

  browseBtn.addEventListener("click", () => fileInput.click());
  dropZone.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files[0]) {
      loadPdf(fileInput.files[0]);
    }
  });

  clearBtn.addEventListener("click", clearPdf);

  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove("dragover");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      loadPdf(file);
    }
  });

  function addMessage(text, role) {
    const messageEl = document.createElement("div");
    messageEl.className = `chat-message ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    messageEl.appendChild(bubble);
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    addMessage("This is a simulated response. AI integration coming soon.", "assistant");
  });
})();
