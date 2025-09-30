
  import { useEffect, useState } from "react";
  import { commandPalette } from "@/lib/aides";

  export default function Palette() {
    const [open, setOpen] = useState(false);
    const [log, setLog] = useState<any>(null);

    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setOpen(v=>!v);
        }
      };
      window.addEventListener("keydown", onKey as any);
      return () => window.removeEventListener("keydown", onKey as any);
    }, []);

    function run(cmd: string) { setLog(commandPalette(cmd)); }

    if (!open) return null;
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur z-[100]">
        <div className="max-w-lg mx-auto mt-24 card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">AIDES Command Palette</h3>
            <button className="btn" onClick={()=>setOpen(false)}>Close</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="btn" onClick={()=>run('map')}>NovaMPC: Intent Map</button>
            <button className="btn" onClick={()=>run('qa')}>Onyx: QA Sweep</button>
            <button className="btn" onClick={()=>run('status')}>Ping: Status</button>
          </div>
          <pre className="text-xs bg-white/5 border border-white/10 p-3 rounded-xl overflow-auto">
{JSON.stringify(log, null, 2)}
          </pre>
          <p className="text-xs text-white/50">Tip: Press Ctrl/⌘+K to toggle.</p>
        </div>
      </div>
    );
  }
