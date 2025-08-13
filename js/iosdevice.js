document.addEventListener('DOMContentLoaded', function() {
    // 1. iOS ডিটেক্ট করুন (শুধুমাত্র iOS-এ কাজ করবে)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (!isIOS) return;

    // 2. DOM এলিমেন্ট সিলেক্ট করুন
    const textContainer = document.querySelector('.home-details h2');
    const textSpans = Array.from(textContainer.querySelectorAll('span'));

    // 3. ডিবাগিং ইনফো (কনসোলে চেক করুন)
    console.log(`iOS Device Detected. Total spans: ${textSpans.length}`);
    textSpans.forEach((span, i) => {
        console.log(`Span ${i}:`, span.textContent);
    });

    // 4. ফোর্সড সেন্টার অ্যালাইনমেন্ট
    textContainer.style.cssText = `
        display: flex !important;
        justify-content: center !important;
        flex-wrap: wrap !important;
        position: relative !important;
    `;

    // 5. অ্যানিমেশন কন্ট্রোলার
    let currentIndex = 0;
    
    function activateSpan(index) {
        // সব স্প্যান রিসেট
        textSpans.forEach(span => {
            span.style.cssText = `
                opacity: 0 !important;
                animation: none !important;
                position: absolute !important;
            `;
        });

        // বর্তমান স্প্যান সক্রিয় করুন
        textSpans[index].style.cssText = `
            opacity: 1 !important;
            animation: yourAnimationName 4s forwards !important;
            position: relative !important;
        `;

        // iOS রেন্ডারিং বাগ ফিক্স
        void textSpans[index].offsetWidth;

        // পরবর্তী স্প্যানের জন্য টাইমার
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % textSpans.length;
            activateSpan(currentIndex);
        }, 4000); // আপনার CSS অ্যানিমেশন ডুরেশন অনুযায়ী সেট করুন
    }

    // 6. শুরু করুন
    activateSpan(0); // প্রথম স্প্যান দিয়ে শুরু
});
