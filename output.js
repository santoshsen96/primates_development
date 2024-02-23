const questions =
[
  {
    sort_order: 1,
    question_body:
      "Sen is good at imitating and acting the exact mannerism of anyone he sees for five minutes. what skill do you think he possesses that makes it easier for him to do it?",
    options: [
      { option: "Observational skills", mark: 5 },
      { option: "Memory Skills", mark: 3 },
      { option: "Acting Skills", mark: 4 },
      { option: "Leadership Skills", mark: 2 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "perceive",
    skill: "attention",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 2,
    question_body:
      "How many ducks are shown in the video",
    options: [
      { option: "10", mark: 1 },
      { option: "11", mark: 1 },
      { option: "12", mark: 5 },
      { option: "15", mark: 1 },
      { option: "14", mark: 1 }
    ],
    pride: "perceive",
    skill: "attention",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 3,
    question_body: "Shiv wants to win the tennis tournament which he will be playing next week. In order to outplay the opponent, what are the things he should do.",
    options: [
      { option: "He needs to watch the previous match videos of his opponent to understand his playing style", mark: 3 },
      { option: "He needs to observe on the ways his opponent is making errors while playing", mark: 4 },
      { option: "He needs to focus on his own strength to win the game", mark: 4 },
      { option: "All the above", mark: 5 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "perceive",
    skill: "attention",
    intelligence: "advantage",
    standard: 10
  },
  {
    sort_order: 4,
    question_body: "Shreyans is good at remembering all the lessons taught by his teacher during the class hours and writing it in a fresh notebook even after a month without referring or seeing the class work notebook. What skill do you think he possesses that makes it easier for him to do",
    options: [
      { option: "Memory skills", mark: 5 },
      { option: "Attention Skills", mark: 4 },
      { option: "Concentration Skills", mark: 4 },
      { option: "Listening Skills", mark: 4 },
      { option: "All the above", mark: 3 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "perceive",
    skill: "memory",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 5,
    question_body: "What is the number shown in the image",
    options: [
      { option: "844 633 4433", mark: 2 },
      { option: "833 644 3344", mark: 1 },
      { option: "744 833 4433", mark: 3 },
      { option: "844 733 4433", mark: 5 },
      { option: "822 733 4433", mark: 1 }
    ],
    pride: "perceive",
    skill: "memory",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 6,
    question_body: "Ram has to memorize the lessons taught by his teacher to write in exams. What work do you think he should do to remember the lessons?",
    options: [
      { option: "Create a mental pictures of the lessons with the appropriate functional descriptions", mark: 4 },
      { option: "Create list of pointers and read regularly", mark: 4 },
      { option: "Remember the lessons in the form of a story & tag with a appropriate topic", mark: 4 },
      { option: "All the above", mark: 5 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "perceive",
    skill: "memory",
    intelligence: "advantage",
    standard: 10
  },
  {
    sort_order: 7,
    question_body: "Anaya has the power of finding out all the possible and probable obstacles she would face while solving a problem. What skill do you think she possess that makes it easier for her to find it",
    options: [
      { option: "Analytical Skills", mark: 5 },
      { option: "Listening Skills", mark: 3 },
      { option: "Memory Skills", mark: 2 },
      { option: "All the above", mark: 2 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "resolve",
    skill: "critical",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 8,
    question_body: "Two people played chess 5 times. Both of them won the same number of games and there was not a single draw. How is this possible?",
    options: [
      { option: "This is impossible", mark: 1 },
      { option: "One game was a tie", mark: 2 },
      { option: "One game was forfeited", mark: 2 },
      { option: "They were playing with different people", mark: 5 },
      { option: "The last game is still happening", mark: 3 }
    ],
    pride: "resolve",
    skill: "critical",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 9,
    question_body: "How do we need to analyze all the potential reasons for any problem?",
    options: [
      { option: "Analyze the functional properties of the problem", mark: 1 },
      { option: "Ask suggestions from random people regarding the problem", mark: 2 },
      { option: "Ask suggestions from the concerned people regarding the problem", mark: 1 },
      { option: "Check if any relevant information is missing", mark: 2 },
      { option: "Option 1,3 & 4", mark: 5 },
      { option: "Option 2,3 & 4", mark: 2 }
    ],
    pride: "resolve",
    skill: "critical",
    intelligence: "advantage",
    standard: 10
  },
  {
    sort_order: 10,
    question_body: "Sherin has an ability to create a solution and come out from any kind of awkward situation she is put into. What skill do you think she possesses that makes it easier for her to do that.",
    options: [
      { option: "Problem Solving Skills", mark: 5 },
      { option: "Attention Skills", mark: 3 },
      { option: "Collaboration Skills", mark: 2 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "resolve",
    skill: "creative",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 11,
    question_body: "What would be the best fitted next word in the sequence: <br/> fly, air, wind, weather, …….",
    options: [
      { option: "Eagle", mark: 2 },
      { option: "Sounding Balloon", mark: 5 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 2}
    ],
    pride: "resolve",
    skill: "creative",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 12,
    question_body: "What would be the expectations of any new scientific product which comes to the market for sale..",
    options: [
      { option: "It should be easy for the most to operate", mark: 4},
      { option: "It should be cheap to buy", mark: 4 },
      { option: "It should benefit the most", mark: 4 },
      { option: "All the above", mark: 5 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "resolve",
    skill: "creative",
    intelligence: "advantage",
    standard: 10
  },
  {
    sort_order: 13,
    question_body: "Senthil takes all suggestions and advice given to him by anyone which will make him grow better even if it is provided by people he doesn’t like. What ability do you think he possesses that makes it easier for him to do it.",
    options: [
      { option: "Growth mindset", mark: 5 },
      { option: "Good communication", mark: 1},
      { option: "Good collaboration", mark: 2 },
      { option: "Patience", mark: 2 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "influence",
    skill: "mindset",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 14,
    question_body: "When we lose any game 3 times continuously, it means",
    options: [
      { option: "That sport is not for us", mark: 1 },
      { option: "Luck is not in favour of us", mark: 3 },
      { option: "Something is lacking in our skill or ability which needs to be addressed", mark: 5 },
      { option: "All the above", mark: 2 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "influence",
    skill: "mindset",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 15,
    question_body: "Srijith failed in four exams consecutively, so he was not interested to write the 5th time. Even though his parents and friends had the faith in him, he had a strong",
    options: [
      { option: "Negative belief", mark: 4 },
      { option: "Negative thought process", mark: 4 },
      { option: "Fear that he might fail again", mark: 4 },
      { option: "All the above", mark: 5 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "influence",
    skill: "mindset",
    intelligence: "advantage",
    standard: 10
  },
  {
    sort_order: 16,
    question_body: "Whenever Indira plays a sport, she always sees the best that she learned or gained even while losing the game. What skill do you think she possesses that makes it easier for her do it.",
    options: [
      { option: "Good Attitude", mark: 5},
      { option: "Good Expression", mark: 1 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "influence",
    skill: "attitude",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 17,
    question_body: "Whenever things are not going as per our plans",
    options: [
      { option: "Need to be patient and maintain the positive attitude", mark: 4 },
      { option: "Do whatever is mandatory even when things are not going properly", mark: 4 },
      { option: "Try to use all external influences even the unethical ones to bring it back as planned", mark: 3 },
      { option: "Option 1 & 2", mark: 5 },
      { option: "Option 2 & 3", mark: 1 },
      { option: "Option 1 & 3", mark: 1 }
    ],
    pride: "influence",
    skill: "attitude",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 18,
    question_body: "What would be the appropriate way to express our suggestions to others? ",
    options: [
      { option: "Express our suggestions or advice which will benefit the receiver", mark: 5 },
      { option: "Express the suggestions in the intended way we like to happen", mark: 1 },
      { option: "Express our suggestions anyways whether they take it or not", mark:1 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "influence",
    skill: "attitude",
    intelligence: "advantage",
    standard: 10
  },
  {
    sort_order: 19,
    question_body: "Manoj always feel bad about his life and looks sad and try to avoid interactions with other people, he is",
    options: [
      { option: "Emotionally weak", mark: 5 },
      { option: "Mentally weak", mark: 1 },
      { option: "Physically weak", mark: 1 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "deliver",
    skill: "expression",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 20,
    question_body: " Diana was travelling to the nearby town to meet her friend after 10 years, while walking on a lonely street at night by 10 pm suddenly she felt someone touched her shoulder from behind, she was initially ____ ",
    options: [
      { option: "Surprised", mark: 1},
      { option: "Excited", mark: 1 },
      { option: "Scared", mark: 5 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "deliver",
    skill: "expression",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 21,
    question_body: "How do we need to do to convey our inner feelings or emotions about the current circumstances to others?",
    options: [
      { option: "Express the appropriate behaviors without disturbing other people present in that situation", mark: 5 },
      { option: "Use strong emotions and shout hard to seek others attention in the surroundings", mark: 1 },
      { option: "Express our emotions along with hard emotional behaviors whenever & wherever possible", mark: 1},
      { option: "All the above", mark: 1 }
    ],
    pride: "deliver",
    skill: "expression",
    intelligence: "advantage",
    standard: 10
  },
  {
    sort_order: 22,
    question_body: "Yashmikha knows exactly how to convey her inner feelings or expectations to her mother and makes her mother understand what she wants. What skill do you think she possess that makes it easier for her do it",
    options: [
      { option: "Good communication", mark: 5 },
      { option: "Good leadership", mark: 1 },
      { option: "Good analysis", mark: 1 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "deliver",
    skill: "communication",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 23,
    question_body: "How would you convey to your friend that she has committed a mistake and make her accept that mistake",
    options: [
      { option: "Convey to her that its quite natural for everyone to make mistakes", mark: 5 },
      { option: "Convey to her that it is ethical to accept the committed mistake", mark: 1 },
      { option: "Convey to her that accept the mistake or else you might look bad", mark: 1 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "deliver",
    skill: "communication",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 24,
    question_body: "What do we need to do to convey our planned solutions to the outer world or to other people?",
    options: [
      { option: "Communicate our solutions in the form of words, actions, or expressions", mark: 5},
      { option: "Use friends help to convey our solutions to others", mark: 1 },
      { option: "Never convey our solutions to others", mark: 1},
      { option: "Find if the person can understand by themselves", mark: 1 },
      { option: "Option 2 & 3", mark: 1 },
      { option: "Option 2 & 4", mark: 1 }
    ],
    pride: "deliver",
    skill: "communication",
    intelligence: "advantage",
    standard: 10
  },
  {
    sort_order: 25,
    question_body: "Puneeth’s mathematics teacher gave new problems to be solved as homework to his class students; Puneeth knew only how to solve the first few steps of the problem. His friend knew to do only the last steps of the problem. So Puneeth convinced his friend to join him together to solve the problem and they both received appreciation from their teacher. What skill did they both used to solve the problem?",
    options: [
      { option: "Collaborative work skills", mark: 5 },
      { option: "Leadership skills", mark: 1 },
      { option: "Communication skills", mark: 1 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "engage",
    skill: "collaboration",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 26,
    question_body: "Sooraj’s best friends krish, varun, and priyanka were put in different teams when the class was divided for the school Inter House competition. Tina, swaroop and ruchi were added to his team whom he doesn’t usually like. This new team combination will",
    options: [
      { option: "Create an opportunity to make new friends", mark: 5 },
      { option: "Reduce teams victory options due to new people", mark: 1 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "engage",
    skill: "collaboration",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 27,
    question_body: "What do we need to do to become a good teammate and a contributing member of the team?",
    options: [
      { option: "Do all the work with commitment", mark: 1 },
      { option: "Show genuine interest on others well being", mark: 1 },
      { option: "Try to avoid conflicts within the team", mark: 1 },
      { option: "All the above", mark: 5 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "engage",
    skill: "collaboration",
    intelligence: "advantage",
    standard: 10
  },
  {
    sort_order: 28,
    question_body: "Franky wanted to create a green environment in his neighborhood. So he started first to plant saplings in his own backyard and his nearby places. Inspired by his activities his neighbors also wanted to grow trees but did not know how to do it. So he helped them by teaching them how to do it and his neighborhood became a green environment in reality within a few months. What skills did he use to inspire others?",
    options: [
      { option: "Leadership skills", mark: 5 },
      { option: "Marketing skills", mark: 1 },
      { option: "Teamwork", mark: 1 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "engage",
    skill: "leadership",
    intelligence: "awareness",
    standard: 10
  },
  {
    sort_order: 29,
    question_body: "There are 3 students who wants to become the leader of the class, who would be the right person for it so that the whole class benefits from it in terms of good education and unity",
    options: [
      { option: "One who is the first rank holder in the class", mark: 1 },
      { option: "One who is kind hearted", mark: 1 },
      { option: "One who is good at studies and helps others", mark: 5 },
      { option: "One who is your friend", mark: 1 },
      { option: "All the above", mark: 1 },
      { option: "None of the above", mark: 1 }
    ],
    pride: "engage",
    skill: "leadership",
    intelligence: "application",
    standard: 10
  },
  {
    sort_order: 30,
    question_body: "What are the duties & advantages you can use as a team leader to reach the team goal at the earliest?",
    options: [
      { option: "Use my influence and achieve results using my position", mark: 1 },
      { option: "Make my friends in the top positions and make them happy", mark: 1 },
      { option: "Choose & appoint the appropriate people for the work roles who are specialized in it", mark: 1 },
      { option: "Inspire & motivate others through my actions and make them work with wholeheartedness", mark: 1 },
      { option: "Option 1 & 2", mark: 1 },
      { option: "Option 3 & 4", mark: 5 }
    ],
    pride: "engage",
    skill: "leadership",
    intelligence: "advantage",
    standard: 10
  }
]
module.exports = questions;
