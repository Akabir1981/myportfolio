// এই স্ক্রিপ্টটি আপনার HTML ফাইলের </body> ক্লোজিং ট্যাগের আগে যুক্ত করুন
document.addEventListener('DOMContentLoaded', function() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const problemText = document.querySelector('.home-details h3'); // আপনার টেক্সট সিলেক্টর দিয়ে পরিবর্তন করুন
    
    if (isIOS && problemText) {
        const fixIOSAlignment = () => {
            if (window.innerHeight > window.innerWidth) { // পোর্ট্রেট মোড চেক
                problemText.style.cssText = `
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                    display: block;
                    width: max-content;
                `;
            } else {
                problemText.style.cssText = ''; // ল্যান্ডস্কেপ মোডে স্টাইল রিসেট
            }
        };

        // প্রথম লোডে চেক করুন
        fixIOSAlignment();
        
        // স্ক্রিন রোটেশন হলে আবার চেক করুন
        window.addEventListener('resize', fixIOSAlignment);
    }
});
