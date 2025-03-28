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
    const text = message.textContent;
    message.textContent = '';
    message.style.display = 'block';
    
    let charIndex = 0;
    const typingSpeed = 50; // milliseconds per character
    
    const typeChar = () => {
        if (charIndex < text.length) {
            message.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeChar, 1000);
}
