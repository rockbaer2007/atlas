# Sprint G2.5.3595 - ChatGPT Translation Adapter Path

Goal:

Connect the first real automatic Card translation path through Atlas Administration without exposing provider API keys to the Card Editor.

Deliverables:

* Added `/api/card-translation` to the Admin server
* Added ChatGPT/OpenAI translation via the OpenAI Responses API
* Kept provider API keys out of localStorage, cookies and Card Editor handoff
* Let the Card Editor request translated locale files through the Admin server
* Marked successful machine translated locale files with `status: "machine"`
* Added `ATLAS_OPENAI_TRANSLATION_MODEL` as the server-side model override

Status:

Completed.
