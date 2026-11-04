"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { BookOpen, FlaskConical, FolderGit2, Briefcase, LogOut, MailOpen } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { AdminData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  buildLogConfig,
  experienceConfig,
  projectConfig,
  researchConfig,
} from "@/components/admin/entity-configs";
import { EntityManager } from "@/components/admin/entity-manager";
import { MessagesManager } from "@/components/admin/messages-manager";

type AdminDataTyped = Omit<AdminData, never> & Record<string, unknown>;

export function AdminDashboard({ data }: { data: AdminDataTyped }) {
  const [, startTransition] = useTransition();
  const router = useRouter();

  function signOut() {
    startTransition(async () => {
      await authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/admin/login") } });
    });
  }

  const stats = [
    { icon: FolderGit2, label: "Projects", value: data.projects.length },
    { icon: FlaskConical, label: "Research", value: data.research.length },
    { icon: BookOpen, label: "Build log", value: data.buildLog.length },
    { icon: Briefcase, label: "Experience", value: data.experience.length },
    { icon: MailOpen, label: "Messages", value: data.messages.length },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage projects, research, build log, experience, and contact messages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono">
            Owner
          </Badge>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm"
          >
            <s.icon className="mb-2 size-4 text-primary" />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="projects">
        <TabsList className="flex-wrap">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="build-log">Build Log</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="messages">
            Messages
            {data.messages.some((m) => m.readAt === null) && (
              <span className="ml-1.5 inline-block size-2 rounded-full bg-primary" />
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-4">
          <EntityManager config={projectConfig} rows={data.projects} />
        </TabsContent>
        <TabsContent value="research" className="mt-4">
          <EntityManager config={researchConfig} rows={data.research} />
        </TabsContent>
        <TabsContent value="build-log" className="mt-4">
          <EntityManager config={buildLogConfig} rows={data.buildLog} />
        </TabsContent>
        <TabsContent value="experience" className="mt-4">
          <EntityManager config={experienceConfig} rows={data.experience} />
        </TabsContent>
        <TabsContent value="messages" className="mt-4">
          <MessagesManager messages={data.messages} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
