const participantNameInput = document.getElementById("participantName");
const eventNameInput = document.getElementById("eventName");
const roleInput = document.getElementById("role");
const themeInput = document.getElementById("theme");

const previewName = document.getElementById("previewName");
const previewEvent = document.getElementById("previewEvent");
const previewRole = document.getElementById("previewRole");
const serialText = document.getElementById("serialText");
const dateText = document.getElementById("dateText");
const badge = document.getElementById("badge");

const generateBtn = document.getElementById("generateBtn");
const downloadJsonBtn = document.getElementById("downloadJsonBtn");
const downloadPngBtn = document.getElementById("downloadPngBtn");

function randomSerial() {
  return "#" + Math.floor(1000 + Math.random() * 9000);
}

function updateBadge() {
  const name = participantNameInput.value.trim() || "Your Name";
  const event = eventNameInput.value.trim() || "Your Event Name";
  const role = roleInput.value;
  const theme = themeInput.value;
  const year = new Date().getFullYear();

  previewName.textContent = name;
  previewEvent.textContent = event;
  previewRole.textContent = role;
  serialText.textContent = randomSerial();
  dateText.textContent = year;

  badge.className = "badge " + theme;
}

function getMetadata() {
  const name = participantNameInput.value.trim() || "Your Name";
  const event = eventNameInput.value.trim() || "Your Event Name";
  const role = roleInput.value;
  const theme = themeInput.value;

  return {
    project: "EventMint AI",
    title: `${event} Badge`,
    participant: name,
    role: role,
    theme: theme,
    year: new Date().getFullYear(),
    description: `A collectible event badge for ${name} as ${role} at ${event}.`,
    attributes: [
      { trait_type: "Participant", value: name },
      { trait_type: "Event", value: event },
      { trait_type: "Role", value: role },
      { trait_type: "Theme", value: theme }
    ]
  };
}

function downloadJSON() {
  const metadata = getMetadata();
  const blob = new Blob([JSON.stringify(metadata, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "metadata.json";
  a.click();
  URL.revokeObjectURL(url);
}

function downloadPNG() {
  html2canvas(badge, {
    backgroundColor: null,
    scale: 2
  }).then((canvas) => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "event-badge.png";
    a.click();
  });
}

generateBtn.addEventListener("click", updateBadge);
downloadJsonBtn.addEventListener("click", downloadJSON);
downloadPngBtn.addEventListener("click", downloadPNG);

updateBadge();
