"use client";

import { useState } from "react";

const vocalWords = ["a", "i", "u", "e", "o"];

export function encrypt(text: string): string {
  const result: string[] = [];
  for (const char of text) {
    const charLower = char.toLowerCase();
    if (vocalWords.includes(charLower)) {
      result.push(`${char}g${charLower}`);
    } else {
      result.push(char);
    }
  }
  return result.join("");
}

export function decrypt(text: string): string {
  const result: string[] = [];
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    const charLower = char.toLowerCase();

    if (vocalWords.includes(charLower) && i + 2 < text.length) {
      if (text[i + 1].toLowerCase() === "g" && text[i + 2].toLowerCase() === charLower) {
        result.push(char);
        i += 3;
        continue;
      }
    }

    result.push(char);
    i += 1;
  }

  return result.join("");
}

export default function Encryptor() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [actionType, setActionType] = useState<"encrypt" | "decrypt" | null>(null);
  const [copied, setCopied] = useState(false);

  const handleEncrypt = () => {
    const encrypted = encrypt(inputText);
    setOutputText(encrypted);
    setActionType("encrypt");
    setCopied(false);
  };

  const handleDecrypt = () => {
    const decrypted = decrypt(inputText);
    setOutputText(decrypted);
    setActionType("decrypt");
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 p-8">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold text-white text-center mb-0">
          Crypto G Lang
        </h1>
        <p className="text-white text-md text-center">by <a href="https://x.com/chjwoo7" target="_blank">chjwoo7</a></p>

        <p className="text-white/80 text-lg text-center">
          This is a slang languange from Indonesia that is used when hanging out in the 90's
          You just need to insert letter "G" on every word you want to say
          For example:
          <br />
          <br />
          "Aku Ganteng" --&gt; "Agakugu Gagantegeng"
          <br />
          <br />
          "Kamu Cantik" --&gt; "Kagamugu Cagantigik"
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Enter your text:
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEncrypt();
                }
              }}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your text here..."
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEncrypt}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Encrypt
            </button>
            <button
              onClick={handleDecrypt}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Decrypt
            </button>
          </div>

          {outputText && (
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                {actionType === "encrypt" ? "Encrypted:" : "Decrypted:"}
              </label>
              <div className="relative px-4 py-2 rounded-lg bg-slate-700 text-white break-words">
                {outputText}
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 px-3 py-1 text-xs bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

