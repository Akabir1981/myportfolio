document.addEventListener('DOMContentLoaded', function() {
    // 1. iOS ডিটেক্ট করুন
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
        // 2. সব spans সিলেক্ট করুন
        const textSpans = document.querySelectorAll('.home-details h2 span');
        let currentIndex = 0;

        // 3. শুরুতে শুধুমাত্র প্রথম span সক্রিয় করুন
        activateSpan(currentIndex);

        function activateSpan(index) {
            // সব spans রিসেট করুন
            textSpans.forEach(span => {
                span.style.opacity = '0';
                span.style.animation = 'none';
            });

            // বর্তমান span সক্রিয় করুন
            textSpans[index].style.opacity = '1';
            textSpans[index].style.animation = '';

            // 4. অ্যানিমেশন শেষ হলে পরবর্তী span সক্রিয় করুন
            textSpans[index].addEventListener('animationend', function handler() {
                this.removeEventListener('animationend', handler);
                currentIndex = (currentIndex + 1) % textSpans.length;
                activateSpan(currentIndex);
            });
        }
    }
});
