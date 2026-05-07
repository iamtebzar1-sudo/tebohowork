import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Plus, Sparkles, Clock, Flame, AlertCircle, ArrowDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Task Planner — ProdigyAI" },
      { name: "description", content: "AI-powered task planning and scheduling" },
    ],
  }),
  component: TasksPage,
});

type Priority = "urgent" | "important" | "low";
type Status = "todo" | "in-progress" | "done";

interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  time?: string;
}

const priorityConfig: Record<Priority, { label: string; color: string; icon: React.ElementType }> = {
  urgent: { label: "Urgent", color: "bg-destructive/10 text-destructive border-destructive/20", icon: Flame },
  important: { label: "Important", color: "bg-warning/10 text-warning border-warning/20", icon: AlertCircle },
  low: { label: "Low", color: "bg-success/10 text-success border-success/20", icon: ArrowDown },
};

const statusColumns: { key: Status; label: string }[] = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

const aiTips = [
  "🎯 Block 2 hours for deep work in the morning when focus is highest.",
  "☕ Take a 10-min break every 90 minutes to maintain peak performance.",
  "📋 Tackle urgent tasks first, then batch similar tasks together.",
];

const initialTasks: Task[] = [
  { id: "1", title: "Review Q4 marketing strategy", priority: "urgent", status: "todo", time: "9:00 AM" },
  { id: "2", title: "Update project documentation", priority: "important", status: "todo", time: "10:30 AM" },
  { id: "3", title: "Respond to client emails", priority: "important", status: "in-progress", time: "11:00 AM" },
  { id: "4", title: "Prepare team standup notes", priority: "low", status: "in-progress" },
  { id: "5", title: "Complete onboarding checklist", priority: "low", status: "done" },
];

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("important");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), title: newTask, priority: newPriority, status: "todo" },
    ]);
    setNewTask("");
  };

  const moveTask = (id: string, newStatus: Status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const score = Math.round((tasks.filter((t) => t.status === "done").length / Math.max(tasks.length, 1)) * 100);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-xl bg-success/10 p-2.5">
          <CalendarCheck className="h-5 w-5 text-success" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Task Planner</h1>
          <p className="text-sm text-muted-foreground">Plan, prioritize, and track your tasks with AI assistance</p>
        </div>
      </div>

      {/* Productivity Score + Add Task */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task..." onKeyDown={(e) => e.key === "Enter" && addTask()} className="flex-1" />
              <div className="flex gap-1">
                {(Object.keys(priorityConfig) as Priority[]).map((p) => {
                  const cfg = priorityConfig[p];
                  return (
                    <button key={p} onClick={() => setNewPriority(p)} className={`px-2 py-1 rounded-md text-xs font-medium border transition-colors ${newPriority === p ? cfg.color : "bg-secondary text-secondary-foreground border-transparent"}`}>
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
              <Button onClick={addTask} variant="brand" size="icon"><Plus className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
        <Card className="gradient-brand text-primary-foreground">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{score}%</p>
            <p className="text-sm opacity-80">Productivity Score</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Tips */}
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        {aiTips.map((tip, i) => (
          <div key={i} className="rounded-lg bg-brand-muted/30 border border-brand-muted p-3 text-xs">{tip}</div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid md:grid-cols-3 gap-4">
        {statusColumns.map((col) => (
          <div key={col.key}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">{col.label}</h3>
              <Badge variant="secondary" className="text-xs">{tasks.filter((t) => t.status === col.key).length}</Badge>
            </div>
            <div className="space-y-2 min-h-[200px]">
              {tasks
                .filter((t) => t.status === col.key)
                .map((task) => {
                  const cfg = priorityConfig[task.priority];
                  return (
                    <motion.div key={task.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                      <Card className="card-hover">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium flex-1">{task.title}</p>
                            <button onClick={() => removeTask(task.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className={`text-xs ${cfg.color}`}>
                              <cfg.icon className="h-3 w-3 mr-1" />{cfg.label}
                            </Badge>
                            {task.time && <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{task.time}</span>}
                          </div>
                          <div className="flex gap-1 mt-2">
                            {statusColumns
                              .filter((s) => s.key !== task.status)
                              .map((s) => (
                                <button key={s.key} onClick={() => moveTask(task.id, s.key)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                  → {s.label}
                                </button>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-muted p-3 text-xs text-muted-foreground text-center">
        <Sparkles className="h-3 w-3 inline mr-1" /> AI suggestions are for guidance. Adjust priorities based on your team's context.
      </div>
    </div>
  );
}
