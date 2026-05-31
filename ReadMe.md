# ⚖️ Legal Enquiry Triage — n8n Workflow

> An AI-powered legal enquiry intake and triage system built with n8n, designed to automatically classify, route, and acknowledge client enquiries for a UK law firm.

---

## 📌 Overview

This workflow automates the end-to-end process of receiving and triaging legal enquiries submitted via a web form. It verifies the client's identity, uses an AI agent to classify the nature of the enquiry, routes it to the correct legal team, and keeps the client informed — all without manual intervention.

Built as part of my journey into legal technology, this project sits at the intersection of law, automation, and AI.

---

## 🔄 Workflow Diagram

```
Legal Enquiry Form
        │
        ▼
Email Verification (Send & Wait)
        │
        ▼ (on verified)
AI Agent + Structured Output Parser
        │
        ▼
Process & Store Enquiry (Code Node)
        │
        ├──▶ Send Email → Legal Team (routed by area of law)
        │
        └──▶ Send Email → Client (confirmation + reference number)
```

---

## ✨ Features

- **Web Form Intake** — Collects full name, email, phone, jurisdiction (England / Wales / Scotland / Northern Ireland), and enquiry details
- **Email Verification** — Sends a time-limited verification link before processing; expired or unverified enquiries are not processed
- **AI Classification** — Uses an LLM agent with a structured output parser to classify enquiries into one of 13 areas of law with guaranteed accuracy
- **Automated Routing** — Maps each area of law to the correct team inbox via a switch statement
- **Unique Enquiry IDs** — Generates sequential, persistent IDs (e.g. `ENQ-00042`) using n8n's global static data store
- **Persistent Storage** — All enquiries are logged to workflow static data across runs
- **Dual Email Notifications** — Automatically notifies the relevant legal team and sends the client a confirmation with their reference number
- **Bot Protection** — Form is configured to ignore bot submissions

---

## 🏛️ Areas of Law Supported

| Area of Law | Team |
|---|---|
| Corporate & Commercial | c&c@email.com |
| Intellectual Property | ip@email.com |
| Employment | employment@email.com |
| Tax & Banking | t&b@email.com |
| Family | family@email.com |
| Wills & Probate | w&p@email.com |
| Property | property@email.com |
| Personal Injury | pi@email.com |
| Immigration | immigration@email.com |
| Civil Disputes | cd@email.com |
| Criminal | criminal@email.com |
| Human Rights | hrights@email.com |
| Environmental | env@email.com |
| *Unclassified* | ge@email.com (General Enquiries) |

---

## 🧠 AI Classification

The AI Agent is prompted to act as a paralegal and classify the free-text enquiry into exactly one area of law. A Structured Output Parser is attached to the agent with a JSON schema that uses an `enum` to constrain the output to the 13 supported categories — ensuring the switch statement always receives a valid, exact-match string.

```json
{
  "type": "object",
  "properties": {
    "areaOfLaw": {
      "type": "string",
      "enum": ["Corporate & Commercial", "Employment", "Family", ...]
    }
  },
  "required": ["areaOfLaw"]
}
```

---

## 🆔 Enquiry ID Generation

Enquiry IDs are generated using n8n's `$getWorkflowStaticData('global')` to persist a counter across workflow runs:

```javascript
const workflowStaticData = $getWorkflowStaticData('global');
if (!workflowStaticData.enquiryCounter) {
  workflowStaticData.enquiryCounter = 0;
}
workflowStaticData.enquiryCounter += 1;
const enquiryID = 'ENQ-' + String(workflowStaticData.enquiryCounter).padStart(5, '0');
// → ENQ-00001, ENQ-00002, ENQ-00042...
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [n8n](https://n8n.io) | Workflow automation platform |
| n8n Form Trigger | Client-facing intake form |
| n8n Email (Send & Wait) | Email verification with approval flow |
| n8n LangChain Agent | AI-powered enquiry classification |
| n8n Structured Output Parser | Constrained, reliable AI output |
| n8n Code Node (JavaScript) | ID generation, routing logic, data storage |
| n8n Email Node | Team and client notification emails |

---

## 🚀 Getting Started

### Prerequisites

- n8n instance (self-hosted or cloud)
- SMTP email credentials configured in n8n
- An LLM provider connected to n8n (e.g. OpenAI, Anthropic)

### Installation

1. Download [`Legal_Enquiry_Triage.json`](./Legal_Enquiry_Triage.json)
2. In your n8n instance, go to **Workflows → Import from file**
3. Upload the JSON file
4. Update the following before activating:
   - Replace placeholder email addresses with your real team inboxes
   - Configure your SMTP credentials in the Email nodes
   - Connect your preferred LLM to the AI Agent node
5. Activate the workflow and copy the form trigger URL

---

## 📋 Roadmap / Potential Improvements

- [ ] Add jurisdiction-aware routing (Scottish law differs significantly from English law)
- [ ] Connect to a proper database (e.g. Airtable, PostgreSQL) instead of static data
- [ ] Add a duplicate submission check by email address
- [ ] Build a simple case management dashboard
- [ ] Add SLA-based follow-up reminders for unanswered enquiries
- [ ] Expand to support Welsh-language enquiries

---

## 👤 About

I am an aspiring legal technologist passionate about using automation and AI to make legal services more accessible and efficient. This project is part of my ongoing exploration of how modern software tools can be applied to real-world legal workflows.

If you work in legal tech or are building similar tools, feel free to connect or open an issue — I'd love to collaborate.

Feel free to connect with me on LinkedIn https://www.linkedin.com/in/arthurnoreika/