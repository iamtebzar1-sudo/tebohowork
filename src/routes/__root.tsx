import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold gradient-brand-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md gradient-brand px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md gradient-brand px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ProdigyAI — AI Workplace Productivity Assistant" },
      { name: "description", content: "Automate repetitive workplace tasks with AI. Generate emails, summarize meetings, plan tasks, and more." },
      { property: "og:title", content: "ProdigyAI — AI Workplace Productivity Assistant" },
      { property: "og:description", content: "Automate repetitive workplace tasks with AI. Generate emails, summarize meetings, plan tasks, and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "ProdigyAI — AI Workplace Productivity Assistant" },
      { name: "twitter:description", content: "Automate repetitive workplace tasks with AI. Generate emails, summarize meetings, plan tasks, and more." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bde7d9a5-ceea-4eab-b161-b6a3b3b3b23b/id-preview-703229b8--7578447f-4f99-4d5c-9845-514ba73ac222.lovable.app-1778141022800.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bde7d9a5-ceea-4eab-b161-b6a3b3b3b23b/id-preview-703229b8--7578447f-4f99-4d5c-9845-514ba73ac222.lovable.app-1778141022800.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center justify-between border-b px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
              <SidebarTrigger />
              <ThemeToggle />
            </header>
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
