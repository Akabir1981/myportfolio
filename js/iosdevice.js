document.addEventListener('DOMContentLoaded', function() {
    const textSpans = document.querySelectorAll('.home-details h2 span');
    let currentIndex = 0;
    let isAnimating = false;

    // iOS ডিটেকশন (শুধু লগ করার জন্য)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    console.log(`Running on ${isIOS ? 'iOS' : 'Non-iOS'} device`);

    function activateSpan(index) {
        if (isAnimating) return;
        isAnimating = true;

        // 1. সব spans রিসেট
        textSpans.forEach(span => {
            span.style.opacity = '0';
            span.style.animation = 'none';
            span.removeEventListener('animationend', handleAnimationEnd);
        });

        // 2. নতুন span অ্যাক্টিভেট
        textSpans[index].style.opacity = '1';
        textSpans[index].style.animation = '';
        
        // 3. ফোর্স রিফ্লো (iOS বাগ ফিক্স)
        void textSpans[index].offsetWidth;
        
        // 4. ইভেন্ট লিসেনার
        textSpans[index].addEventListener('animationend', handleAnimationEnd);
    }

    function handleAnimationEnd() {
        isAnimating = false;
        currentIndex = (currentIndex + 1) % textSpans.length;
        activateSpan(currentIndex);
    }

    // ডিবাগিং
    textSpans.forEach((span, i) => {
        span.addEventListener('animationstart', () => 
            console.log(`Animation STARTED for span ${i}`));
        span.addEventListener('animationend', () => 
            console.log(`Animation ENDED for span ${i}`));
    });

    // শুরু করুন
    activateSpan(0);
});
