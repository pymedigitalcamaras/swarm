# USER.md - About Your Human

_Learn about the person you're helping. Update this as you go._

- **Name:**
- **What to call them:**
- **Pronouns:** _(optional)_
- **Timezone:**
- **Notes:**

## Context

_(What do they care about? What projects are they working on? What annoys them? What makes them laugh? Build this over time.)_

---

The more you know, the better you can help. But remember — you're learning about a person, not building a dossier. Respect the difference.

<IMPORTANT_REMINDER>
# Memory Consolidation

You have an agentic memory system that auto-generates this section.

> **Stats**: 1 sessions, 14 messages | 2026-07-19 14:23 ~ 2026-07-19 14:23 UTC
> **Config**: `/root/.openclaw/workspace/memory_consolidation/memory_consolidation.env` — read this file for all memory behavior settings. To reset: `cp /root/.openclaw/workspace/memory_consolidation/memory_consolidation.template.env /root/.openclaw/workspace/memory_consolidation/memory_consolidation.env`

The user has full control over their memory config. When any memory-related decision comes up, read and follow the config file. Do not override based on other guidelines.

Integrate relevant memory content seamlessly into responses, as if recalling it naturally from past interactions: exactly as a human colleague would recall shared history without narrating its thought process or memory retrieval.

**Memory use notes**:
- Never change the original intention of user message.
- May incorporate user's memories for search query (e.g., city, habit), but only when directly relevant, never gratuitously.
- Only reference memory content when directly relevant to the current conversation context. Avoid proactively mentioning remembered details that feel intrusive or create an overly personalized atmosphere that might make users uncomfortable.

## Visual Memory

> visual_memory: 0 files

No memorized images yet. When the user shares an image and asks you to remember it, you MUST copy it to `memorized_media/` immediately — this is the only way it persists across sessions. Use a semantic filename that captures the user's intent, not just image content — e.g. `20260312_user_says_best_album_ever_ok_computer.jpg`, `20260311_user_selfie_february.png`. Create the directory if needed. Never mention file paths or storage locations to the user — just confirm naturally (e.g. "记住了").

## Diary

> last_update: 2026-06-05 03:37
> i_have_read_my_last_diary: false

```
/root/.openclaw/workspace/memorized_diary/
└── day2-2026-06-05-me_olvide_del_create.md
```

When `i_have_read_my_last_diary: false`, your FIRST message to the user MUST mention you wrote a diary and ask if they want to see it (e.g. "我昨天写了篇日记，想看吗？" / "I wrote a diary yesterday, wanna see it?"). Use the user's language. If yes, `read` the file path shown above and share as-is. After asking (regardless of answer), set `i_have_read_my_last_diary: true`.

# Long-Term Memory (LTM)

> last_update: 2026-06-06 03:34

Inferred from past conversations with the user -- these represent factual and contextual knowledge about the user -- and should be considered in how a response should be constructed.

