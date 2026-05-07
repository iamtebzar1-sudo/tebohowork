import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Mail,
  FileText,
  CalendarCheck,
  Search,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Clock,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const quickAccess = [
  { title: "Email Generator", desc: "Draft professional emails in seconds", icon: Mail, url: "/email", color: "bg-primary/10 text-primary" },
  { title: "Meeting Summarizer", desc: "Turn notes into actionable summaries", icon: FileText, url: "/meetings", color: "bg-cyan-accent/10 text-cyan-accent" },
  { title: "Task Planner", desc: "AI-powered scheduling & priorities", icon: CalendarCheck, url: "/tasks", color: "bg-success/10 text-success" },
  { title: "Research Assistant", desc: "Summarize & analyze information", icon: Search, url: "/research", color: "bg-warning/10 text-warning" },
  { title: "AI Chat", desc: "Your workplace AI assistant", icon: MessageSquare, url: "/chat", color: "bg-primary/10 text-primary" },
];

const stats = [
  { label: "Emails Generated", value: "24", icon: Mail, change: "+12%" },
  { label: "Meetings Summarized", value: "8", icon: FileText, change: "+5%" },
  { label: "Tasks Planned", value: "42", icon: CalendarCheck, change: "+18%" },
  { label: "Time Saved", value: "6.5h", icon: Clock, change: "+22%" },
];

const tips = [
  "Try batch-generating emails for follow-ups to save 30 minutes per week.",
  "Use the Meeting Summarizer right after calls for the freshest insights.",
  "Schedule your most important tasks during your peak productivity hours.",
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

function Dashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="rounded-2xl gradient-brand p-8 text-primary-foreground">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold">Welcome to ProdigyAI</h1>
          </div>
          <p className="text-primary-foreground/80 max-w-xl">
            Your AI-powered workplace productivity assistant. Automate emails, summarize meetings, plan tasks, and research smarter.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <motion.div key={s.label} variants={item}>
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <s.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs font-medium text-success flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> {s.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" /> Quick Access
        </h2>
        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickAccess.map((q) => (
            <motion.div key={q.title} variants={item}>
              <Link to={q.url}>
                <Card className="card-hover cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-xl p-3 ${q.color}`}>
                        <q.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold flex items-center gap-2">
                          {q.title}
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{q.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Daily Tips */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" /> Productivity Tips
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {tips.map((tip, i) => (
            <Card key={i} className="bg-brand-muted/30 border-brand-muted">
              <CardContent className="pt-6">
                <p className="text-sm">{tip}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Disclaimer */}
      <div className="rounded-lg bg-muted p-4 text-xs text-muted-foreground text-center">
        <Sparkles className="h-3 w-3 inline mr-1" />
        AI-generated content may require human review. ProdigyAI is designed to assist, not replace, professional judgment.
      </div>
    </div>
  );
}
