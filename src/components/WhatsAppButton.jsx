import "./WhatsAppButton.css";

function WhatsAppButton() {
    const phoneNumber = "255651829411";

    const message = encodeURIComponent(
        "Hello Empress Beauty! 👋 I would like to make an appointment."
    );

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
            aria-label="Chat with Empress Beauty on WhatsApp"
        >
            <span className="whatsapp-icon">☏</span>

            <span className="whatsapp-text">
                Chat on WhatsApp
            </span>
        </a>
    );
}

export default WhatsAppButton;