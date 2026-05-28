"use client";

/**
 * Private messaging system.
 */

import {
  useEffect,
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
/* FETCHER */
/* ===================================================== */

const fetcher = async (
  url: string
): Promise<
  Conversation[] | ChatMessage[]
> => {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch"
    );
  }

  return response.json();
};

/* ===================================================== */
/* PAGE */
/* ===================================================== */

export default function MessagesPage() {
  /**
   * Current user.
   */
  const { user } =
    useCurrentUser();

  /**
   * Search params.
   */
  const searchParams =
    useSearchParams();

  const conversationParam =
    searchParams.get(
      "conversationId"
    );

  /**
   * Mobile chat mode.
   */
  const [
    mobileChatOpen,
    setMobileChatOpen,
  ] =
    useState(
      false
    );

  /**
   * Active conversation.
   */
  const [
    activeConversation,
    setActiveConversation,
  ] =
    useState<string | null>(
      null
    );

  /**
   * Input state.
   */
  const [
    content,
    setContent,
  ] =
    useState("");

  /* ===================================================== */
  /* CONVERSATIONS */
  /* ===================================================== */

  const {
    data:
      conversations = [],
    mutate:
      mutateConversations,
  } = useSWR<
    Conversation[]
  >(
    "/api/conversations",
    fetcher,
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
      messages,
    mutate,
    isLoading:
      messagesLoading,
  } = useSWR<
    ChatMessage[]
  >(
    activeConversation
      ? `/api/messages?conversationId=${activeConversation}`
      : null,
    fetcher,
    {
      refreshInterval:
        2000,
    }
  );

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
                  content,

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

      mutate();

      mutateConversations();
    } catch (
      error: unknown
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
      conversation?.participants?.find(
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

  return (
    <div
      className="
        flex
        h-[calc(100vh-140px)]
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
        {/* HEADER */}

        <div className="border-b border-slate-200 px-6 py-6">
          <h1 className="text-3xl font-black text-slate-900">
            Messages
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Private conversations
          </p>
        </div>

        {/* CONVERSATIONS */}

        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {conversations.length ===
            0 && (
            <div className="px-4 py-16 text-center">
              <p className="text-sm text-slate-500">
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
                <h3 className="font-semibold">
                  {getConversationName(
                    conversation
                  )}
                </h3>

                <p
                  className={`
                    mt-1
                    line-clamp-1
                    text-sm

                    ${
                      activeConversation ===
                      conversation.id
                        ? "text-blue-100"
                        : "text-slate-500"
                    }
                  `}
                >
                  {conversation
                    ?.messages?.[0]
                    ?.content ||
                    "Start chatting"}
                </p>
              </button>
            )
          )}
        </div>
      </div>

      {/* CHAT AREA */}

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
            lg:px-8
            lg:py-6
          "
        >
          {/* MOBILE BACK */}

          <button
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
              text-slate-700
              lg:hidden
            "
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <h2 className="text-xl font-black text-slate-900 lg:text-2xl">
            {currentConversation
              ? getConversationName(
                  currentConversation
                )
              : "Messages"}
          </h2>
        </div>

        {/* MESSAGES */}

        <div
          className="
            flex-1
            space-y-6
            overflow-y-auto
            px-4
            py-6
            lg:px-8
            lg:py-8
          "
        >
          {!activeConversation && (
            <div className="flex h-full items-center justify-center">
              <p className="text-slate-500">
                Select a conversation
              </p>
            </div>
          )}

          {messagesLoading ? (
            <MessageSkeleton />
          ) : messages?.length ===
            0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900">
                  No messages yet
                </h3>

                <p className="mt-3 text-slate-500">
                  Start the conversation by sending a message.
                </p>
              </div>
            </div>
          ) : (
            messages?.map(
              (
                message
              ) => {
                const isCurrentUser =
                  user?.id ===
                  message.user.id;

                return (
                  <div
                    key={
                      message.id
                    }
                    className={`flex ${
                      isCurrentUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[90%]
                        rounded-3xl
                        px-5
                        py-4
                        lg:max-w-[75%]

                        ${
                          isCurrentUser
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-900"
                        }
                      `}
                    >
                      <p className="text-xs font-bold opacity-70">
                        {
                          message.user
                            .name
                        }
                      </p>

                      <p className="mt-2 break-words leading-7">
                        {
                          message.content
                        }
                      </p>
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>

        {/* INPUT */}

        {activeConversation && (
          <div className="border-t border-slate-200 p-4 lg:p-6">
            <div className="flex items-center gap-3 lg:gap-4">
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
                  bg-white
                  px-5
                  text-sm
                  outline-none
                "
              />

              <button
                onClick={
                  handleSend
                }
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-600
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}