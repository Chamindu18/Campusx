"use client";

/**
 * Private messaging system.
 */

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import useSWR from "swr";

import {
  ArrowLeft,
  Send,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  useCurrentUser,
} from "@/hooks/use-current-user";

import {
  MessageSkeleton,
} from "@/components/ui/MessageSkeleton";

/* ===================================================== */
/* TYPES */
/* ===================================================== */

interface User {
  id: string;
  name: string;
}

interface Participant {
  user: User;
}

interface ChatMessage {
  id: string;
  content: string;
  user: User;
}

interface Conversation {
  id: string;
  participants: Participant[];
  messages: ChatMessage[];
}

/* ===================================================== */
/* FETCHERS */
/* ===================================================== */

const conversationsFetcher =
  async (
    url: string
  ): Promise<
    Conversation[]
  > => {
    const response =
      await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Failed to fetch conversations"
      );
    }

    return response.json();
  };

const messagesFetcher =
  async (
    url: string
  ): Promise<
    ChatMessage[]
  > => {
    const response =
      await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Failed to fetch messages"
      );
    }

    return response.json();
  };

/* ===================================================== */
/* PAGE */
/* ===================================================== */

export default function MessagesPage() {
  const { user } =
    useCurrentUser();

  const searchParams =
    useSearchParams();

  const conversationParam =
    searchParams.get(
      "conversationId"
    );

  const [
    mobileChatOpen,
    setMobileChatOpen,
  ] =
    useState(false);

  const [
    activeConversation,
    setActiveConversation,
  ] =
    useState<string | null>(
      null
    );

  const [
    content,
    setContent,
  ] =
    useState("");

  const messagesEndRef =
    useRef<HTMLDivElement>(
      null
    );

  /* ===================================================== */
  /* CONVERSATIONS */
  /* ===================================================== */

  const {
    data:
      conversations = [],
    mutate:
      mutateConversations,
    error:
      conversationsError,
  } = useSWR<
    Conversation[]
  >(
    "/api/conversations",
    conversationsFetcher,
    {
      refreshInterval:
        4000,
    }
  );

  /* ===================================================== */
  /* AUTO SELECT */
  /* ===================================================== */

  useEffect(() => {
    if (
      conversationParam
    ) {
      setActiveConversation(
        conversationParam
      );

      setMobileChatOpen(
        true
      );

      return;
    }

    if (
      conversations.length >
        0 &&
      !activeConversation
    ) {
      setActiveConversation(
        conversations[0]
          .id
      );
    }
  }, [
    conversations,
    activeConversation,
    conversationParam,
  ]);

  /* ===================================================== */
  /* MESSAGES */
  /* ===================================================== */

  const {
    data:
      messages = [],
    mutate,
    error:
      messagesError,
    isLoading:
      messagesLoading,
  } = useSWR<
    ChatMessage[]
  >(
    activeConversation
      ? `/api/messages?conversationId=${activeConversation}`
      : null,
    messagesFetcher,
    {
      refreshInterval:
        2000,
    }
  );

  /* ===================================================== */
  /* AUTO SCROLL */
  /* ===================================================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    );
  }, [messages]);

  /* ===================================================== */
  /* SEND MESSAGE */
  /* ===================================================== */

  async function handleSend() {
    if (
      !content.trim() ||
      !activeConversation
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          "/api/messages",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                {
                  content:
                    content.trim(),
                  conversationId:
                    activeConversation,
                }
              ),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok
      ) {
        toast.error(
          result.error ||
            "Failed to send"
        );

        return;
      }

      setContent("");

      await mutate();

      await mutateConversations();
    } catch (
      error
    ) {
      console.error(
        error
      );

      toast.error(
        "Failed to send message"
      );
    }
  }

  /* ===================================================== */
  /* CONVERSATION NAME */
  /* ===================================================== */

  function getConversationName(
    conversation: Conversation
  ) {
    const otherParticipant =
      conversation.participants.find(
        (
          participant
        ) =>
          participant.user
            .id !==
          user?.id
      );

    return (
      otherParticipant
        ?.user?.name ||
      "Unknown User"
    );
  }

  /* ===================================================== */
  /* ACTIVE CONVERSATION */
  /* ===================================================== */

  const currentConversation =
    conversations.find(
      (
        conversation
      ) =>
        conversation.id ===
        activeConversation
    );

  /* ===================================================== */
  /* ERROR STATE */
  /* ===================================================== */

  if (
    conversationsError
  ) {
    return (
      <div
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-3xl
            bg-white
            p-8
            text-center
          "
        >
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Failed to load conversations
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        min-h-[calc(100vh-140px)]

        overflow-hidden

        rounded-[32px]

        border
        border-white/40

        bg-white/70

        backdrop-blur-xl
      "
    >
      {/* SIDEBAR */}

      <div
        className={`
          ${
            mobileChatOpen
              ? "hidden lg:flex"
              : "flex"
          }

          w-full
          flex-col

          border-r
          border-slate-200

          bg-white/50

          lg:w-[340px]
        `}
      >
        <div
          className="
            border-b
            border-slate-200
            px-6
            py-6
          "
        >
          <h1
            className="
              text-3xl
              font-black
              text-slate-900
            "
          >
            Messages
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            Private conversations
          </p>
        </div>

        <div
          className="
            flex-1
            space-y-2
            overflow-y-auto
            p-4
          "
        >
          {conversations.length ===
            0 && (
            <div
              className="
                px-4
                py-16
                text-center
              "
            >
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                No conversations yet
              </p>
            </div>
          )}

          {conversations.map(
            (
              conversation
            ) => (
              <button
                key={
                  conversation.id
                }
                type="button"
                onClick={() => {
                  setActiveConversation(
                    conversation.id
                  );

                  setMobileChatOpen(
                    true
                  );
                }}
                className={`
                  w-full

                  rounded-2xl

                  px-5
                  py-4

                  text-left

                  transition

                  ${
                    activeConversation ===
                    conversation.id
                      ? "bg-blue-600 text-white"
                      : "bg-white/70 text-slate-700 hover:bg-white"
                  }
                `}
              >
                <h3
                  className="
                    truncate
                    font-semibold
                  "
                >
                  {getConversationName(
                    conversation
                  )}
                </h3>

                <p
                  className="
                    mt-2
                    truncate
                    text-sm
                    opacity-80
                  "
                >
                  {
                    conversation
                      .messages?.[
                      conversation
                        .messages
                        .length -
                        1
                    ]?.content
                  }
                </p>
              </button>
            )
          )}
        </div>
      </div>

      {/* CHAT */}

      <div
        className={`
          ${
            mobileChatOpen
              ? "flex"
              : "hidden lg:flex"
          }

          flex-1
          flex-col
        `}
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            gap-4

            border-b
            border-slate-200

            px-5
            py-5
          "
        >
          <button
            type="button"
            onClick={() =>
              setMobileChatOpen(
                false
              )
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-slate-100

              lg:hidden
            "
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <h2
              className="
                font-bold
                text-slate-900
              "
            >
              {currentConversation
                ? getConversationName(
                    currentConversation
                  )
                : "Conversation"}
            </h2>
          </div>
        </div>

        {/* MESSAGES */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-5
          "
        >
          {messagesLoading ? (
            <MessageSkeleton />
          ) : messagesError ? (
            <div
              className="
                text-center
                text-red-500
              "
            >
              Failed to load messages
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(
                (
                  message
                ) => {
                  const isOwn =
                    message.user
                      .id ===
                    user?.id;

                  return (
                    <div
                      key={
                        message.id
                      }
                      className={`flex ${
                        isOwn
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`
                          max-w-[85%]
                          rounded-3xl
                          px-5
                          py-4

                          ${
                            isOwn
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-900"
                          }
                        `}
                      >
                        <p
                          className="
                            break-words
                          "
                        >
                          {
                            message.content
                          }
                        </p>
                      </div>
                    </div>
                  );
                }
              )}

              <div
                ref={
                  messagesEndRef
                }
              />
            </div>
          )}
        </div>

        {/* INPUT */}

        <div
          className="
            border-t
            border-slate-200

            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <input
              value={
                content
              }
              onChange={(
                e
              ) =>
                setContent(
                  e.target
                    .value
                )
              }
              onKeyDown={(
                e
              ) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              className="
                h-14
                flex-1

                rounded-2xl

                border
                border-slate-200

                px-5

                outline-none
              "
            />

            <button
              type="button"
              onClick={
                handleSend
              }
              className="
                flex
                h-14
                w-14

                items-center
                justify-center

                rounded-2xl

                bg-blue-600

                text-white
              "
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}