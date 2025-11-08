"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  userName: string;
  userId?: string;
  type?: string;
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent: React.FC<AgentProps> = ({ userName, userId }) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(
    CallStatus.INACTIVE
  );
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage: SavedMessage = {
          role: message.role,
          content: message.transcript,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: any) => console.log("Error:", error);

    vapi.on("callStart", onCallStart);
    vapi.on("callEnd", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speechStart", onSpeechStart);
    vapi.on("speechEnd", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("callStart", onCallStart);
      vapi.off("callEnd", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speechStart", onSpeechStart);
      vapi.off("speechEnd", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  // Redirect after call finishes
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) router.push("/");
  }, [callStatus, router]);

  // --- THIS IS THE CORRECTED FUNCTION ---
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    try {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
      // Once the promise resolves, the call has successfully started.
      setCallStatus(CallStatus.ACTIVE);
    } catch (e) {
      console.error("Error starting call:", e);
      // If an error occurs, reset the state.
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    setIsSpeaking(false);
    await vapi.stop();
  };

  const handleCallAction = () => {
    if (callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) {
      handleCall();
    } else if (callStatus === CallStatus.ACTIVE) {
      handleDisconnect();
    }
  };

  const getButtonText = () => {
    switch (callStatus) {
      case CallStatus.INACTIVE:
        return "Call";
      case CallStatus.CONNECTING:
        return "Connecting...";
      case CallStatus.ACTIVE:
        return "END";
      case CallStatus.FINISHED:
        return "Call Again";
      default:
        return "Call";
    }
  };

  const latestMessage = messages[messages.length - 1]?.content;

  return (
    <>
      <div className="call-view">
        <div className="card-Interview">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="User"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {/* Transcript section */}
      {latestMessage && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={messages.length - 1}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        <button
          onClick={handleCallAction}
          disabled={callStatus === CallStatus.CONNECTING}
          className={callStatus === CallStatus.ACTIVE ? "btn-disconnect" : ""}
        >
          <span>{getButtonText()}</span>
        </button>
      </div>
    </>
  );
};

export default Agent;