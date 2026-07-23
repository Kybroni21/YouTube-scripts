# "9 Signs You're More Emotionally Intelligent Than You Realize"
## Full production package — Bright Side–style faceless video

- **Runtime:** 7:00 exactly (28 blocks × 15 seconds)
- **Video model:** Seedance 2.0 (Higgsfield), `mode: std`, `resolution: 1080p`, `aspect_ratio: 16:9`, `generate_audio: false`, `duration: 15`
- **Voiceover:** Seed Audio 1.0 (`seed_audio`), one preset voice reused on all 28 blocks (suggested: **John** `6b528d43-c056-4a2f-9d82-1591a7ba13b0` or **Callum** `858499d9-fef5-40e1-bc29-b4dc661dc283`, both `voice_type: preset`)
- **Assembly:** Higgsfield `explainer_video` tool, `width: 1920, height: 1080`, blocks in order 1→28, each `{video: <clip job id>, audio: <voice job id>}`
- **Style lock:** generate ONE 16:9 style-reference image first (prompt below) and attach its job id as `image_references` on every clip so the look never drifts.

### ⚠️ Budget note (as of 2026-07-23)
One 15s Seedance 2.0 clip at 1080p/std = **135 credits** → 28 clips ≈ **3,780 credits** (+ ~30 for voiceover/subtitles). Account balance at time of writing: **856 credits**. Options:
1. Top up credits and run as specified below.
2. Run `mode: fast`, `resolution: 720p` (much cheaper) and upscale the assembled video to 1080p with `upscale_video`.
3. Run a 1-minute pilot first (blocks 1–4 + block 28).

---

## Style reference image (generate first, nano_banana_pro, 16:9)

> Style reference frame for a cinematic faceless YouTube video: warm inviting lifestyle scene, soft golden-hour window light, muted teal and amber color grade, shallow depth of field, clean modern interior, subtle film grain, high production value, no visible faces, no text, no watermark.

Attach the resulting **job id** as `image_references` on every clip below.

## Global negative prompt (append to every clip)

> NEGATIVE: on-screen text, captions, subtitles, watermark, logo, lip-sync, talking to camera, distorted hands, color drift, flicker.

Faces may appear but never talk to camera (faceless-channel rule: no presenter, no lip-sync).

---

## The 28 blocks

Each block = one 15s Seedance clip + one ~13s voice take. VO lines are written to land at ~12–13 seconds of speech (~32–36 words). Numbers are spelled out for TTS.

### Block 1 — Cold open hook
**VO:** Ever met someone who just gets it? They read a room in seconds, never take things personally, and always know exactly what to say. You would think they were simply born that way.
**CLIP:** Cinematic slow push-in across a lively dinner party; one calm person listens intently while others gesture animatedly; warm golden light, shallow focus shifting between faces and hands; no one addresses camera.

### Block 2 — Hook payoff + promise
**VO:** But psychologists say emotional intelligence is not a personality trait. It is a set of habits. And here is the surprising part: you might already have far more of them than you think.
**CLIP:** Overhead shot of an open notebook beside coffee, pen writing invisible notes, morning window light; slow drift upward; papers with blurred (illegible) diagrams; calm, thoughtful mood.

### Block 3 — Roadmap tease
**VO:** Today we are counting down nine signs you are more emotionally intelligent than you realize. Stay with us, because sign number six is the one almost nobody notices about themselves.
**CLIP:** Stylized montage: rapid but smooth cuts of everyday moments — a pause mid-argument, a hand on a shoulder, a deep breath by a window — connected by elegant match-cut motion; teal-amber grade.

### Block 4 — Sign 9, part 1: the pause
**VO:** Number nine: you pause before reacting. When something upsets you, your first instinct is not to fire back. It is to take a beat. Maybe you count to five. Maybe you just go quiet.
**CLIP:** Close-up of hands tightening on a phone showing a heated (blurred) message, then relaxing; person exhales, sets phone face-down; slow-motion, soft evening lamp light.

### Block 5 — Sign 9, part 2: why it matters
**VO:** That tiny pause means your brain is routing the reaction through logic before it reaches your mouth. Most people never even register they are doing it. But pausing is just the warm-up.
**CLIP:** Abstract-but-real visual: subway train doors closing as a commuter steps back calmly instead of rushing; metaphor for restraint; smooth tracking shot, city dusk tones.

### Block 6 — Sign 8, part 1: reading moods
**VO:** Number eight: you notice moods before words. You walk into a room and instantly sense something is off with a friend, before they have said a single thing. Their posture. Their tone.
**CLIP:** Office scene: across a busy open workspace, one person glances up and notices a colleague sitting slumped at a distant desk; rack focus from foreground bustle to the quiet figure.

