document.addEventListener('DOMContentLoaded', function() {
    // iOS ডিটেক্ট করুন
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIOS) {
        const scdText = document.querySelector('.home-details h3'); // বা টেক্সট কন্টেইনার সিলেক্ট করুন
        if (scdText) {
            // iOS-এর জন্য স্পেসিফিক স্টাইল অ্যাপ্লাই করুন
            scdText.style.textAlign = 'center';
            scdText.style.margin = '0 auto';
            scdText.style.display = 'block';
        }
    }
});
