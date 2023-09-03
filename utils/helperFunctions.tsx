import { surpriseMePrompts } from "../constants/prompts";
import { firebaseSignOut } from "./firebaseHelpers";
import { signOut } from "next-auth/react";

export function handleSignout() {
  firebaseSignOut()
  signOut()
}

export async function delay (ms: number): Promise<number> {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

export function getRandomPrompt(prompt: string): any {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

// prompt for optimizing post
export const handlePrompt = (vibe: any, post: any) => {
  let prompt;
  // add more vibes as needed
  switch (vibe) {
    case "Story":
      prompt = `Generate post using this prompt, based on ${post}.  You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
The Linkedin algorithm contains boosts and demotions based on what you are writing. Positive boosts are:

- in each post add emoji
- 200 characters in sentence maximum
- Start each sentecnce from new line and ad numbers in first 2 lines
- add 3 hashtags which 2 are generic and one very specific (at the end) Tags relate to post theme
- add a question at the end of the post to start a discussion. Before the hashtags
- first two lines should be catchy
- Dont add links - links are not good.
- If post copied in the field contain some numbers keep them the same.

Add idea about which image or visual can be added at the end of the post (this text is not counted as part of post)
${post}
---
Generated post length must be more than 800-1200 characters
---
Between each line must be a space
---
Keep all mentions of people in there
---
Start the firs line from smth like: I did smth, In year, I do, Tired of, Sometimes it is just, A path toward, Because this is not,I've been struggling,  (change the begginign depends on the context )
---
Add emoji if it fits
---
It should be a story`;
      break;
    case "Crisp":
      prompt = `Generate post using this prompt, based on ${post}. You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated ${post} must follow these conditions and be short, crips and inspiring:
- Post length must be no more than 500 characters. 
- Each sentence length is less than 50 characters. 
- First sentences must start with smth like that : I've spent 5 months, 10 step plan, I made 10000 In, Last January, this January, I was on .. , I created 1000 of, how to get 1000 followers, how to do 1000 of, 10 lessons took me,  15 reasons, 5 days ago, 3 shocking steps, my strategy for  2023, over the past 10 years. (change numbers, generate always new numbers, generate always new beggining). Next sentences should not include numbers and these formulations.  
- If post copied in the field contain some numbers keep them the same.
- Next sentences should be generated, should not include numbers.
---
Each sentence from new line 
---
Add space between each abstract.
---
Show only generated post`;

      break;
    case "List":
      prompt = `Generate a post that is likely to be liked and reposted on LinkedIn, based on ${post}. Your post should follow these conditions:

Post length must be no more than one hundred characters.
Each sentence length is no more than two words.
Post is a list of things.
First sentence must start with one of the following: There are 2 types of, 1 big mistake to avoid, When you..., avoid..., 5 quick tips..., Most companies..., If you don't plan to... (replace the ellipsis with a number).
If the copied post contains numbers, keep them the same.
The next sentences should be generated and should not include numbers.`;

      // Generate post using this prompt, based on ${post}. You are a LinkedinGPT, a large language model that generates viral posts for Linkedin.
      //         ely to be liked and reposted than the original post.
      // The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated ${post} must follow these conditions of having list and 1-2 sentences:
      // - Post length must be no more than one hundred characters.
      // - Each sentence length is less than twenty characters.
      // - Post is a list of things
      // - First sentences must start with: There are 2 types of, 1 big mistake make, When you, avoid, 5 quick tips, Most companies, If you don't plan to, (change numbers, generate always new numbers, only add in the first line of post). Next sentences should not include numbers and these formulations.
      // - If post copied in the field contain some numbers keep them the same.
      // - Next sentences should be generated, should not include numbers.
      // ---
      // Each sentence from new line
      // ---
      // Add space between each abstract.
      // ---
      // Show only generated post
      // You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
      // s If person select this ${vibe}, make sure the generated ${post} must follow these conditions and be super short sentences from 1-2 words :
      // - Post length must be no more than 100 characters or 100 words.
      // - Each sentence length is less than twenty characters.
      // - Add only one list, no more
      // - Only one and fitst sentence of the  ${post}  must start with smth like that: There are 2 types of, 1 big mistake make, Most people think, What worked in the past might not, When you, avoid, 5 quick tips, Most companies, If you don't plan to, Behind every bad, Before asking (change numbers, generate always new numbers.  Next sentences should not include numbers and these formulations.
      // - If post copied in the field contain some numbers keep them the same.
      // - Next sentences should be generated
      // ---
      // Each sentence from new line
      // ---
      // Add space between each abstract.
      // ---`;

      break;
    case "Unpopular opinion":
      prompt = `Generate post using this prompt, based on ${post}. You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
        The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated post must follow these conditions and create an unpopular opinion about the topic:
        - Post length must be less than 200 characters. 
        - Post must contain no more tha 3 sentences 
        - First sentence must start with: Unpopular opinion: 
        ---
        Add space between each abstract.`;
      break;
    case "Case Study":
      prompt = `Generate post using this prompt, based on ${post}. person insert You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
The Linkedin algorithm contains boosts and demotions based on what you are writing. If person select this ${vibe}, make sure the generated post must follow these conditions and be fullfilling and rigorous and realate to post typed:
- Post must relate to what initially is inserted  
- Post length must be no more than 1000 characters. 
- Each sentence length is less than 200 characters. 
- First sentence of the must start with smth like that, or similar text to one: Pro-tip, These simeple expereiments, Here is one of my biggest learnings from this year, Inside, Being ... does not mean, Earlier this year , This might be the hottest (use similar words) 
- If post copied in the field contain some numbers keep them the same.
- Next sentences should be generated, and contain list, rigorous list, each list point start from emoji
---
Provide the idea for graphics, image, sceme which will fuel these case study post at the end in the brackets
---s
Add space between each abstract.`;
      break;
    default:
      prompt = `Default prompt for optimizing post`;
      break;
  }
  return prompt;
};