"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { getSessions, disconnectSession, connect } from "./connect.service";
import { useConnectStore } from "./connect.store";

interface Session {
  topic: string;
  peer: {
    metadata: {
      name: string;
      description: string;
      url: string;
      icons: string[];
    };
  };
}

export const ConnectSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const status = useConnectStore((state) => state.status);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        setLoading(true);
        const activeSessions = await getSessions();
        const sessionList = Object.values(activeSessions) as Session[];
        setSessions(sessionList);
      } catch (error) {
        console.error("Failed to load sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, [status]);

  const handleReconnect = async (topic: string) => {
    try {
      // The session is already active, just update status
      toast.success("Reconnected to session");
      useConnectStore.getState().setStatus("connected");
    } catch (error) {
      console.error("Failed to reconnect:", error);
      toast.error("Failed to reconnect");
    }
  };

  const handleDelete = async (topic: string) => {
    try {
      await disconnectSession(topic);
      setSessions(sessions.filter((s) => s.topic !== topic));
    } catch (error) {
      console.error("Failed to delete session:", error);
      // disconnectSession already shows a toast error
    }
  };

  // Don't show if connected, loading, or no sessions
  if (status === "connected" || loading || sessions.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Previous Sessions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {sessions.map((session) => (
          <div
            key={session.topic}
            className="flex items-center justify-between gap-3 rounded-lg border p-3"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {session.peer.metadata.icons?.[0] && (
                <img
                  src={session.peer.metadata.icons[0]}
                  alt={session.peer.metadata.name}
                  className="size-10 rounded-lg "
                />
              )}
              <div className="flex flex-col min-w-0">
                <p className="font-semibold text-sm line-clamp-1">
                  {session.peer.metadata.name}
                </p>
                <p className="text-xs text-muted-foreground truncate line-clamp-1">
                  {session.peer.metadata.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleReconnect(session.topic)}>
                Reconnect
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleDelete(session.topic)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
