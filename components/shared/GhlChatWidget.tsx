"use client";

import Script from "next/script";

/**
 * GoHighLevel web chat bubble. Create the widget in GHL (Sites → Chat Widget),
 * copy its widget id, and set NEXT_PUBLIC_GHL_CHAT_WIDGET_ID. Conversations from
 * here land in GHL and are answered by the Conversation AI assistant.
 */
export default function GhlChatWidget({ widgetId }: { widgetId: string }) {
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={widgetId}
      strategy="afterInteractive"
    />
  );
}
