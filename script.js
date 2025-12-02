// Create perfect seamless scrolling background
function createSeamlessBackground() {
    const track = document.getElementById('scrollingTrack');
    if (!track) return;
    
    // Clear track
    track.innerHTML = '';
    
    // Create 3 identical rows for seamless loop
    for (let row = 0; row < 3; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'image-row';
        
        // Fill row with 30 images (same order each row)
        for (let i = 1; i <= 30; i++) {
            const tile = document.createElement('div');
            tile.className = 'image-tile';
            
            // Try to load image
            const imgPath = `assets/backgrounds/img${i}.png`;
            const img = new Image();
            
            img.onload = () => {
                tile.style.backgroundImage = `url('${imgPath}')`;
                tile.style.opacity = '0.4';
            };
            
            img.onerror = () => {
                // Fallback gradient
                const hue = (i * 12) % 360;
                tile.style.background = `linear-gradient(135deg, 
                    hsl(${hue}, 80%, 35%) 0%, 
                    hsl(${hue + 40}, 90%, 45%) 100%)`;
                tile.style.opacity = '0.3';
            };
            
            img.src = imgPath;
            
            // Add hover effect
            tile.addEventListener('mouseenter', function() {
                this.style.opacity = '0.9';
                this.style.transform = 'scale(1.08)';
            });
            
            tile.addEventListener('mouseleave', function() {
                this.style.opacity = '0.4';
                this.style.transform = 'scale(1)';
            });
            
            rowDiv.appendChild(tile);
        }
        
        track.appendChild(rowDiv);
    }
    
    console.log('Created seamless background with 3 rows of 30 images');
}

// Handle window resize
function handleResize() {
    // Just restart animation to ensure smoothness
    const track = document.getElementById('scrollingTrack');
    if (track) {
        track.style.animation = 'none';
        setTimeout(() => {
            track.style.animation = 'scrollBackground 150s linear infinite';
        }, 10);
    }
}

// Initialize on load
window.addEventListener('load', () => {
    createSeamlessBackground();
    window.addEventListener('resize', handleResize);
    
    // Optional: Pause on hover
    const container = document.querySelector('.background-container');
    const track = document.getElementById('scrollingTrack');
    
    if (container && track) {
        container.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        container.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }
});

// Debug info
console.log('Starting seamless background script');