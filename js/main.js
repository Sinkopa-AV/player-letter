// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');

    // Function to switch button states
    function toggleButtons() {
        if (audioPlayer.paused) {
            playButton.style.display = 'block';
            pauseButton.style.display = 'none';
        } else {
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
        }
    }

    // Function to update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }

    // Function to set progress bar position
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Add click event listeners to both buttons
    playButton.addEventListener('click', () => {
        audioPlayer.play();
        toggleButtons();
    });

    pauseButton.addEventListener('click', () => {
        audioPlayer.pause();
        toggleButtons();
    });

    // Add click event listener to progress bar
    progressContainer.addEventListener('click', setProgress);

    // Update progress bar as audio plays
    audioPlayer.addEventListener('timeupdate', updateProgress);

    // Handle audio events
    audioPlayer.addEventListener('play', toggleButtons);
    audioPlayer.addEventListener('pause', toggleButtons);
    audioPlayer.addEventListener('ended', toggleButtons);

    // Initialize
    audioPlayer.load();
});