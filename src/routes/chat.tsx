import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Sparkles, Plus, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — ProdigyAI" },
      { name: "description", content: "Chat with your AI workplace assistant" },
    ],
  }),
  component: ChatPage,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

const suggestions = [
  "Help me draft a project proposal",
  "What are the best productivity techniques?",
  "Summarize today's priorities",
  "Help me prepare for a performance review",
];

const aiResponses: Record<string, string> = {
  default: "I'd be happy to help with that! As your AI workplace assistant, I can help you draft emails, plan tasks, summarize information, and provide productivity advice.\n\nHere's what I suggest:\n\n1. **Break it down** — Start by identifying the key components\n2. **Prioritize** — Focus on what delivers the most impact\n3. **Take action** — Begin with small, achievable steps\n\nWould you like me to elaborate on any specific area?",
  email: "I'll help you draft that email! Here's a professional template:\n\n**Subject:** [Your Topic]\n\nDear [Recipient],\n\nI hope this message finds you well. I'm reaching out regarding [topic].\n\n[Key points here]\n\nI look forward to your response.\n\nBest regards,\n[Your Name]\n\nWould you like me to customize this further? Try the **Email Generator** for more advanced options!",
  productivity: "Great question! Here are proven productivity techniques:\n\n🎯 **Pomodoro Technique** — Work 25 min, break 5 min\n📋 **Eisenhower Matrix** — Prioritize by urgency × importance\n⏰ **Time Blocking** — Dedicate specific hours to task types\n🧠 **Deep Work** — 2-hour uninterrupted focus sessions\n📝 **Weekly Review** — Reflect and plan every Friday\n\nWhich technique interests you most? I can help you implement it!",
  priorities: "Let me help you organize today's priorities:\n\n**🔴 Urgent & Important**\n- Review and respond to critical emails\n- Complete deadline-driven tasks\n\n**🟡 Important, Not Urgent**\n- Strategic planning and goal setting\n- Team development and mentoring\n\n**🟢 Quick Wins**\n- Clear inbox\n- Update task tracker\n\nShall I create a detailed schedule in the **Task Planner**?",
  review: "Here's a framework for your performance review prep:\n\n📊 **Key Achievements**\n- List 3-5 significant accomplishments with metrics\n- Include project completions and impact\n\n🌱 **Growth Areas**\n- Skills developed this period\n- Training or certifications completed\n\n🎯 **Goals for Next Period**\n- Set SMART goals aligned with team objectives\n- Include stretch goals\n\n💡 **Talking Points**\n- Career development aspirations\n- Resource or support needs\n\nWant me to help you draft specific sections?",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("email") || lower.includes("draft")) return aiResponses.email;
  if (lower.includes("productivity") || lower.includes("technique")) return aiResponses.productivity;
  if (lower.includes("priorities") || lower.includes("today")) return aiResponses.priorities;
  if (lower.includes("review") || lower.includes("performance")) return aiResponses.review;
  return aiResponses.default;
}

function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "New Conversation", messages: [] },
  ]);
  const [activeId, setActiveId] = useState("1");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConvo = conversations.find((c) => c.id === activeId)!;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [activeConvo.messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        const updated = { ...c, messages: [...c.messages, userMsg] };
        if (c.messages.length === 0) updated.title = text.slice(0, 40);
        return updated;
      })
    );
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: getAIResponse(text) };
    setConversations((prev) =>
      prev.map((c) => (c.id !== activeId ? c : { ...c, messages: [...c.messages, aiMsg] }))
    );
    setIsTyping(false);
  };

  const newConversation = () => {
    const id = Date.now().toString();
    setConversations((prev) => [...prev, { id, title: "New Conversation", messages: [] }]);
    setActiveId(id);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Chat Sidebar */}
      <div className="w-64 border-r bg-card/50 flex-col hidden md:flex">
        <div className="p-3 border-b">
          <Button variant="outline" size="sm" className="w-full" onClick={newConversation}>
            <Plus className="h-4 w-4" /> New Chat
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-2 space-y-1">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${
                c.id === activeId ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 inline mr-2" />
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {activeConvo.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="rounded-2xl gradient-brand p-4 mb-4">
                <Bot className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-bold mb-1">ProdigyAI Assistant</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Your AI-powered workplace assistant. Ask about emails, productivity, scheduling, or any workplace topic.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)} className="text-left text-sm px-4 py-3 rounded-xl border hover:bg-accent transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {activeConvo.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="shrink-0 h-8 w-8 rounded-lg gradient-brand flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "gradient-brand text-primary-foreground"
                      : "bg-card border"
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                  {msg.role === "user" && (
                    <div className="shrink-0 h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="shrink-0 h-8 w-8 rounded-lg gradient-brand flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-card border rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4 bg-card/50">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ProdigyAI anything..."
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
              className="flex-1"
            />
            <Button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping} variant="brand" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            <Sparkles className="h-3 w-3 inline mr-1" />AI responses are generated and may require verification
          </p>
        </div>
      </div>
    </div>
  );
}