### Block 7 — Sign 8, part 2: the text message
**VO:** The laugh that came a little too fast. If you have ever texted someone, hey, are you okay, before they told you anything was wrong, that is exactly this skill at work.
**CLIP:** Close-up over-shoulder of a phone, thumb typing a short caring message; warm café ambience, steam rising from a cup; gentle handheld feel; message text blurred and unreadable.

### Block 8 — Sign 7, part 1: naming feelings
**VO:** Number seven: you can name what you are feeling, precisely. Not just, I am upset, but, I am disappointed because I expected something different. Psychologists call this emotional granularity.
**CLIP:** Person journaling at a wooden desk at night, desk lamp glow; slow orbit around them; pages turning; rain on the window; contemplative and calm.

### Block 9 — Sign 7, part 2: why granularity wins
**VO:** And it is one of the strongest predictors of emotional intelligence there is. The more precisely you can label a feeling, the easier it becomes to handle it instead of drowning in it.
**CLIP:** Visual metaphor: tangled ball of colored threads being slowly, patiently separated into distinct strands by careful hands on a clean table; macro shot, satisfying orderly motion.

### Block 10 — Sign 6, part 1: understand over win
**VO:** Number six: you would rather understand than be right. In an argument, your first instinct is not to win. It is to figure out why the other person sees it so differently.
**CLIP:** Two silhouettes at a kitchen table mid-discussion; one leans forward and visibly softens, nodding slowly; evening window light between them; respectful, de-escalating body language.

### Block 11 — Sign 6, part 2: the invisible skill
**VO:** That does not mean you have no opinions. It means you can set the need to be right aside long enough to hear something new. It feels like being reasonable. It is actually rare.
**CLIP:** Chess board from above, a hand hovering over a piece, then withdrawing to study the whole board instead; slow zoom out revealing the full position; library ambience.

### Block 12 — Midpoint re-hook
**VO:** Quick question before we continue: how many signs have matched you so far? Keep count, because by the end of this list, your score is going to tell you something important.
**CLIP:** Stylish tally-mark motif: chalk lines being drawn on a slate board by hand, four marks and a fifth crossing them; dramatic side light; dust particles in the light beam.

### Block 13 — Sign 5, part 1: clean apologies
**VO:** Number five: you apologize without keeping score. You can say, I am sorry, that came out wrong, without instantly adding, but you also did this. No trade. No conditions attached.
**CLIP:** Doorway scene: one person gently knocks on a half-open door holding two cups of tea; the other looks up from a couch; tension visibly dissolving; soft warm interior light.

### Block 14 — Sign 5, part 2: maintenance not surrender
**VO:** Low emotional intelligence treats an apology like a transaction. High emotional intelligence treats it like maintenance, something you do to keep a relationship healthy, whether or not the other person matches you.
**CLIP:** Metaphor visual: hands carefully repairing a cracked ceramic bowl with gold lacquer, kintsugi style; macro detail, glowing gold seams; serene workshop atmosphere.

### Block 15 — Sign 4, part 1: sitting with discomfort
**VO:** Number four: you can sit with boredom and even discomfort without needing to fix it immediately. Reaching for a phone the second a feeling gets uncomfortable is the most common habit there is.
**CLIP:** Person on a train by the window, phone in pocket buzzing; they leave it, watching the landscape roll past instead; reflective glass, passing golden fields; peaceful long take.

### Block 16 — Sign 4, part 2: distress tolerance
**VO:** If you can notice, I am anxious right now, and simply let that be true for a minute instead of numbing it, that is a real skill most adults never build.
**CLIP:** Ocean waves rolling onto a shore at dawn while a figure sits still on the sand, breathing; wide cinematic shot, waves arriving and receding rhythmically; cool-to-warm gradient sky.

### Block 17 — Sign 3, part 1: ask before advising
**VO:** Number three: you ask before you advise. A friend brings you a problem, and your first move is a question. What do you think you should do? Not an instant solution.
**CLIP:** Park bench conversation: one person talking with animated worry, the other simply listening, then asking something short; pigeons, autumn leaves drifting; unhurried two-shot.

### Block 18 — Sign 3, part 2: whose comfort is it
**VO:** Because jumping straight to fixing someone's problem often comes from your discomfort with their emotion, not their actual need. Giving people room to think out loud is a quiet superpower.
**CLIP:** Symbolic shot: a hand offering an open palm rather than pointing; then wide shot of two people walking slowly along a river path at dusk, unrushed; long lens compression.

