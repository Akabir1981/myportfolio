document.addEventListener('DOMContentLoaded', () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const targetText = document.querySelector('.home-details h3');
    
    if (isIOS && targetText) {
        // পোর্ট্রেট মোডে শুধুমাত্র ফোর্স সেন্টারিং
        const forceCenter = () => {
            if (window.innerHeight > window.innerWidth) {
                targetText.style.cssText = `
                    position: relative !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    display: block !important;
                    width: max-content !important;
                    text-align: center !important;
                `;
            }
        };
        
        // 3 সেকেন্ড পর চেক (ফন্ট/লেআউট রেডি হওয়ার জন্য)
        setTimeout(forceCenter, 3000);
        window.addEventListener('resize', forceCenter);
    }
});
