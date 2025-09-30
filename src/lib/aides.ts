
export const aides = {
  NovaMPC: () => ({ note: 'Intent mapping simulated.' }),
  Onyx: () => ({ qa: 'Auto-QA passed locally.' }),
  Cipher: () => ({ sec: 'Basic checks stubbed.' }),
  Pulse: () => ({ schedule: 'Posting sequence simulated.' }),
  VOX: () => ({ tts: 'Narration placeholder.' }),
  Re: () => ({ video: 'Trailer stub.' }),
  Ledger: () => ({ rev: 'Snapshot stub.' }),
}
export function commandPalette(cmd: string) {
  switch (cmd) {
    case 'qa': return aides.Onyx()
    case 'map': return aides.NovaMPC()
    default: return { ok: true, cmd }
  }
}