### Block 19 — Sign 2, part 1: criticism stings
**VO:** Number two: criticism stings, but you still hear it. And here is the twist. Emotionally intelligent people are not the ones who feel nothing when feedback lands hard. They feel it fully.
**CLIP:** Close-up of a person reading printed feedback notes, jaw tightening briefly, a slow breath; then they pick up a pen and underline something; honest, restrained emotion; office at dusk.

### Block 20 — Sign 2, part 2: feel it and function
**VO:** The difference is they do not let the sting stop them from processing what was said. Numbness is not emotional intelligence. Feeling it and still functioning, that is the real skill.
**CLIP:** Boxer in an empty gym lowering their guard, nodding at a coach's gesture, then resetting their stance with focus; cinematic rim lighting, chalk dust in the air; determination not anger.

### Block 21 — Sign 1, part 1: knowing your triggers
**VO:** And finally, number one, the sign that ties everything together: you know your own triggers. Over time, you have noticed exactly what kind of comment, tone, or situation sets you off.
**CLIP:** Person pausing at their reflection in a darkened window at night, city lights beyond; calm self-recognition, not vanity; slow dolly-in; quiet contemplative score-friendly pacing.

### Block 22 — Sign 1, part 2: seeing it coming
**VO:** So instead of being blindsided every single time, you see it coming. And you cannot manage a reaction you never see coming. Every other sign on this list depends on this one.
**CLIP:** Weather metaphor: storm clouds gathering over a coastal lighthouse whose beam sweeps steadily through the darkening sky; the storm arrives, the light keeps turning; epic wide shot.

### Block 23 — Bonus sign tease
**VO:** But wait, we promised nine signs and a little extra. Here is a bonus sign that surprises almost everyone, because it looks like a weakness right up until you understand it.
**CLIP:** Curtain-reveal energy: door opening from a dim hallway into a bright room; camera glides through the doorway toward soft light; anticipation without any text or characters speaking.

### Block 24 — Bonus sign: feeling deeply
**VO:** You feel things deeply, sometimes too deeply. Strong emotions are not the opposite of emotional intelligence. They are the raw material. Sensitivity plus self-awareness is exactly what mastery is made of.
**CLIP:** Orchestra string section mid-performance, bows moving in unison, a single violinist's expressive focus in close-up; concert hall glow; powerful but controlled emotion; no singing or speech.

### Block 25 — Recap, part 1
**VO:** So let us recap. Pausing before reacting. Reading moods before words. Naming feelings precisely. Choosing understanding over winning. Apologizing without keeping score. How many of those sounded like you?
**CLIP:** Elegant rapid montage revisiting earlier scenes — the phone set down, the noticing glance, the journal, the softened argument, the two cups of tea — smooth match cuts, rising momentum.

### Block 26 — Recap, part 2 + scoring
**VO:** Add sitting with discomfort, asking before advising, hearing criticism without shutting down, and knowing your triggers. If even three or four match you, you are carrying more emotional intelligence than you admit.
**CLIP:** Montage continues — the train window, the park bench, the boxer's reset, the lighthouse — ending on a sunrise over a waking city; hopeful crescendo pacing.

### Block 27 — Comment bait + CTA
**VO:** Which sign hit closest to home for you? Tell us your number in the comments below. And if you made it this far, you are exactly the kind of viewer we make these videos for.
**CLIP:** Cozy creator-desk scene without a person: glowing screen showing a blurred comment feed, plant, headphones on a hook; camera slowly pulls back; warm inviting end-of-video mood.

### Block 28 — Outro
**VO:** Subscribe and turn on notifications so you never miss what we uncover next. Because next time, we are revealing the seven habits that quietly destroy even the smartest people's focus.
**CLIP:** Signature outro shot: sun flare through clouds over a bright horizon, camera tilting up from a winding road to open sky; uplifting, clean, loopable ending; no text or logos.

---

## Run order (Higgsfield MCP)

1. `generate_image` (nano_banana_pro, 16:9) → style key job id.
2. 28 × `generate_video` (seedance_2_0, 15s, 1080p/std, generate_audio:false, style key as `image_references`) — batch, poll `job_status`.
3. `list_voices` → pick narrator → 28 × `generate_audio` (seed_audio, same voice_id/voice_type, `speech_rate` tuned so each take ≤ ~14s).
4. `explainer_video` — items 1→28 `{video, audio}`, width 1920, height 1080. Optional subtitles: `{font: "anton"}` (+0.05 credit/block).
5. Optional: `upscale_video` if the 720p/fast route was used instead.

## Thumbnail (youtube-thumbnail-generator workflow)
Concept: split frame — left: person mid-argument (mouth open, tense); right: same person calm, slight knowing smile; bold baked text zone reserved for "YOU'RE SMARTER THAN YOU THINK"; red arrow to the calm side. Render 4K via nano_banana_pro.
