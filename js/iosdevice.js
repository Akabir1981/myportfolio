document.addEventListener('DOMContentLoaded', function() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIOS) {
        const textSpans = document.querySelectorAll('.home-details h2 span');
        let currentIndex = 0;

        // শুরুতে শুধুমাত্র প্রথম টেক্সট ভিজিবল করুন
        textSpans.forEach((span, index) => {
            span.style.opacity = index === 0 ? '1' : '0';
            span.style.animation = index === 0 ? '' : 'none';
        });

        // অ্যানিমেশন শেষ হলে পরবর্তী টেক্সট শো করুন
        function showNextText() {
            textSpans[currentIndex].style.opacity = '0'; // বর্তমান টেক্সট লুকান
            currentIndex = (currentIndex + 1) % textSpans.length; // পরবর্তী ইনডেক্স
            textSpans[currentIndex].style.opacity = '1'; // নতুন টেক্সট ভিজিবল করুন
            textSpans[currentIndex].style.animation = ''; // অ্যানিমেশন চালু
        }

textSpans.forEach(span => {
            span.addEventListener('animationend', showNextText);
        });
    }
});
