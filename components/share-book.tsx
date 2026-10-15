"use client";
import { useState } from "react";
import { Share2 } from "lucide-react";
export function ShareBook({ title, slug }: { title: string; slug: string }) {
  const [status, setStatus] = useState("");
  return (
    <div className="share-wrap">
      <button
        className="share-button"
        onClick={async () => {
          const url = `${window.location.origin}/books/${slug}`;
          try {
            if (navigator.share) {
              await navigator.share({ title, url });
              setStatus("Shared.");
            } else if (navigator.clipboard) {
              await navigator.clipboard.writeText(url);
              setStatus("Book link copied.");
            } else setStatus(`Share this link: ${url}`);
          } catch (e) {
            if (e instanceof Error && e.name !== "AbortError")
              setStatus(`Share this link: ${url}`);
          }
        }}
      >
        <Share2 size={16} /> Share book
      </button>
      <span className="share-status" role="status">
        {status}
      </span>
    </div>
  );
}
