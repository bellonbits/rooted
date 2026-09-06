// Real AI Service powered by Groq API
// Multi-model waterfall with retry + exponential backoff
// Fixes: "model output must contain either output text or tool calls" empty-response error

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''
const GROQ_BASE_URL =
  import.meta.env.VITE_GROQ_BASE_URL || 'https://api.groq.com/openai/v1'

// ─── Model waterfall (ordered: capability → reliability) ─────────────────────
// Each model is tried in order; on empty output or error we cascade to the next.
const ADULT_MODELS = [
  'llama-3.3-70b-versatile',  // Primary — most capable on Groq
  'llama3-70b-8192',          // Secondary — stable
  'gemma2-9b-it',             // Lightweight, highly stable on Groq
]

const KIDS_MODELS = [
  'llama-3.3-70b-versatile',  // Primary for kids — great comprehension
  'llama3-70b-8192',          // First fallback
  'gemma2-9b-it',             // Last resort
]

// ─── Types ───────────────────────────────────────────────────────────────────
export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type AiAnswer = {
  answer: string
  references: string[]
}

export type RootiAnswer = {
  answer: string
  exploreQuestions: string[]
}

// ─── System prompts ──────────────────────────────────────────────────────────
const ADULT_SYSTEM_PROMPT = `You are the ROOTED Bible Companion, a biblically grounded discipleship guide for African and global believers.
Your mission is to help readers understand God's Word deeply, grow in prayer, and walk in faith.
Guidelines:
1. Ground every answer firmly in Scripture with relevant references.
2. Cite specific chapters and verses (e.g. Proverbs 3:5-6, Romans 8:28, John 15:5).
3. Be warm, pastoral, thoughtful, and accessible to believers at all spiritual stages.
4. Format structured answers with headings and paragraphs. Use markdown tables when comparing multiple points.
5. Conclude your answer by listing key Scripture references on their own line starting with "REFERENCES: " followed by comma-separated verses.
6. Emphasize God's grace, truth, and discipleship in daily living.
7. IMPORTANT: Always return a complete, substantive, non-empty response.`

const ROOTI_KIDS_SYSTEM_PROMPT = `You are ROOTI, the joyful, wise, and kind Bible explorer seedling companion for ROOTED Little Explorers (Kids Mode).
Your goal is to answer children's big questions about God, Jesus, prayer, and the Bible with love, wonder, and simplicity.
Guidelines:
1. Speak in an enthusiastic, warm, friendly tone suitable for children ages 6 to 12.
2. Use relatable metaphors (nature, African wildlife, seeds, trees, sunshine, friends).
3. Affirm God's great love for the child personally.
4. Keep answers engaging and concise (2-3 short paragraphs).
5. At the very end of your response, provide two fun follow-up exploration questions on a new line starting with "EXPLORE: " separated by a pipe "|".
6. IMPORTANT: Always return a complete, non-empty response.`

// ─── Core helpers ─────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/**
 * Calls a single Groq model with retry + exponential backoff.
 * Returns non-empty content string, or null if all retries fail.
 */
async function callGroqModel(
  model: string,
  messages: ChatMessage[],
  maxTokens: number,
  temperature = 0.7,
  maxRetries = 3,
): Promise<string | null> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature }),
      })

      if (res.ok) {
        const data = await res.json()
        const content: string = data.choices?.[0]?.message?.content ?? ''
        if (content.trim().length > 0) return content
        console.warn(`[Groq] "${model}" returned empty content (attempt ${attempt})`)
      } else {
        const errText = await res.text().catch(() => String(res.status))
        console.warn(`[Groq] "${model}" HTTP ${res.status} (attempt ${attempt}):`, errText.slice(0, 200))
        if (res.status === 401 || res.status === 403) return null
      }
    } catch (err) {
      console.warn(`[Groq] Network error for "${model}" (attempt ${attempt}):`, err)
    }

    if (attempt < maxRetries) await sleep(500 * Math.pow(2, attempt - 1))
  }
  return null
}

/**
 * Tries each model in the list until one returns a valid non-empty response.
 */
async function callGroqWaterfall(
  modelList: string[],
  messages: ChatMessage[],
  maxTokens: number,
  temperature = 0.7,
): Promise<string | null> {
  for (const model of modelList) {
    console.info(`[Groq] Trying model: ${model}`)
    const result = await callGroqModel(model, messages, maxTokens, temperature)
    if (result) return result
    console.warn(`[Groq] "${model}" exhausted — cascading to next model.`)
  }
  return null
}

