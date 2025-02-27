document.addEventListener("DOMContentLoaded", () => {
  const videoModal = document.getElementById("videoModal");
  const closeButton = document.getElementById("close-modal");
  const playButton = document.getElementById("playVideoBTN");
  const videoPlayer = document.getElementById("video");

  playButton.addEventListener("click", toggleVideoModal);
  closeButton.addEventListener("click", toggleVideoModal);

  function toggleVideoModal() {
    videoModal.classList.toggle("show-modal");

    // Control video playback based on modal visibility
    if (videoModal.classList.contains("show-modal")) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  }
});
