# SupportFlow Visual Builder

A visual decision tree editor for building and testing chatbot conversation flows.

## Live Demo
https://amali-supportflow.netlify.app/

## Design File [figma]
https://www.figma.com/design/FESParDMvMuPEW1ePotcGz/Support-flow?node-id=9-18&t=EXzRkpjvbs0cQ5A9-1

## Features

- **Visual Flow Editor** — See your chatbot logic as a connected flowchart with color-coded nodes
- **Real-time Editing** — Click any node to edit its text instantly
- **Preview Mode** — Test the bot experience as a real customer with a chat interface
- **Node Type Indicators** — Green for Start, Blue for Question, Red for End nodes

## Wildcard Feature: Node Type Color Coding
I added visual color coding for node types because in a real support flow with dozens of nodes, managers need to instantly identify where a conversation starts, where decisions are made, and where it ends. This reduces cognitive load and makes the tool indispensable for non-technical users.

## Tech Stack
- React
- SVG for connector lines (built from scratch — no graph libraries)
- Plain CSS (no component libraries)

## How to Run Locally

```bash
npm install
npm start
```

## Project Structure
- `src/App.js` — Main component with flow builder and preview mode
- `src/flow_data.json` — Conversation flow data

## Checklist
- ✅ No restricted libraries (no react-flow, Bootstrap, Material UI)
- ✅ SVG lines built from scratch
- ✅ Editor mode with real-time updates
- ✅ Preview/chat mode with restart
- ✅ Wildcard feature implemented
