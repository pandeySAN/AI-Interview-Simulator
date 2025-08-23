"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // Add this import for the cn function

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

interface AgentProps {
  userName: string;
  userId?: string;
  type?: string;
}

const Agent: React.FC<AgentProps> = ({ userName }) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    
    const messages = [
        'whats your name?',
        'my name is john doe, pleasure to meet you',
    ];
    const lastMessage = messages[messages.length - 1];

    const handleCallAction = () => {
        if (callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) {
            // Start the call
            setCallStatus(CallStatus.CONNECTING);
            
            // Simulate connection process
            setTimeout(() => {
                setCallStatus(CallStatus.ACTIVE);
            }, 2000);
        } else if (callStatus === CallStatus.ACTIVE) {
            // End the call
            setCallStatus(CallStatus.FINISHED);
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

    const isSpeaking = callStatus === CallStatus.ACTIVE;

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
            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                            {lastMessage}
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
                    <span>
                        {getButtonText()}
                    </span>
                </button>
            </div>
        </>
    );
};

export default Agent;