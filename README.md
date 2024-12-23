# REACT Sudoku

![React](https://img.shields.io/badge/react-v18.2.0-blue.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6-yellow.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8803b948-88a0-4c9b-bf21-b284401455bb/deploy-status)](https://app.netlify.com/sites/alan-c-react-sudoku/deploys)

[Try it](https://alan-c-react-sudoku.netlify.app/)

# 🔩 React-Sudoku

Welcome to **React-Sudoku**, a modern and interactive Sudoku game built with **React**! Dive into the world of number puzzles with a sleek UI, customizable settings, and a variety of game difficulties. Whether you're a Sudoku enthusiast or just looking to pass time, this app has got you covered!

---

## 🚀 Features

- **Responsive Gameplay**: A beautifully designed grid that works seamlessly on desktop and mobile.
- **Difficulty Levels**: Choose between **Easy**, **Medium**, and **Hard** difficulty to match your expertise.
- **Customizable Settings**:
  - Pencil mode for jotting down possibilities.
  - Toggle interactions with prefilled cells.
- **Undo/Redo Functionality**: Never lose track of your moves—navigate back and forth in your game state.
- **Timer**: Challenge yourself by racing against the clock.
- **Save and Resume Games**: Automatically save your progress and resume right where you left off.
- **Highlighting & Validation**:
  - Highlight duplicates and invalid entries.
  - Smart hints for assistance.
- **Clean Code Architecture**: Modularized components, easy to extend and debug.
- **React Context API**: Efficient state management for a seamless user experience.

---

## 📦 Installation

To run **React-Sudoku** on your local machine, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/alancleetus/React-Sudoku.git
   cd React-Sudoku
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm start
   ```

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to play the game.

4. **Run Tests**
   ```bash
   npm test
   ```

---

## 🎮 How to Play

1. Start a new game by selecting your desired difficulty level.
2. Fill in the grid with numbers from 1 to 9, ensuring:
   - Each row, column, and 3x3 subgrid contains all numbers from 1 to 9.
3. Use **pencil mode** for temporary notes and hints.
4. Utilize the **undo** and **redo** buttons to revise your steps.
5. Complete the puzzle to test your Sudoku skills!

---

## 🛠️ Technology Stack

- **Frontend**: React, JavaScript, HTML, CSS
- **State Management**: Context API
- **Testing**: Jest & React Testing Library
- **Utilities**: Lodash for deep cloning and comparisons
- **Deployment**: Netlify (or any other platform)

---

## 🗂 Project Structure

```plaintext
React-Sudoku/
│
├── src/
│   ├── components/        # Reusable UI components (Grid, Cell, Buttons, etc.)
│   ├── contexts/          # Context API files (SudokuContext, TimerContext, etc.)
│   ├── utils/             # Helper functions (Grid generation, Validation, etc.)
│   ├── constants/         # Static constants (EmptyGrid, Configurations, etc.)
│   ├── styles/            # CSS styles
│   └── App.js             # Root application component
│
├── public/                # Static assets
│
├── README.md              # Project documentation
├── package.json           # Project dependencies and scripts
└── .gitignore             # Git ignore rules
```

---

## 🌟 Key Components

### 1. **`SudokuProvider`**

- Manages the state of the Sudoku game grid, hints, and interactions.
- Includes undo/redo history and game-saving functionality.

### 2. **`GenerateSudoku`**

- Generates randomized Sudoku grids based on the selected difficulty level.

### 3. **`TimerContext`**

- Tracks elapsed time for the game and handles pause/resume functionality.

### 4. **`SettingsContext`**

- Customizable settings like pencil mode, prefilled cell interaction, and more.

### 5. **`GameHistoryProvider`**

- Saves, loads, and manages historical game states for persistence.

---

## 🧪 Testing Strategy

### Current Coverage:

- Unit tests for utility functions (grid validation, hint validation, etc.).
- Integration tests for Context APIs and state transitions.
- UI tests for button interactions, grid updates, and modal visibility.

### Run Tests:

```bash
npm test
```

### Test Coverage Report:

```bash
npm run test:coverage
```

---

## 📖 Future Enhancements

- **Theming**: Add light and dark mode for better user experience.
- **Leaderboard**: Track and display best completion times.
- **Multiplayer Mode**: Compete with friends in real-time Sudoku challenges.
- **Daily Challenges**: Introduce unique puzzles every day.
- **Accessibility Improvements**: ARIA roles and keyboard navigation support.

---

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository and create your branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
2. Commit your changes:
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
3. Push to your branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
4. Open a pull request.

---

## 🖋️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgements

- **React.js** for the amazing framework.
- **Sudoku Enthusiasts** for inspiring this project.
- Open-source contributors who make projects like this possible.
