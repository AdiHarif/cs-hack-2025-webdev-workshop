# CS Hackathon 2025 - Web Dev Workshop

Welcome to the CS Hackathon 2025 Web Development Workshop! This workshop is designed to introduce participants to the fundamentals of web development and provide practical tools you will be able to use during the hackathon.

This repository contains the code and resources used in the workshop. It is divided into several stages we will go through during the workshop, each stage is available in a separate branch.

---

### Stage 1 - Initializing the Project (Ready for you)

This stage already contains the initial setup of the project. It includes all necessary boilerplate for working with React and TypeScript. This project was initialized using the following command (**No need to run this command yourself**):

```bash
npm create vite@latest my-react-app -- --template react-ts
```

Before you run this project, you need to install it's dependencies:
```bash
npm install
```

In order to run the project, use the following command:
```bash
npm run dev
```

This will start a local development server of the project. You can view the application at `http://localhost:5173/`.

---

### Stage 2 - Pokemon Fun Facts & PokeAPI integration (Ready for you)

In this stage, we have replaced the template website with a simple application that displays fun facts about Pokemon. The application fetches it's data from [PokeApi](https://pokeapi.co/).

In this task, we are going to render some Pokemons! Fetch data from the PokeAPI,

---

### Stage 3 - Pokemon Fake Facts (Together in class)
In this stage, we are going to integrate with some LLMs. Take the real Pokemon fact, and proivde it to the LLM to "fake-news" it. In addition, we need to develop some basic game functionality.

---

### Your turn!
Coding time! After completing stage 3, it's your turn to pick how to contuine to develop the game. You can choose any of those extra features to implement, as you wish - or, you can try to catch them all :)
Good luck!

| Feature                    | Example LLM Prompt                                                                                   | Tip                                                            |
|:---------------------------|:-----------------------------------------------------------------------------------------------------|:---------------------------------------------------------------|
| Two-Player Offline Mode    | “Generate a React hook and component that alternates turns between Player 1 and Player 2 on the same device.” | Use a `currentPlayer` state and toggle it after each guess.     |
| Turn Limit                 | “Create a configurable turn-counter component in React that decrements from X and shows remaining turns.” | Pass `maxTurns` as a prop and disable inputs when it hits 0.    |
| Time-Based Scoring         | “Write a function to record time taken for each guess and compute `score = maxTime – elapsedSeconds`.”   | Capture `startTime` on question render and `endTime` on answer. |
| Level System               | “Show how to adjust OpenAI API parameters (e.g. temperature) based on selected difficulty level.”       | Map levels ↔ temperature (e.g. easy 0.3, hard 0.8).             |
