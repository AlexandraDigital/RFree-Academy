export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  teacherName: string;
  teacherAvatar: string;
  videoUrl?: string;
  duration: string;
  transcript?: string;
  content: {
    sections: {
      title: string;
      content: string;
      keyPoints: string[];
    }[];
  };
  tags: string[];
  realWorldApplication: string;
  careerPaths: string[];
  views: number;
  likes: number;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  contributors: number;
  impact: string;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  category: string;
  timestamp: string;
  likes: number;
  comments: number;
}

// Mock data storage (in real app, this would be in Supabase)
export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Financial Literacy: Building Wealth from Zero",
    description: "Learn practical money management, investing, and building generational wealth - skills they don't teach in traditional schools",
    category: "Life Skills",
    subcategory: "Finance",
    teacherName: "Sarah Chen",
    teacherAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    duration: "45 mins",
    transcript: "Welcome to Financial Literacy 101. Today, we're going to break down the fundamentals of building wealth that should be taught in every school but aren't...",
    content: {
      sections: [
        {
          title: "Understanding Money Flow",
          content: "Money isn't just about earning—it's about understanding how it flows in and out of your life. We'll explore income streams, expenses, and the critical difference between assets and liabilities.",
          keyPoints: [
            "Assets put money in your pocket, liabilities take it out",
            "Multiple income streams create financial security",
            "Track every dollar to understand your money patterns"
          ]
        },
        {
          title: "The Investment Mindset",
          content: "Investing isn't gambling—it's about making your money work for you. Learn about compound interest, index funds, and long-term wealth building strategies.",
          keyPoints: [
            "Start investing early, even with small amounts",
            "Compound interest is the 8th wonder of the world",
            "Diversification reduces risk"
          ]
        }
      ]
    },
    tags: ["finance", "investing", "budgeting", "real-world-skills"],
    realWorldApplication: "Manage your personal finances, start investing, build retirement funds, and achieve financial independence",
    careerPaths: ["Financial Advisor", "Investment Analyst", "Entrepreneur", "Personal Finance Coach"],
    views: 15420,
    likes: 892,
    createdAt: "2026-03-15"
  },
  {
    id: "2",
    title: "Mental Health & Emotional Intelligence",
    description: "Develop self-awareness, manage emotions, and build resilience - essential skills for success in life and work",
    category: "Life Skills",
    subcategory: "Mental Health",
    teacherName: "Dr. James Wilson",
    teacherAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    duration: "38 mins",
    content: {
      sections: [
        {
          title: "Understanding Your Emotions",
          content: "Emotions are data, not directives. Learn to recognize, name, and process your feelings in healthy ways.",
          keyPoints: [
            "Name it to tame it - labeling emotions reduces their intensity",
            "All emotions are valid, not all behaviors are",
            "Emotional awareness improves decision-making"
          ]
        },
        {
          title: "Building Resilience",
          content: "Resilience isn't about avoiding failure—it's about bouncing back stronger. Develop mental toughness and adaptive coping strategies.",
          keyPoints: [
            "Reframe failures as learning opportunities",
            "Build a support network before you need it",
            "Practice self-compassion, not self-criticism"
          ]
        }
      ]
    },
    tags: ["mental-health", "emotional-intelligence", "self-awareness", "resilience"],
    realWorldApplication: "Navigate workplace conflicts, build strong relationships, manage stress, and lead with empathy",
    careerPaths: ["Therapist", "Leadership Coach", "HR Professional", "Social Worker"],
    views: 12350,
    likes: 1024,
    createdAt: "2026-03-20"
  },
  {
    id: "3",
    title: "Sustainable Living & Climate Action",
    description: "Practical steps to reduce your environmental impact and contribute to solving the climate crisis",
    category: "Impact",
    subcategory: "Environment",
    teacherName: "Maya Patel",
    teacherAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    duration: "52 mins",
    content: {
      sections: [
        {
          title: "Your Carbon Footprint",
          content: "Understanding where your environmental impact comes from is the first step to reducing it. We'll calculate your footprint and identify high-impact changes.",
          keyPoints: [
            "Transportation and food are the biggest individual impact areas",
            "Small changes add up to significant results",
            "Measure what matters to track progress"
          ]
        },
        {
          title: "Systems Thinking for Climate",
          content: "Individual action matters, but systemic change is essential. Learn how to identify leverage points and create collective impact.",
          keyPoints: [
            "Vote with your wallet and your ballot",
            "Collective action multiplies individual effort",
            "Technology and policy are key to scaling solutions"
          ]
        }
      ]
    },
    tags: ["climate", "sustainability", "environment", "systems-thinking"],
    realWorldApplication: "Reduce your carbon footprint, influence corporate sustainability, and contribute to climate solutions",
    careerPaths: ["Sustainability Consultant", "Environmental Scientist", "Renewable Energy Engineer", "Policy Advocate"],
    views: 9870,
    likes: 756,
    createdAt: "2026-03-18"
  },
  {
    id: "4",
    title: "Communication Skills for the Real World",
    description: "Master public speaking, active listening, and persuasive communication - skills that determine success in any career",
    category: "Life Skills",
    subcategory: "Communication",
    teacherName: "Alex Thompson",
    teacherAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    duration: "41 mins",
    content: {
      sections: [
        {
          title: "The Art of Active Listening",
          content: "Most people listen to respond, not to understand. Transform your relationships and career by becoming a master listener.",
          keyPoints: [
            "Listen with intent to understand, not to reply",
            "Ask clarifying questions before giving advice",
            "Body language and presence matter as much as words"
          ]
        },
        {
          title: "Public Speaking Without Fear",
          content: "Public speaking is the #1 fear for most people, yet it's essential for career advancement. Learn practical techniques to speak with confidence.",
          keyPoints: [
            "Preparation eliminates 80% of nervousness",
            "Focus on your message, not yourself",
            "Practice in low-stakes environments first"
          ]
        }
      ]
    },
    tags: ["communication", "public-speaking", "leadership", "soft-skills"],
    realWorldApplication: "Lead meetings, deliver presentations, negotiate effectively, and build professional relationships",
    careerPaths: ["Manager", "Sales Professional", "Entrepreneur", "Educator", "Consultant"],
    views: 11200,
    likes: 843,
    createdAt: "2026-03-22"
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Community Financial Literacy Program",
    description: "Create free financial education workshops for underserved communities",
    category: "Finance",
    difficulty: "intermediate",
    contributors: 24,
    impact: "Reaching 500+ families with essential money management skills",
    tags: ["finance", "education", "community"]
  },
  {
    id: "2",
    title: "Mental Health First Aid Network",
    description: "Build peer support networks and crisis resources in schools and workplaces",
    category: "Health",
    difficulty: "advanced",
    contributors: 18,
    impact: "Supporting 1000+ individuals with mental health resources",
    tags: ["mental-health", "support", "crisis-intervention"]
  },
  {
    id: "3",
    title: "Local Climate Action Toolkit",
    description: "Develop practical guides for reducing community carbon footprint",
    category: "Environment",
    difficulty: "beginner",
    contributors: 32,
    impact: "Helping 50+ communities implement sustainability initiatives",
    tags: ["climate", "sustainability", "local-action"]
  }
];

