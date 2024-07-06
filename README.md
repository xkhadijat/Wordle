Wordle Game
 Welcome to Wordle, a React Native-based word guessing game!

Table of Contents
Introduction
Features
Installation
Usage
Contributions
Gameplay
License

Introduction
This project is a recreation of the popular Wordle game, implemented using React Native and JavaScript. It challenges players to guess a secret word within a limited number of attempts.

Features
Dynamic Keywords: The game selects a keyword based on the day of the year.
Interactive Gameplay: Users can input guesses and see immediate feedback on their progress.
Color-coded Feedback: Correct letters in correct positions are highlighted in green, correct letters in wrong positions in Red, and incorrect guesses in dark grey.

Installation
To run the Wordle game locally, follow these steps:

1.Clone the repository:
git clone <repository-url>
cd Wordle

2.Install dependencies:
npm install  # or yarn install

3.Start the Metro bundler:
 npx react-native start or npm start
 
4:Run on Android or iOS:
    Android:
       npx react-native run-android or select a on your terminal

  iOS:
    npx react-native run-ios


Usage
Once the game is running on your device or emulator:
    Enter letters to guess the secret word.
    Use the "CLEAR" button to delete the last entered letter.
    Press "ENTER" to submit your guess for the current row.


Gameplay
Winning: Guess all letters correctly in the correct positions before running out of rows.
Losing: Use all rows without guessing the correct word.

Contributing
Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request.
