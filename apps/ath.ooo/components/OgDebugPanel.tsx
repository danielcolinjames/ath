"use client";

import { useState } from "react";

interface OgDebugPanelProps {
  ogUrl: string;
}

export function OgDebugPanel({ ogUrl }: OgDebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/80 hover:bg-black text-xs text-white/60 hover:text-white/90 px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all"
      >
        {isOpen ? "Close OG Preview" : "Open OG Preview"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-black/90 p-6 rounded-xl border border-white/10 w-[90vw] max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white/80 text-sm font-mono">
                OG Image Preview
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white/90"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-full bg-black/50 rounded-lg overflow-hidden">
                <iframe
                  src={ogUrl}
                  className="w-full aspect-[1200/630] border-0 scale-100 transform-gpu"
                />
              </div>

              <div className="p-3 bg-black/50 rounded-lg">
                <p className="text-white/60 text-xs font-mono break-all">
                  {ogUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
