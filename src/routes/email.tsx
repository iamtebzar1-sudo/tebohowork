import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Copy, RefreshCw, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Email Generator — ProdigyAI" },
      { name: "description", content: "Generate professional emails with AI" },
    ],
  }),
  component: EmailPage,
});

const tones = ["Formal", "Informal", "Friendly", "Persuasive", "Executive"];
const audiences = ["Client", "Manager", "Team", "HR", "Supplier"];
const templates = [
  { label: "Follow-up", prompt: "Write a follow-up email after a meeting" },
  { label: "Meeting Request", prompt: "Request a meeting to discuss project updates" },
  { label: "Leave Request", prompt: "Request leave for personal reasons" },
  { label: "Complaint Response", prompt: "Respond professionally to a customer complaint" },
  { label: "Sales Outreach", prompt: "Reach out to a potential client about our services" },
];

function EmailPage() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Formal");
  const [audience, setAudience] = useState("Client");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setSubject("");
    setBody("");
    // Simulate AI generation
    await new Promise((r) => setTimeout(r, 1500));
    const generatedSubject = generateSubject(prompt, tone);
    const generatedBody = generateBody(prompt, tone, audience);
    setSubject(generatedSubject);
    setBody(generatedBody);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-xl gradient-brand p-2.5">
          <Mail className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Smart Email Generator</h1>
          <p className="text-sm text-muted-foreground">Generate professional emails from short prompts</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-5">
          {/* Templates */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {templates.map((t) => (
                  <Button key={t.label} variant="outline" size="sm" onClick={() => setPrompt(t.prompt)} className="text-xs">
                    {t.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">What's your email about?</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Follow up on the Q3 budget proposal discussed in yesterday's meeting..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        tone === t
                          ? "gradient-brand text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Audience</label>
                <div className="flex flex-wrap gap-2">
                  {audiences.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAudience(a)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        audience === a
                          ? "gradient-brand text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={generate} disabled={loading || !prompt.trim()} className="w-full" variant="brand">
                {loading ? (
                  <><RefreshCw className="h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="h-4 w-4" /> Generate Email</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Email Preview</span>
                {body && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                      {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={generate}>
                      <RefreshCw className="h-4 w-4" /> Regenerate
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
                    ))}
                  </motion.div>
                ) : body ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Subject</label>
                      <Input value={subject} readOnly className="mt-1 font-medium" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Body</label>
                      <div className="mt-1 rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                        {body}
                      </div>
                    </div>
                    <div className="rounded-lg bg-brand-muted/30 p-3 text-xs text-muted-foreground flex items-start gap-2">
                      <Sparkles className="h-3 w-3 mt-0.5 shrink-0" />
                      AI-generated content. Please review and personalize before sending.
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No email generated yet</p>
                    <p className="text-sm mt-1">Enter a prompt and click Generate to create your email</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple local generation functions (simulate AI)
function generateSubject(prompt: string, tone: string): string {
  const subjects: Record<string, string> = {
    Formal: `Re: ${prompt.slice(0, 50)}`,
    Informal: `Quick note: ${prompt.slice(0, 40)}`,
    Friendly: `Hey! About ${prompt.slice(0, 40)}`,
    Persuasive: `Opportunity: ${prompt.slice(0, 40)}`,
    Executive: `Action Required: ${prompt.slice(0, 40)}`,
  };
  return subjects[tone] || `Re: ${prompt.slice(0, 50)}`;
}

function generateBody(prompt: string, tone: string, audience: string): string {
  const greeting = audience === "Team" ? "Hi team," : audience === "Client" ? "Dear valued client," : audience === "Manager" ? "Dear [Manager Name]," : audience === "HR" ? "Dear HR Team," : "Dear [Supplier Name],";
  
  const toneStyles: Record<string, string> = {
    Formal: `${greeting}\n\nI hope this message finds you well. I am writing to you regarding ${prompt.toLowerCase()}.\n\nI would appreciate the opportunity to discuss this matter at your earliest convenience. Please let me know a suitable time for a brief meeting or call.\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]`,
    Informal: `${greeting}\n\nHope you're doing great! Just wanted to reach out about ${prompt.toLowerCase()}.\n\nLet me know your thoughts when you get a chance. Happy to jump on a quick call if that's easier.\n\nCheers,\n[Your Name]`,
    Friendly: `${greeting}\n\nI hope you're having a wonderful day! I wanted to touch base about ${prompt.toLowerCase()}.\n\nI'd love to hear your perspective on this. Feel free to reach out anytime — I'm always happy to chat!\n\nWarm regards,\n[Your Name]`,
    Persuasive: `${greeting}\n\nI'm reaching out because I believe there's a significant opportunity regarding ${prompt.toLowerCase()}.\n\nBased on our analysis, this could deliver substantial value to our collaboration. I'd welcome the chance to walk you through the details and explore how we can move forward together.\n\nLooking forward to connecting.\n\nBest,\n[Your Name]`,
    Executive: `${greeting}\n\nI'm writing to bring to your attention an important matter regarding ${prompt.toLowerCase()}.\n\nKey Points:\n• Strategic alignment with Q4 objectives\n• Expected impact on operational efficiency\n• Recommended timeline for implementation\n\nI recommend we schedule a brief discussion to align on next steps. Please advise on your availability.\n\nRegards,\n[Your Name]`,
  };

  return toneStyles[tone] || toneStyles.Formal;
}
