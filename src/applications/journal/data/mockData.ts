import { Article, Category } from '../types';
import { subDays, subMonths } from 'date-fns';

const now = new Date();

export const MOCK_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Entries' },
  { id: 'favorites', name: 'Favorites' },
  { id: 'research', name: 'Research' },
  { id: 'build-logs', name: 'Build Logs' },
  { id: 'philosophy', name: 'Philosophy' },
  { id: 'personal', name: 'Personal' }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Designing the PinkWire OS',
    slug: 'designing-pinkwire-os',
    date: subDays(now, 5).toISOString(),
    category: 'build-logs',
    tags: ['design', 'os', 'react'],
    summary: 'A look into the aesthetic and technical decisions behind the operating system shell.',
    readingTime: 4,
    favorite: true,
    status: 'published',
    references: [{ type: 'track', id: 't2', name: 'Neon Nights by Synthwave Society' }],
    content: `# Designing PinkWire OS
When I started building PinkWire, I didn't want to just make another website. I wanted it to feel like a place.
A real operating system environment. 

> "It should feel like finding someone's abandoned desktop from an alternate timeline."

## The Aesthetic
We chose a glossy, premium UI style, moving away from flat design and embracing:
* Soft gradients
* Distinct shadows
* Translucency and blur effects
* High-contrast borders

Here is some of the code for the windows:
\`\`\`tsx
<div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl">
  {children}
</div>
\`\`\`

## What's Next?
We still need to build the Journal, the Browser, and refine the filesystem. But the foundation is solid.
    `
  },
  {
    id: 'a2',
    title: 'Notes on Interpretability',
    slug: 'notes-on-interpretability',
    date: subMonths(now, 1).toISOString(),
    category: 'research',
    tags: ['ai', 'interpretability', 'gemini'],
    summary: 'Early thoughts on reverse-engineering feature activations in large models.',
    readingTime: 7,
    favorite: false,
    status: 'published',
    references: [{ type: 'track', id: 't4', name: 'Midnight Coding by Coffee & Code' }],
    content: `# Notes on Interpretability
Understanding how a neural network arrives at its outputs remains one of the most fascinating challenges in modern computing. If we treat a model purely as a black box, we limit our ability to align it, debug it, and trust it.

## Feature Excision
Recently, I've been experimenting with identifying and isolating specific concepts within the latent space.

1.  **Identify:** Locate the activation vectors correlated with a specific concept.
2.  **Isolate:** Clamp those activations during a forward pass.
3.  **Observe:** Does the model's behavior change in a predictable, targeted way?

So far, the results are promising but extremely noisy. The concepts are heavily entangled. 

![Thought Vectors](https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80)
*Visualizing the latent space projections.*
    `
  }
];