export const communityPosts: CommunityPost[] = [
  {
    id: "1",
    author: "Jordan Lee",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content: "Just finished the Financial Literacy course and immediately started my investment account! Why didn't anyone teach us this in school? 🚀",
    category: "Life Skills",
    timestamp: "2 hours ago",
    likes: 45,
    comments: 12
  },
  {
    id: "2",
    author: "Sam Rivera",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    content: "Looking for collaborators on a project to teach coding to kids in low-income areas. Who's interested in making an impact?",
    category: "Impact",
    timestamp: "5 hours ago",
    likes: 67,
    comments: 23
  },
  {
    id: "3",
    author: "Taylor Kim",
    authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop",
    content: "The emotional intelligence lessons have transformed how I handle workplace conflicts. Highly recommend!",
    category: "Life Skills",
    timestamp: "1 day ago",
    likes: 89,
    comments: 18
  }
];

// Categories for organizing content
export const categories = [
  { id: "life-skills", name: "Life Skills", icon: "💡", color: "bg-purple-500" },
  { id: "impact", name: "Make an Impact", icon: "🌍", color: "bg-green-500" },
  { id: "career", name: "Career Development", icon: "🚀", color: "bg-blue-500" },
  { id: "health", name: "Health & Wellness", icon: "❤️", color: "bg-red-500" },
  { id: "technology", name: "Technology", icon: "💻", color: "bg-indigo-500" },
  { id: "business", name: "Business & Entrepreneurship", icon: "💼", color: "bg-orange-500" },
];
