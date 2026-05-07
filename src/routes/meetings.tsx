import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Copy, Check, ChevronDown, ChevronUp, Sparkles, User, CalendarDays, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Summarizer — ProdigyAI" },
      { name: "description", content: "Summarize meeting notes with AI" },
    ],
  }),
  component: MeetingsPage,
});

interface Summary {
  executive: string;
  keyPoints: string[];
  decisions: string[];
  actionItems: { task: string; person: string; deadline: string }[];
}

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ exec: true, points: true, decisions: true, actions: true });

  const toggle = (key: string) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  const summarize = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSummary({
      executive: "The team discussed progress on the Q4 product launch, reviewed budget allocations, and addressed timeline concerns. Key decisions were made regarding the marketing strategy and resource allocation for the development sprint.",
      keyPoints: [
        "Product launch timeline moved to November 15th",
        "Marketing budget increased by 20% for digital campaigns",
        "New hire onboarding process needs revision",
        "Client feedback integration scheduled for next sprint",
        "Cross-team collaboration framework proposed",
      ],
      decisions: [
        "Approved revised timeline for Q4 launch",
        "Allocated additional budget for influencer marketing",
        "Adopted new project management tool starting next month",
      ],
      actionItems: [
        { task: "Prepare revised project timeline", person: "Sarah K.", deadline: "Oct 15" },
        { task: "Draft marketing campaign brief", person: "Mike R.", deadline: "Oct 18" },
        { task: "Schedule stakeholder review meeting", person: "Lisa M.", deadline: "Oct 12" },
        { task: "Complete technical documentation", person: "Dev Team", deadline: "Oct 20" },
      ],
    });
    setLoading(false);
  };

  const copyAll = () => {
    if (!summary) return;
    const text = `Executive Summary:\n${summary.executive}\n\nKey Points:\n${summary.keyPoints.map((p) => `• ${p}`).join("\n")}\n\nDecisions:\n${summary.decisions.map((d) => `• ${d}`).join("\n")}\n\nAction Items:\n${summary.actionItems.map((a) => `• ${a.task} — ${a.person} (${a.deadline})`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Section = ({ title, sectionKey, children }: { title: string; sectionKey: string; children: React.ReactNode }) => (
    <Card>
      <CardHeader className="cursor-pointer pb-3" onClick={() => toggle(sectionKey)}>
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {title}
          {expanded[sectionKey] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>
      <AnimatePresence>
        {expanded[sectionKey] && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <CardContent className="pt-0">{children}</CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-xl bg-cyan-accent/10 p-2.5">
          <FileText className="h-5 w-5 text-cyan-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Meeting Notes Summarizer</h1>
          <p className="text-sm text-muted-foreground">Transform meeting notes into structured actionable summaries</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <label className="text-sm font-medium mb-2 block">Paste your meeting notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your meeting notes, transcript, or key discussion points here..."
                rows={16}
                className="resize-none"
              />
              <Button onClick={summarize} disabled={loading || !notes.trim()} className="w-full mt-4" variant="brand">
                {loading ? "Summarizing..." : <><Sparkles className="h-4 w-4" /> Summarize Notes</>}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}><CardContent className="pt-6"><div className="space-y-2">{[1, 2, 3].map((j) => <div key={j} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />)}</div></CardContent></Card>
                ))}
              </motion.div>
            ) : summary ? (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={copyAll}>
                    {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy All"}
                  </Button>
                </div>

                <Section title="Executive Summary" sectionKey="exec">
                  <p className="text-sm leading-relaxed">{summary.executive}</p>
                </Section>

                <Section title="Key Discussion Points" sectionKey="points">
                  <ul className="space-y-2">
                    {summary.keyPoints.map((p, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section title="Decisions Made" sectionKey="decisions">
                  <ul className="space-y-2">
                    {summary.decisions.map((d, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <Check className="h-4 w-4 text-success mt-0.5 shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section title="Action Items" sectionKey="actions">
                  <div className="space-y-3">
                    {summary.actionItems.map((a, i) => (
                      <div key={i} className="rounded-lg border p-3 flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{a.task}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><User className="h-3 w-3" />{a.person}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><CalendarDays className="h-3 w-3" />{a.deadline}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="shrink-0 text-xs">Pending</Badge>
                      </div>
                    ))}
                  </div>
                </Section>

                <div className="rounded-lg bg-brand-muted/30 p-3 text-xs text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
                  AI-generated summary. Verify action items and decisions with meeting participants.
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No summary generated yet</p>
                <p className="text-sm mt-1">Paste meeting notes and click Summarize</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
