document.addEventListener('DOMContentLoaded', function() {
    // Create background stars
    createStars();
    
    // Create shooting stars
    createShootingStars();
    
    // Add intermittent blinking stars for extra effect
    addIntermittentBlinkingStars();
    
    // Add message typing effect
    typeMessage();
    
    // Ensure GIF is set to loop
    const goodNightGif = document.querySelector('.good-night-gif');
    if (goodNightGif) {
        goodNightGif.setAttribute('loop', 'infinite');
    }
    
    // Add a subtle hover effect to the card
    const card = document.querySelector('.card');
    
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        const dx = (x - xc) / 20;
        const dy = (y - yc) / 20;
        
        card.style.transform = `perspective(1000px) rotateY(${dx}deg) rotateX(${-dy}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        setTimeout(() => {
            card.style.transition = 'transform 0.5s ease';
        }, 300);
    });
    
    // No need for moon rotation animation as we're now using the floating animation in CSS
});

function createStars() {
    const nightSky = document.querySelector('.night-sky');
    
    // Create more stars with different blinking patterns
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Randomize star size
        const sizeClass = Math.random() < 0.6 ? 'small' : (Math.random() < 0.8 ? 'medium' : 'large');
        star.classList.add(sizeClass);
        
        // Randomize position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        
        // Updated star colors
        const colors = ['#ffffff', '#fffae0', '#FFE87C', '#e0e8ff', '#e0f0ff', '#d1d1ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.backgroundColor = randomColor;
        
        // Randomize opacity
        const baseOpacity = Math.random() * 0.5 + 0.3;
        star.style.opacity = baseOpacity;
        
        // Add glow effect to some stars
        if (Math.random() > 0.7) {
            star.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px ${randomColor}`;
        }
        
        // Add blinking effect to some stars
        if (Math.random() > 0.5) {
            star.classList.add('blink');
            
            // Randomize animation duration and delay
            const duration = 2 + Math.random() * 6;
            const delay = Math.random() * 7;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
        } else {
            // Add subtle twinkling effect to non-blinking stars
            const duration = 3 + Math.random() * 4;
            star.style.animation = `twinkle ${duration}s infinite ${Math.random() * 5}s`;
        }
        
        nightSky.appendChild(star);
    }
    
    // Add subtle movement to stars to enhance the effect
    setInterval(() => {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            if (Math.random() > 0.95) {
                star.style.opacity = Math.random() * 0.5 + 0.3;
            }
        });
    }, 3000);
}

function createShootingStars() {
    const nightSky = document.querySelector('.night-sky');
    
    // Create 5 shooting stars
    for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        // Random position and size
        const width = Math.random() * 150 + 50;
        shootingStar.style.width = `${width}px`;
        
        const startX = Math.random() * -100;
        const startY = Math.random() * window.innerHeight;
        
        shootingStar.style.left = `${startX}px`;
        shootingStar.style.top = `${startY}px`;
        
        // Random animation delay and duration
        const delay = Math.random() * 15;
        const duration = Math.random() * 2 + 2;
        
        shootingStar.style.animationDelay = `${delay}s`;
        shootingStar.style.animationDuration = `${duration}s`;
        
        nightSky.appendChild(shootingStar);
    }
    
    // Create new shooting stars periodically
    setInterval(() => {
        const existingStars = document.querySelectorAll('.shooting-star');
        if (existingStars.length < 7) {
            createShootingStars();
        }
    }, 5000);
}

function addIntermittentBlinkingStars() {
    const nightSky = document.querySelector('.night-sky');
    
    setInterval(() => {
        // Create a temporary bright blinking star
        if (Math.random() > 0.7) {
            const brightStar = document.createElement('div');
            brightStar.classList.add('star', 'large');
            
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            brightStar.style.left = `${posX}%`;
            brightStar.style.top = `${posY}%`;
            brightStar.style.backgroundColor = '#ffffff';
            brightStar.style.boxShadow = '0 0 8px 2px rgba(255, 255, 255, 0.8)';
            
            nightSky.appendChild(brightStar);
            
            // Animate the star blinking and then remove it
            setTimeout(() => {
                brightStar.style.animation = 'blink 1s 3';
                setTimeout(() => {
                    brightStar.remove();
                }, 3000);
            }, 100);
        }
    }, 2000);
}

function typeMessage() {
    const message = document.querySelector('.message');
    const originalText = message.textContent;
    // Add variations of the message for the loop
    const messages = [
        "It's time to rest, cutieee! 😘",
        "Sweet dreams, pookie! 💤",
        "Good night, lil star! 🌙",
        "Sleep tight, darling! 😴",
        "May your dreams be magical! ✨",
        "Close your eyes and dream big! 🌌",
        "Rest well, lovely! 💖",
        "Drift into dreamland, sweetie! 🌜",
        "Time to recharge, gorgeous! 🔋",
        "Good night, sunshine! ☀️",
        "Dream sweet, my princess! 👑",
    ];
    
    // Clear the original text
    message.textContent = '';
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    message.appendChild(cursor);
    
    // Track used messages to avoid immediate repetition
    const usedIndices = new Set();
    let currentMessageIndex = Math.floor(Math.random() * messages.length);
    let isTyping = true;
    let charIndex = 0;
    let currentText = messages[currentMessageIndex];
    usedIndices.add(currentMessageIndex);
    
    const typeLoop = () => {
        // Check if we're typing or deleting
        if (isTyping) {
            // Type next character
            if (charIndex < currentText.length) {
                // Insert text node before cursor
                const textNode = document.createTextNode(currentText.charAt(charIndex));
                message.insertBefore(textNode, cursor);
                charIndex++;
                setTimeout(typeLoop, 70 + Math.random() * 50);
            } else {
                isTyping = false;
                setTimeout(typeLoop, 2000); // Wait 2 seconds before backspacing
            }
        } else {
            // Delete characters
            if (charIndex > 0) {
                // Remove one character (the node before cursor)
                message.removeChild(cursor.previousSibling);
                charIndex--;
                setTimeout(typeLoop, 40); // Backspacing is faster
            } else {
                // Move to next random message when done deleting
                isTyping = true;
                
                // Select a random message that hasn't been used recently
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * messages.length);
                } while (
                    // Avoid repeating the last message
                    newIndex === currentMessageIndex || 
                    // If we've used more than half the messages, allow reusing older ones
                    (usedIndices.size < messages.length / 2 && usedIndices.has(newIndex))
                );
                
                currentMessageIndex = newIndex;
                
                // Track this message as used
                usedIndices.add(currentMessageIndex);
                
                // If we've used too many messages, start forgetting older ones
                if (usedIndices.size > messages.length / 2) {
                    usedIndices.clear();
                    usedIndices.add(currentMessageIndex);
                }
                
                currentText = messages[currentMessageIndex];
                setTimeout(typeLoop, 800); // Wait before typing next message
            }
        }
    };
    
    // Start the typing animation after a short delay
    setTimeout(typeLoop, 1000);
}
