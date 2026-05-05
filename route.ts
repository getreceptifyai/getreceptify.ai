import { NextResponse } from "next/server";
import { getEnv } from "@/lib/env";

const env = getEnv();
const ID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  if (params.id !== "demo" && !ID_REGEX.test(params.id)) {
    return NextResponse.json({ error: "Invalid receptionist id" }, { status: 400 });
  }

  const safeId = JSON.stringify(params.id);
  const safeOrigin = JSON.stringify(env.NEXT_PUBLIC_APP_URL);
  const script = `(function() {
    var receptionistId = ${safeId};
    var origin = ${safeOrigin};
    if (document.getElementById("ai-receptionist-launcher")) return;
    var button = document.createElement("button");
    button.id = "ai-receptionist-launcher";
    button.innerText = "Chat with us";
    button.style.cssText = "position:fixed;right:20px;bottom:20px;background:#3d57e8;color:#fff;border:none;border-radius:9999px;padding:12px 16px;font-family:Arial,sans-serif;cursor:pointer;z-index:2147483647;box-shadow:0 8px 24px rgba(0,0,0,.2)";

    var frame = document.createElement("iframe");
    frame.src = origin + "/widget/" + receptionistId;
    frame.style.cssText = "position:fixed;right:20px;bottom:80px;width:380px;max-width:calc(100vw - 24px);height:560px;border:none;border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,.24);z-index:2147483646;display:none;background:white";
    frame.title = "AI Receptionist";
    frame.loading = "lazy";

    button.onclick = function() {
      frame.style.display = frame.style.display === "none" ? "block" : "none";
    };

    document.body.appendChild(button);
    document.body.appendChild(frame);
  })();`;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
