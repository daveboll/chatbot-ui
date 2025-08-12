# Chatbot UI

A modern, functional chatbot interface built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive troubleshooting interface with case management, chat functionality, and fault tracking.

## Features

### Left Panel - Case Navigation
- Search and filter cases by case number or title
- Auto-complete functionality for existing cases
- Visual status indicators (open/resolved)
- Real-time case updates

### Middle Panel - Chat Interface
- Interactive chat with message bubbles
- Bot response options for quick selection
- Thumbs up/down feedback system
- Real-time message updates
- Auto-scroll to latest messages

### Right Panel - Fault Management
- Track faults by category and symptom
- Status management (in-progress, ruled out, root cause)
- Color-coded status indicators:
  - Yellow: In Progress
  - Green: Ruled Out
  - Red: Root Cause
- Passdown creation with summary and actions
- Case resolution functionality

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

You'll need Node.js installed on your system. If you don't have it installed, you can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd chatbot-ui
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── LeftPanel.tsx   # Case navigation panel
│   ├── ChatPanel.tsx   # Chat interface
│   └── RightPanel.tsx  # Fault management panel
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions and mock data
│   ├── cn.ts          # CSS class utility
│   └── mockData.ts    # Sample data for demonstration
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## Usage

### Case Management
1. Use the search bar in the left panel to find specific cases
2. Click on a case to select it and start a chat session
3. Cases are automatically created when selected

### Chat Interface
1. Type messages in the input field at the bottom
2. Click on bot response options for quick interactions
3. Use thumbs up/down buttons to provide feedback on bot responses
4. Messages are automatically saved and synchronized

### Fault Tracking
1. View identified faults in the right panel
2. Click status buttons to update fault status:
   - "In Progress" (yellow)
   - "Ruled Out" (green)
   - "Root Cause" (red)
3. Create passdowns to summarize troubleshooting sessions
4. Mark cases as resolved when issues are fixed

## Customization

### Adding New Cases
Edit `src/utils/mockData.ts` to add new cases to the mock data:

```typescript
export const mockCases: Case[] = [
  // Add your cases here
  {
    id: 'new-id',
    number: 'CASE-XXX',
    title: 'Your Case Title',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
```

### Styling
The application uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js` and add custom styles in `src/index.css`.

### Backend Integration
To integrate with a real backend:
1. Replace mock data functions with API calls
2. Update the state management to handle async operations
3. Add error handling for network requests
4. Implement real-time updates using WebSockets if needed

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
