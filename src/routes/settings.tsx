import { createFileRoute } from "@tanstack/react-router";
import { Settings, Shield, AlertTriangle, Eye, Lock, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ProdigyAI" },
      { name: "description", content: "ProdigyAI settings and responsible AI practices" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-xl bg-muted p-2.5">
          <Settings className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure your workspace and learn about responsible AI</p>
        </div>
      </div>

      {/* Responsible AI Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" /> Responsible AI
        </h2>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="h-5 w-5 text-primary" /> Ethical AI Usage
              </CardTitle>
              <CardDescription>How ProdigyAI approaches AI responsibly</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed space-y-3">
              <p>ProdigyAI is designed to <strong>assist</strong>, not replace, professional judgment. All AI-generated content should be reviewed and verified by humans before use in professional contexts.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> AI outputs are suggestions, not final decisions</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> Always verify facts, figures, and recommendations</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> Use AI as a starting point, then apply professional expertise</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> Be transparent about AI-assisted content with stakeholders</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lock className="h-5 w-5 text-success" /> Data Privacy
              </CardTitle>
              <CardDescription>How your data is handled</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed space-y-3">
              <p>We take data privacy seriously. Here's how ProdigyAI handles your information:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success mt-2 shrink-0" /> Your data is processed securely and not used to train AI models</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success mt-2 shrink-0" /> Conversation history is stored locally on your device</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success mt-2 shrink-0" /> No sensitive data is shared with third parties</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success mt-2 shrink-0" /> You can clear your data at any time</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="h-5 w-5 text-warning" /> Limitations of AI
              </CardTitle>
              <CardDescription>Important things to know about AI-generated content</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed space-y-3">
              <p>AI technology has inherent limitations that users should be aware of:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-warning mt-2 shrink-0" /> AI can generate plausible but incorrect information (hallucinations)</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-warning mt-2 shrink-0" /> AI may reflect biases present in training data</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-warning mt-2 shrink-0" /> AI lacks real-time knowledge of recent events or internal company data</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-warning mt-2 shrink-0" /> Complex legal, medical, or financial advice requires human experts</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-warning mt-2 shrink-0" /> AI cannot understand context the way humans do</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Eye className="h-5 w-5 text-cyan-accent" /> Bias Awareness
              </CardTitle>
              <CardDescription>Understanding and mitigating AI bias</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed space-y-3">
              <p>AI systems can inadvertently perpetuate biases. ProdigyAI encourages:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-accent mt-2 shrink-0" /> Critical evaluation of AI suggestions for potential bias</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-accent mt-2 shrink-0" /> Diverse perspectives when making decisions based on AI output</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-accent mt-2 shrink-0" /> Reporting any biased or inappropriate AI responses</li>
                <li className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-accent mt-2 shrink-0" /> Using inclusive language prompts for better results</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
