"use client";

import { QRCodeSVG } from "qrcode.react";

export function WhatsAppQr({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-block rounded-md bg-white p-2"
    >
      <QRCodeSVG value={url} size={112} level="M" marginSize={4} />
    </a>
  );
}