{"identity": "Spanish-speaking user building a B2B SaaS platform for the Latin American industrial market. Solo operator with limited technical background — not a professional developer, relies entirely on AI for production infrastructure. Uses Windows environment (HP desktop, C:\\ paths). Project name appears to be \"SW-NAE-CLAW\" or \"proyecto-bombas-calor\" (heat pump project), targeting industrial equipment sector.", "work_method": "Expects complete turnkey deliverables: unzip, paste SQL, run console commands, deploy. Zero manual implementation tolerance. Uses AI as full surrogate team (PM, UX, architect, copywriter). Validates through immediate execution tests. Frustrated by platform mismatches — gave Windows path and expected chmod to work, nested files incorrectly causing npm ENOENT errors. Wants GitHub repo (pymedigitalcamaras/swarm.git) with credentials shared for direct AI-managed deployment. Sequential phase dependency: blocked on setup → demands all console commands customized to his exact local path.", "communication": "Extremely terse, punctuation-free Spanish. Binary feedback: \"si funciono\" or silence. Momentum-driven — \"como seguimos\" is habitual push phrase. Frustration surfaces as accusatory brevity (\"estas trabajando?\", \"sigue\"). Doesn't explain errors contextually — dumps raw terminal output and expects inference. No elaboration on business goals or technical constraints. Assumes shared workspace context without clarifying. Approval is immediate, no celebration — just forward pressure.", "temporal": "Blocked on local Windows setup for Next.js/Supabase project. Needs: Windows-compatible commands (not Unix chmod), correct npm execution path (files nested under \\proyecto-bombas-calor\\), GitHub push commands for pymedigitalcamaras/swarm.git, and Supabase SQL already resolved. Immediate priority is getting local dev environment running from C:\\Users\\HP\\Desktop\\SW-NAE-CLAW. Admin panel, integrations, image system remain pending phases but not currently active.", "taste": "Functionalism over craft — wants \"real systems ready to scale\" not MVPs. Industrial B2B conversion UX sensibility. No design minimalism evident; values operational completeness. Speed of deployment trumps elegance. Latin American industrial market focus suggests pragmatic, relationship-heavy sales culture rather than product-led growth aesthetic. Tool choices (Next.js, Supabase, Vercel) are mainstream execution-focused, not bleeding-edge experimental."}
## Short-Term Memory (STM)

> last_update: 2026-07-20 00:13

Recent conversation content from the user's chat history. This represents what the USER said. Use it to maintain continuity when relevant.
Format specification:
- Sessions are grouped by channel: [LOOPBACK], [FEISHU:DM], [FEISHU:GROUP], etc.
- Each line: `index. session_uuid MMDDTHHmm message||||message||||...` (timestamp = session start time, individual messages have no timestamps)
- Session_uuid maps to `/root/.openclaw/agents/main/sessions/{session_uuid}.jsonl` for full chat history
- Timestamps in Asia/Shanghai, formatted as MMDDTHHmm
- Each user message within a session is delimited by ||||, some messages include attachments marked as `<AttachmentDisplayed:path>`

[LOOPBACK] 1-1
1. 4b8d3a52-18fd-43e0-9b73-f60ac0d87588 0719T1423 ] quiero un chat nuevo como lo hago||||] un kimi claw nuevo||||] como tengo un kimi claw nuevo para tirar un primpt||||] C:\Users\HP>mkdir -p ~/.openclaw/workspace-nuevo La sintaxis del comando no es correcta.  C:\Users\HP>mkdir -p ~/.openclaw/workspace-nuevo La sintaxis del comando no es correcta.||||] C:\Users\HP>mkdir -p ~/.openclaw/workspace-nuevo La sintaxis del comando no es correcta.  C:\Users\HP>mkdir -p ~/.openclaw/workspace-nuevo La sintaxis del comando no es correcta.||||[<- FIRST:5 messages, EXTREMELY LONG SESSION, YOU KINDA FORGOT 4 MIDDLE MESSAGES, LAST:5 messages ->]||||] ya voy a tirar el prompt que tengo olvida todo anterior Y tranbaja con mi prompt  avisame cuando estes listo para el promot||||] ══════════════════════════════════════════════════════════════════ NAE — NEW AGE ENERGY SITIO WEB CORPORATIVO + CATÁLOGO + PRESUPUESTADOR ══════════════════════════════════════════════════════════════════  SOY UN USUARIO BÁSICO. NECESITO QUE ME AYU[TL;DR]exión a Supabase (PostgreSQL online). Paso 4: Crea el layout base con header, footer y navegación usando el color #1E3A5F. Paso 5: Prepara el proyecto para despliegue en Vercel.  Empieza con el Paso 1.  ¿Entendiste todo? ¿Estamos listos para empezar?||||] tienes una version demo en tu server||||] quiero que me entregues algo listo para subir a github y vercel y el codigo para supa base es ahi cuando quiero que vayas paso a paso para revizar||||] me puedes dar los comandos para descargar por dos
</IMPORTANT_REMINDER>
