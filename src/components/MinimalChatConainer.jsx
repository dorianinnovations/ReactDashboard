import { useState, useEffect } from "react";
import React from "react";

/* --------------------------------------------------------------
  1 ▸ Toggle Button
----------------------------------------------------------------*/
const ChatToggleButton = ({ isOpen, onClick }) => (
  <button
    className="mc-toggle-btn"
    onClick={onClick}
    onMouseEnter={(e) => e.currentTarget.classList.add("mc-toggle-btn-hover")}
    onMouseLeave={(e) =>
      e.currentTarget.classList.remove("mc-toggle-btn-hover")
    }
  >
    {isOpen ? (
      <span className="mc-toggle-icon mc-toggle-close">✕</span>
    ) : (
      <span className="mc-toggle-icon mc-toggle-plus">+</span>
    )}
  </button>
);

/* --------------------------------------------------------------
  2 ▸ Chat Component
----------------------------------------------------------------*/
const MinimalChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");

  // Helper to build prompt from messages
  const buildPrompt = () => {
    return (
      messages
        .map(
          (m) =>
            `<|im_start|>${m.role === "user" ? "user" : "assistant"}\n${
              m.text
            }<|im_end|>`
        )
        .join("\n") + `\n<|im_start|>assistant\n`
    );
  };

  // Handle sending a message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input, id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const apiUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:8000/completion"
          : "https://cbeb-2603-8000-e602-bfd4-db8e-10b2-8c32-6440.ngrok-free.app/completion";

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `<|im_start|>user\n${input}\n<|im_end|>\n<|im_start|>assistant\n`,
          stop: ["<|im_end|>"],
          n_predict: 128,
          temperature: 0.9,
        }),
      });

      const data = await res.json();
      const botReply = data.content || "[No response from model]";

      setTypingText("");
      const reply = botReply.trim();
      let index = 0;

      // Add placeholder message
      const botMessageId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "", id: botMessageId },
      ]);

      const typeInterval = setInterval(() => {
        if (index < reply.length) {
          setTypingText((prev) => prev + reply[index]);
          index++;
        } else {
          clearInterval(typeInterval);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "bot",
              text: reply,
              id: botMessageId,
            };
            return updated;
          });
          setTypingText("");
          setLoading(false);
        }
      }, 25);
    } catch (err) {
      console.error("Error communicating with Mistral:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Local Mistral server not reachable. Is it running?",
          id: Date.now() + 2,
        },
      ]);
      setLoading(false);
    }
  };

  /* Scroll to last message */
  useEffect(() => {
    const list = document.querySelector("#mc-bubbles");
    list && list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, typingText]);

  return (
    <>
      {/* Message list */}
      <div id="mc-bubbles" className="mc-bubbles">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mc-bubble ${m.role === "user" ? "mc-user" : "mc-bot"}`}
          >
            {m.text}
          </div>
        ))}
        {typingText && <div className="mc-bubble mc-bot">{typingText}</div>}
        {loading && !typingText && <div className="mc-bubble mc-bot">…</div>}
      </div>

      {/* Input */}
      <div className="mc-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask me anything…"
        />
        <button disabled={!input.trim() || loading} onClick={sendMessage}>
          ↑
        </button>
      </div>
    </>
  );
};

/* --------------------------------------------------------------
  3 ▸ Main Container
----------------------------------------------------------------*/
export default function MinimalChatContainer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatToggleButton isOpen={open} onClick={() => setOpen(!open)} />
      {open && (
        <div className="chat-wrapper">
          <MinimalChat />
        </div>
      )}
    </>
  );
}
