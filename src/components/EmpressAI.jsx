import { useState } from "react";
import "./EmpressAI.css";

function EmpressAI() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hello! 👑 I'm Empress AI. How can I help you today?",
        },
    ]);

    const sendMessage = () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return;
        }

        const newUserMessage = {
            sender: "user",
            text: trimmedMessage,
        };

        setMessages((previousMessages) => [
            ...previousMessages,
            newUserMessage,
        ]);

        setMessage("");

        // Temporary response system.
        // We will connect this to a real AI model later.
        setTimeout(() => {
            const lowerMessage = trimmedMessage.toLowerCase();

            let reply =
                "I'd be happy to help! You can ask me about our services, prices, opening hours, location, or booking an appointment. 👑";

            if (
                lowerMessage.includes("hello") ||
                lowerMessage.includes("hi") ||
                lowerMessage.includes("hey")
            ) {
                reply =
                    "Hello! 👋 Welcome to Empress Beauty. How can I help you today?";
            } else if (
                lowerMessage.includes("service") ||
                lowerMessage.includes("services")
            ) {
                reply =
                    "We offer Hair, Nails, Makeup, Skin, Bridal, and Self-Care services. You can visit our Services page to explore them. ✨";
            } else if (
                lowerMessage.includes("price") ||
                lowerMessage.includes("cost") ||
                lowerMessage.includes("how much")
            ) {
                reply =
                    "Our service prices vary depending on the treatment. You can view the latest prices on our Services page. 💎";
            } else if (
                lowerMessage.includes("hour") ||
                lowerMessage.includes("open")
            ) {
                reply =
                    "We're open Monday–Saturday from 8:00 AM to 8:00 PM, and Sunday from 9:00 AM to 6:00 PM. 🕐";
            } else if (
                lowerMessage.includes("location") ||
                lowerMessage.includes("where")
            ) {
                reply =
                    "Empress Beauty is located in Masaki, Dar es Salaam, Tanzania. 📍";
            } else if (
                lowerMessage.includes("book") ||
                lowerMessage.includes("appointment")
            ) {
                reply =
                    "Absolutely! 💕 You can make an appointment through our Booking page.";
            } else if (
                lowerMessage.includes("whatsapp")
            ) {
                reply =
                    "You can chat with Empress Beauty on WhatsApp using the WhatsApp button on the website. 💬";
            }

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    sender: "ai",
                    text: reply,
                },
            ]);
        }, 500);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <>
            {open && (
                <div className="empress-ai-window">

                    <div className="empress-ai-header">
                        <div>
                            <strong>Empress AI 👑</strong>
                            <span>
                                Your beauty assistant
                            </span>
                        </div>

                        <button
                            className="empress-ai-close"
                            onClick={() => setOpen(false)}
                            aria-label="Close AI assistant"
                        >
                            ×
                        </button>
                    </div>

                    <div className="empress-ai-messages">
                        {messages.map((item, index) => (
                            <div
                                key={index}
                                className={
                                    item.sender === "user"
                                        ? "empress-ai-message user"
                                        : "empress-ai-message ai"
                                }
                            >
                                {item.text}
                            </div>
                        ))}
                    </div>

                    <div className="empress-ai-input-area">
                        <input
                            type="text"
                            value={message}
                            onChange={(event) =>
                                setMessage(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Empress AI..."
                            aria-label="Ask Empress AI"
                        />

                        <button
                            onClick={sendMessage}
                            aria-label="Send message"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}

            <button
                className="empress-ai-button"
                onClick={() => setOpen(!open)}
                aria-label="Open Empress AI"
            >
                <span className="empress-ai-button-icon">
                    ✨
                </span>

                <span className="empress-ai-button-text">
                    Empress AI
                </span>
            </button>
        </>
    );
}

export default EmpressAI;