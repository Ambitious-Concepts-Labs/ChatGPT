export const survey = [
  {
    question: "Does the app help solve your problem/achieve your goal?",
    answerOptions: [
      { answer: "It doesn't help at all." },
      {
        answer:
          "It helps, but I could solve my problem just as easily without this app.",
      },
      {
        answer:
          "It helps, but I could solve my problem just as easily or easier with another app.",
        isCorrect: true,
      },
      { answer: "It makes me more likely to achieve my goal." },
      { answer: "I won't be able to achieve my goal without this app." },
    ],
  },
  {
    question: "How easy is the app to use?",
    answerOptions: [
      { answer: "I need someone to show me how to use the app." },
      { answer: "I need someone to show me how to use certain features." },
      {
        answer: "It will take me a few uses to master the app.",
        isCorrect: true,
      },
      { answer: "Next time I use it, I’ll know exactly what to do." },
      { answer: "It felt like I’ve been using it all my life." },
    ],
  },
  {
    question:
      "How much would you pay for this app with all of its features (full version)?",
    answerOptions: [
      { answer: "I wouldn’t pay for this app at all" },
      {
        answer: "I would prefer to pay just for certain features of this app.",
        isCorrect: true,
      },
      { answer: "$29/month" },
      { answer: "$49/month" },
      { answer: "$99/month" },
    ],
  },
  // {
  //   "question": "Which class in Tailwind is used to set flex direction of column?",
  //   "answerOptions": [
  //     { "answer": "col" },
  //     { "answer": "col-flex" },
  //     { "answer": "flex-col", "isCorrect": true },
  //     { "answer": "None of the above" }
  //   ]
  // }
];
