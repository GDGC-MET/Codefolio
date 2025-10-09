document.addEventListener('DOMContentLoaded', function() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Apply hardware acceleration styles
    const cursors = [cursorDot, cursorCircle, cursorOutline];
    cursors.forEach(cursor => {
        cursor.style.willChange = 'transform';
        cursor.style.transform = 'translate3d(0, 0, 0)';
        cursor.style.backfaceVisibility = 'hidden';
        cursor.style.perspective = '1000px';
    });

    let cursor = {
        dot: { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } },
        circle: { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } },
        outline: { current: { x: 0, y: 0 }, target: { x: 0, y: 0 } }
    };

    let rafId = null;
    let lastKnownX = 0;
    let lastKnownY = 0;

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function updateCursor() {
        // Update dot position (immediate)
        cursorDot.style.transform = `translate3d(${cursor.dot.target.x}px, ${cursor.dot.target.y}px, 0)`;
        
        // Update circle with smooth interpolation
        cursor.circle.current.x = lerp(cursor.circle.current.x, cursor.circle.target.x, 0.2);
        cursor.circle.current.y = lerp(cursor.circle.current.y, cursor.circle.target.y, 0.2);
        cursorCircle.style.transform = `translate3d(${cursor.circle.current.x}px, ${cursor.circle.current.y}px, 0)`;
        
        // Update outline with smoother interpolation
        cursor.outline.current.x = lerp(cursor.outline.current.x, cursor.outline.target.x, 0.1);
        cursor.outline.current.y = lerp(cursor.outline.current.y, cursor.outline.target.y, 0.1);
        cursorOutline.style.transform = `translate3d(${cursor.outline.current.x}px, ${cursor.outline.current.y}px, 0)`;
        
        requestAnimationFrame(updateCursor);
    }

    // Throttled mousemove handler
    let throttleTimer;
    document.addEventListener('mousemove', (e) => {
        if (!throttleTimer) {
            throttleTimer = setTimeout(() => {
                lastKnownX = e.clientX;
                lastKnownY = e.clientY;
                
                cursor.dot.target = { x: lastKnownX, y: lastKnownY };
                cursor.circle.target = { x: lastKnownX, y: lastKnownY };
                cursor.outline.target = { x: lastKnownX, y: lastKnownY };
                
                if (cursor.circle.current.x === 0) {
                    cursor.circle.current = { ...cursor.circle.target };
                    cursor.outline.current = { ...cursor.outline.target };
                }
                
                throttleTimer = null;
            }, 16); // Approximately 60fps
        }
    });

    // Start animation loop
    requestAnimationFrame(updateCursor);

    // Show cursors after a short delay
    setTimeout(() => {
        document.body.style.cursor = 'none';
        cursors.forEach(cursor => cursor.style.opacity = '1');
    }, 1000);

    // Handle cursor visibility
    document.addEventListener('mouseout', () => {
        cursors.forEach(cursor => cursor.style.opacity = '0');
    });

    document.addEventListener('mouseover', () => {
        cursors.forEach(cursor => cursor.style.opacity = '1');
    });

    // Handle interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform += ' scale(1.5)';
            cursorCircle.style.transform += ' scale(1.25)';
            cursorDot.style.transform += ' scale(0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
            cursorCircle.style.transform = cursorCircle.style.transform.replace(' scale(1.25)', '');
            cursorDot.style.transform = cursorDot.style.transform.replace(' scale(0.5)', '');
        });
    });
});