"use client";

import { useTransition } from "react";
import { Check, Circle, Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Message } from "@/db/schema";
import { deleteMessage, markMessageRead } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatDate(iso: Date | string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MessagesManager({ messages }: { messages: Message[] }) {
  const [pending, startTransition] = useTransition();

  function mark(id: string, read: boolean) {
    startTransition(async () => {
      const result = await markMessageRead(id, read);
      if (result.status === "error") toast.error(result.message);
      else toast.success(result.message);
    });
  }

  function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    startTransition(async () => {
      const result = await deleteMessage(id);
      if (result.status === "error") toast.error(result.message);
      else toast.success(result.message);
    });
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/70 bg-card/40 px-6 py-10 text-center text-sm text-muted-foreground">
        No contact messages yet — they&apos;ll appear here as soon as someone writes to you.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {messages.map((msg) => {
        const unread = msg.readAt === null;
        return (
          <li
            key={msg.id}
            className={cn(
              "rounded-xl border border-border/60 bg-card/40 p-4",
              unread && "border-primary/40 bg-primary/5"
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                {unread ? (
                  <Circle className="size-2 shrink-0 fill-primary text-primary" />
                ) : (
                  <Check className="size-3.5 shrink-0 text-muted-foreground" />
                )}
                <p className="truncate font-semibold">
                  {msg.name}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    &lt;{msg.email}&gt;
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={unread ? "Mark as read" : "Mark as unread"}
                  disabled={pending}
                  onClick={() => mark(msg.id, unread)}
                >
                  {unread ? <Check className="size-4" /> : <Mail className="size-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Delete message"
                  className="text-destructive hover:text-destructive"
                  disabled={pending}
                  onClick={() => remove(msg.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            {msg.subject && (
              <p className="mt-1 pl-5 text-sm font-medium">{msg.subject}</p>
            )}
            <p className="mt-2 whitespace-pre-line pl-5 text-sm leading-relaxed text-muted-foreground">
              {msg.message}
            </p>
            <p className="mt-2 pl-5 font-mono text-xs text-muted-foreground/70">
              {formatDate(msg.createdAt)}
            </p>
            <a
              href={`mailto:${msg.email}?subject=Re:%20${encodeURIComponent(msg.subject ?? "your message")}`}
              className="mt-2 inline-block pl-5 text-sm text-primary underline-offset-4 hover:underline"
            >
              Reply by email
            </a>
          </li>
        );
      })}
    </ul>
  );
}