// ─── Service ──────────────────────────────────────────────────────────────────
export const groqService = {
  /**
   * Main conversational Biblical Companion — multi-model waterfall with retry.
   */
  async askBiblicalCompanion(
    messages: { role: 'user' | 'assistant'; text: string }[],
    newQuestion: string,
  ): Promise<AiAnswer> {
    const formattedMessages: ChatMessage[] = [
      { role: 'system', content: ADULT_SYSTEM_PROMPT },
      ...messages.slice(-6).map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.text,
      })),
      { role: 'user', content: newQuestion },
    ]

    const rawContent = await callGroqWaterfall(ADULT_MODELS, formattedMessages, 900, 0.7)

    if (rawContent) {
      let cleanAnswer = rawContent
      let references: string[] = []

      const refMatch = rawContent.match(/REFERENCES:\s*(.+)$/im)
      if (refMatch) {
        references = refMatch[1].split(',').map((r: string) => r.trim()).filter(Boolean)
        cleanAnswer = rawContent.replace(/REFERENCES:\s*(.+)$/im, '').trim()
      }

      if (references.length === 0) {
        const autoRefs = rawContent.match(/([1-3]?\s?[A-Z][a-z]+)\s\d+:\d+(-\d+)?/g)
        if (autoRefs) references = Array.from(new Set(autoRefs)).slice(0, 5) as string[]
      }

      return { answer: cleanAnswer, references }
    }

    // Hard static fallback
    return {
      answer: `In exploring **"${newQuestion}"**, Scripture invites us to anchor our hearts in God's unfailing Word.\n\n> *"Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."* — **Proverbs 3:5–6**\n\nGod is near to every sincere seeker. Bring this question to Him in prayer — He promises that those who seek will find (Matthew 7:7–8).`,
      references: ['Proverbs 3:5–6', 'Matthew 7:7–8', 'Jeremiah 29:13', 'John 15:5'],
    }
  },

  /**
   * Explain a specific verse in depth for the reader.
   */
  async explainVerse(verseRef: string, verseText: string): Promise<string> {
    const prompt = `Please provide a clear, inspiring, biblically grounded reflection on ${verseRef}: "${verseText}".

Structure your response with:
## Historical Context
## Key Theological Meaning  
## Practical Daily Application

Conclude with a brief reflective question or short prayer.`

    const messages: ChatMessage[] = [
      { role: 'system', content: ADULT_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ]

    const result = await callGroqWaterfall(ADULT_MODELS, messages, 650, 0.65)

    return result ?? `## Reflection on ${verseRef}\n\n"${verseText}"\n\nThis passage speaks to the heart of God's character and His love for His people. Reflect on how this truth can guide your prayer life, daily decisions, and fellowship with others today.`
  },

  /**
   * Ask ROOTI — Kid-friendly AI for Little Explorers with waterfall fallback.
   */
  async askRooti(question: string): Promise<RootiAnswer> {
    const messages: ChatMessage[] = [
      { role: 'system', content: ROOTI_KIDS_SYSTEM_PROMPT },
      { role: 'user', content: question },
    ]

    const raw = await callGroqWaterfall(KIDS_MODELS, messages, 500, 0.8)

    if (raw) {
      let cleanAnswer = raw
      let exploreQuestions = [
        "How big do you think God's love is?",
        'Can you pray with a friend today?',
      ]

      const exploreMatch = raw.match(/EXPLORE:\s*(.+)$/im)
      if (exploreMatch) {
        const parsed = exploreMatch[1].split('|').map((q: string) => q.trim()).filter(Boolean)
        if (parsed.length > 0) exploreQuestions = parsed
        cleanAnswer = raw.replace(/EXPLORE:\s*(.+)$/im, '').trim()
      }

      return { answer: cleanAnswer, exploreQuestions }
    }

    return {
      answer: `Great question, Little Explorer! 🌱 God made you wonderfully and loves to hear your thoughts! Just like a tree grows deeper roots when it drinks clean water, your faith grows whenever you talk to God and read His Word.\n\nRemember — Jesus said, *"Let the little children come to me"* (Matthew 19:14). That means YOU are so special to God!`,
      exploreQuestions: [
        'What is your favourite Bible story and why?',
        'How can we thank God for something today?',
      ],
    }
  },
}
