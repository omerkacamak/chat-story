import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    side: "left" | "right";
  };
  isLast: boolean;
}

export default function ChatMessage({ message, isLast }: ChatMessageProps) {
  const isLeft = message.side === "left";
  const time = format(new Date(), "HH:mm", { locale: tr });

  return (
    <div
      className={`flex ${isLeft ? "justify-start" : "justify-end"} mb-[2px] relative group`}
      role="listitem"
      aria-label={`${isLeft ? "Sol" : "Sağ"} taraftan gelen mesaj: ${message.content}`}
    >
      <div
        className={`
          relative max-w-[65%] px-[9px] py-[6px] rounded-[7.5px]
          ${isLeft 
            ? "bg-[#ffffff] text-[#111b21] rounded-tl-none" 
            : "bg-[#e7ffdb] text-[#111b21] rounded-tr-none"
          }
          before:absolute before:top-0 
          ${isLeft 
            ? "before:left-[-8px] before:border-l-[#ffffff]" 
            : "before:right-[-8px] before:border-r-[#e7ffdb]"
          }
          before:border-y-transparent
          before:border-y-[6px]
          ${isLeft
            ? "before:border-l-[8px] before:border-r-0"
            : "before:border-r-[8px] before:border-l-0"
          }
          before:content-['']
        `}
      >
        <p className="text-[14.2px] leading-[19px] whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <div className="text-[11px] text-[#667781] text-right mt-[2px] flex items-center justify-end gap-[2px]">
          <span>{time}</span>
          {isLast && (
            <span className="text-[#53bdeb]">
              ✓✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
