"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n";
import { chatSuggestions } from "@/i18n/chat";
import { getMessages } from "@/i18n/messages";
import {
  getStaticAIReply,
} from "@/utils/static-ai-chat";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const createMessageId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

const TYPING_REPLY_DELAY_MS = 1200;

export default function AIChatWidget() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith("/id/") || pathname === "/id" ? "id" : pathname.startsWith("/jv/") || pathname === "/jv" ? "jv" : "en";
  return <ChatPanel key={locale} locale={locale} />;
}

function ChatPanel({ locale }: { locale: Locale }) {
  const text = getMessages(locale).ui;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome-message", role: "assistant", content: text.chatWelcome },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages, isAssistantTyping]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const sendQuestion = (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isAssistantTyping) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedQuestion,
    };

    const assistantMessage: ChatMessage = {
      id: createMessageId(),
      role: "assistant",
    content: getStaticAIReply(trimmedQuestion, locale),
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInputValue("");
    setIsAssistantTyping(true);

    typingTimeoutRef.current = setTimeout(() => {
      setMessages((currentMessages) => [...currentMessages, assistantMessage]);
      setIsAssistantTyping(false);
      typingTimeoutRef.current = null;
    }, TYPING_REPLY_DELAY_MS);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendQuestion(inputValue);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {isOpen && (
        <section className="w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:w-[420px]">
          <header className="bg-gray-950 p-5 text-white dark:bg-gray-800">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-white/20 p-2 backdrop-blur">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-blue-200">
                    <Sparkles className="h-4 w-4" />
                    Static AI Assistant
                  </p>
                   <h2 className="text-xl font-semibold">{text.chatTitle}</h2>
                  <p className="mt-1 text-sm text-gray-300">
                     {text.chatIntro}
                  </p>
                </div>
              </div>

              <button
                 aria-label={text.chatClose}
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="max-h-[56vh] min-h-[360px] space-y-4 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-950">
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  {isAssistant && (
                    <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-blue-600 p-1.5 text-white">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isAssistant
                        ? "rounded-tl-sm border border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                        : "rounded-tr-sm bg-blue-600 text-white"
                    }`}
                  >
                    {message.content}
                  </div>

                  {!isAssistant && (
                    <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-gray-900 p-1.5 text-white dark:bg-gray-700">
                      <UserRound className="h-5 w-5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isAssistantTyping && (
              <div className="flex justify-start gap-3" aria-live="polite">
                <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-blue-600 p-1.5 text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
                   <span className="sr-only">{text.chatTyping}</span>
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
               {chatSuggestions[locale].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendQuestion(suggestion)}
                  disabled={isAssistantTyping}
                  className="shrink-0 rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/50 dark:hover:text-blue-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                 aria-label={text.chatInput}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={
                  isAssistantTyping
                     ? text.chatTyping
                     : text.chatPlaceholder
                }
                disabled={isAssistantTyping}
                className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-950"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isAssistantTyping}
                className="rounded-2xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700"
                 aria-label={text.chatSend}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-gray-400">
               {text.chatStatus}
            </p>
          </div>
        </section>
      )}

      <button
        onClick={() => setIsOpen((currentState) => !currentState)}
        className="group flex items-center gap-3 rounded-full bg-gray-950 px-5 py-4 text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white"
         aria-label={text.chatOpen}
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 dark:bg-gray-950/10">
          <MessageCircle className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-gray-950 bg-green-400 dark:border-white" />
        </span>
        <span className="hidden text-left sm:block">
           <span className="block text-sm font-semibold">{text.chatButton}</span>
           <span className="block text-xs opacity-70">{text.chatSubtitle}</span>
        </span>
      </button>
    </div>
  );
}
