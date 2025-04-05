# Quiz Application!

![Quiz Application Preview](/public/preview.png)

## Getting Started

### Development Environment

To run the application in development mode:

```bash
npm install
npm run dev
```

### Production Environment

To build and run the application in production mode:

```bash
npm install
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Quiz Configuration

Quiz configurations are stored as JSON files in the `public` directory (e.g., `quiz_1.json`, `quiz_2.json`). To create a new quiz:

1. Create a new JSON file in the `public` directory following the naming pattern `quiz_[id].json`
2. Define the quiz structure:
   ```json
   {
     "quizId": "string",
     "title": "string",
     "screens": [
       {
         "id": "string",
         "screenType": "question | info | summary",
         "question": "string (for question type)",
         "answers": ["string"] (for question type),
         "content": "string (for info type)",
         "title": "string (for info type)",
         "next": "string | null",
         "nextMap": { "answer": "nextScreenId" }
       }
     ]
   }
   ```

### Static Generation

The application uses Next.js App Router with static page generation for optimal performance:

1. All possible quiz paths are pre-built at build time
2. Quiz configurations are loaded from JSON files during build
3. Each screen gets its own static page with proper metadata
4. No client-side fetching of quiz data is needed

### Internal Architecture

1. **State Management**:
   - Redux store manages quiz state, answers, and screen history
   - Screen history tracks the exact path taken by users
   - Back navigation uses history to return to previous screens

2. **Component Structure**:
   - QuizContainer orchestrates the quiz flow
   - Specialized screen components for questions, info, and summary
   - Header with context-aware styling and navigation

3. **Navigation System**:
   - Supports both linear and branching paths
   - Maintains screen history for accurate back navigation
   - Uses Next.js App Router for static paths

### Future Improvements

1. **Analytics**:
   - Track user paths through quizzes
   - Analyze most common answers
   - Measure completion rates

2. **Performance**:
   - Implement loading states
   - Add error boundaries
   - Cache quiz results

3. **Features**:
   - Support for images in questions
   - Progress indicator
   - Save and resume functionality
   - Quiz results sharing
   - Multiple languages support

### Technical Stack

- Next.js 15
- TypeScript
- Redux with @reduxjs/toolkit
- Tailwind CSS
- ESLint
- Prettier
