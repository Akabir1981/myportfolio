const style = document.createElement('style');
style.textContent = `
    @media screen and (orientation: portrait) {
        .home-details h3 {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
        }
    }
`;
document.head.appendChild(style);
