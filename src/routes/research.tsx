import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, BookOpen, Lightbulb, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Assistant — ProdigyAI" },
      { name: "description", content: "AI-powered research and summarization" },
    ],
  }),
  component: ResearchPage,
});

interface ResearchResult {
  summary: string;
  insights: string[];
  recommendations: string[];
  sources: { title: string; url: string }[];
  stats: { label: string; value: string }[];
}

function ResearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"quick" | "detailed">("quick");

  const research = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      summary: `Based on analysis of "${query}", the current landscape shows significant growth and transformation. Key trends indicate a shift toward automation, AI integration, and data-driven decision making. Organizations adopting these technologies report 30-40% improvements in operational efficiency.`,
      insights: [
        "Market adoption is accelerating with 65% year-over-year growth",
        "Small and medium businesses are the fastest growing segment",
        "Integration with existing workflows is the primary adoption barrier",
        "ROI is typically realized within 6-12 months of implementation",
        "Data privacy and ethical considerations are top concerns",
      ],
      recommendations: [
        "Start with pilot programs to validate use cases",
        "Invest in employee training and change management",
        "Prioritize solutions with strong data privacy frameworks",
        "Measure and track key performance indicators from day one",
        "Build cross-functional teams for implementation",
      ],
      sources: [
        { title: "Industry Analysis Report 2024", url: "#" },
        { title: "McKinsey Digital Transformation Study", url: "#" },
        { title: "Harvard Business Review: AI in the Workplace", url: "#" },
        { title: "Gartner Technology Trends 2024", url: "#" },
      ],
      stats: [
        { label: "Market Growth", value: "65% YoY" },
        { label: "Avg. ROI Timeline", value: "8 months" },
        { label: "Adoption Rate", value: "73%" },
        { label: "Efficiency Gain", value: "35%" },
      ],
    });
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-xl bg-warning/10 p-2.5">
          <Search className="h-5 w-5 text-warning" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Research Assistant</h1>
          <p className="text-sm text-muted-foreground">Summarize and analyze topics, articles, and reports</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a topic, question, or paste an article to research..."
              onKeyDown={(e) => e.key === "Enter" && research()}
              className="flex-1"
            />
            <div className="flex gap-1">
              <button onClick={() => setMode("quick")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === "quick" ? "gradient-brand text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Quick</button>
              <button onClick={() => setMode("detailed")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === "detailed" ? "gradient-brand text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Detailed</button>
            </div>
            <Button onClick={research} disabled={loading || !query.trim()} variant="brand">
              {loading ? "Researching..." : <><Sparkles className="h-4 w-4" /> Research</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}><CardContent className="pt-6"><div className="space-y-3">{[1, 2, 3, 4].map((j) => <div key={j} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${50 + Math.random() * 50}%` }} />)}</div></CardContent></Card>
            ))}
          </motion.div>
        ) : result ? (
          <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {result.stats.map((s) => (
                <Card key={s.label} className="text-center">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-xl font-bold gradient-brand-text">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="summary">
              <TabsList className="mb-4">
                <TabsTrigger value="summary"><BookOpen className="h-3.5 w-3.5 mr-1.5" />Summary</TabsTrigger>
                <TabsTrigger value="insights"><Lightbulb className="h-3.5 w-3.5 mr-1.5" />Insights</TabsTrigger>
                <TabsTrigger value="recommendations"><CheckCircle className="h-3.5 w-3.5 mr-1.5" />Recommendations</TabsTrigger>
                <TabsTrigger value="sources"><ExternalLink className="h-3.5 w-3.5 mr-1.5" />Sources</TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <Card><CardContent className="pt-6"><p className="text-sm leading-relaxed">{result.summary}</p></CardContent></Card>
              </TabsContent>

              <TabsContent value="insights">
                <Card><CardContent className="pt-6"><ul className="space-y-3">{result.insights.map((ins, i) => (
                  <li key={i} className="text-sm flex items-start gap-2"><Lightbulb className="h-4 w-4 text-warning mt-0.5 shrink-0" />{ins}</li>
                ))}</ul></CardContent></Card>
              </TabsContent>

              <TabsContent value="recommendations">
                <Card><CardContent className="pt-6"><ul className="space-y-3">{result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm flex items-start gap-2"><CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />{rec}</li>
                ))}</ul></CardContent></Card>
              </TabsContent>

              <TabsContent value="sources">
                <Card><CardContent className="pt-6"><ul className="space-y-2">{result.sources.map((src, i) => (
                  <li key={i} className="text-sm flex items-center gap-2"><ExternalLink className="h-3.5 w-3.5 text-primary shrink-0" /><span className="text-primary hover:underline cursor-pointer">{src.title}</span></li>
                ))}</ul></CardContent></Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 rounded-lg bg-muted p-3 text-xs text-muted-foreground text-center">
              <Sparkles className="h-3 w-3 inline mr-1" /> Research summaries are AI-generated and may not reflect the latest data. Always verify from primary sources.
            </div>
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Start your research</p>
            <p className="text-sm mt-1">Enter a topic or question and let AI analyze it for you</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
