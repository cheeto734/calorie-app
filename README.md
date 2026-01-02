# CaloriTrack - Calorie Tracking & Meal Planning App

An intelligent web application that tracks calories for ingredients used in a meal and provides meal suggestions based on uploaded photos of ingredients.

## Features

- **Photo Recognition**: Upload photos of your ingredients for instant identification
- **Accurate Calorie Data**: Get precise calorie counts powered by USDA FoodData Central
- **Smart Meal Planning**: Receive personalized meal suggestions based on your ingredients
- **Light Green Theme**: Clean, modern UI with a fresh light green color scheme

## Pages

1. **Homepage**: Explains the application features with navigation to other pages
2. **Calorie Count**: Upload ingredient photos to get accurate calorie information with nutritional breakdown
3. **Meal Planning**: Upload ingredients and receive AI-powered meal suggestions with recipes

## Technology Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with CSS Variables
- **APIs (to be integrated)**:
  - Gemini Vision API or OpenAI Vision API for ingredient recognition
  - USDA FoodData Central API for nutritional data

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cheeto734/calorie-app.git
cd calorie-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

Currently, the application uses simulated data for demonstration purposes. To integrate real APIs:

1. **For Gemini Vision API**:
   - Obtain an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the root directory
   - Add: `VITE_GEMINI_API_KEY=your_api_key_here`

2. **For OpenAI Vision API**:
   - Obtain an API key from [OpenAI](https://platform.openai.com/api-keys)
   - Add to `.env`: `VITE_OPENAI_API_KEY=your_api_key_here`

3. **For USDA FoodData Central**:
   - Get an API key from [USDA FoodData Central](https://fdc.nal.usda.gov/api-key-signup.html)
   - Add to `.env`: `VITE_USDA_API_KEY=your_api_key_here`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
