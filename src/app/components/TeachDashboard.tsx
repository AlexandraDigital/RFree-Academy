import { Link } from "react-router";
import { Video, FileText, Sparkles, Upload, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function TeachDashboard() {
  const teachingOptions = [
    {
      title: "AI-Powered Lesson Creator",
      description: "Use AI to generate structured lesson content from your topics and expertise",
      icon: Sparkles,
      href: "/create-lesson",
      color: "from-purple-500 to-indigo-500",
      badge: "AI-Assisted"
    },
    {
      title: "Record with Screen Share",
      description: "Record lessons with webcam + screen capture for tutorials and demonstrations",
      icon: Video,
      href: "/record-lesson",
      color: "from-blue-500 to-cyan-500",
      badge: "Popular"
    },
    {
      title: "Upload Video Lesson",
      description: "Upload pre-recorded MP4 videos and add transcripts automatically",
      icon: Upload,
      href: "/create-lesson?mode=upload",
      color: "from-green-500 to-emerald-500",
      badge: "Quick"
    },
    {
      title: "Thumbnail Generator",
      description: "Create professional thumbnails that get 10x more clicks",
      icon: FileText,
      href: "/thumbnail-generator",
      color: "from-orange-500 to-red-500",
      badge: "New"
    },
  ];

  const stats = [
    { label: "Students Reached", value: "2.4K", icon: Users },
    { label: "Avg. Engagement", value: "87%", icon: TrendingUp },
    { label: "Lessons Created", value: "12", icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Share Your Knowledge</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Help others learn real-world skills by creating free lessons. Use AI to structure your content, 
          record with screen sharing, or upload existing videos. Your expertise can change lives.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 border-0 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Why Teach Here?</CardTitle>
          <CardDescription className="text-purple-100">
            Traditional education focuses on theory and tests. We focus on practical skills that matter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">💡 Real Impact</h3>
              <p className="text-sm text-purple-100">
                Teach financial literacy, mental health, communication, or any skill traditional schools ignore
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🌍 Free for All</h3>
              <p className="text-sm text-purple-100">
                Your lessons reach everyone, everywhere, regardless of their financial situation
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🚀 AI-Powered</h3>
              <p className="text-sm text-purple-100">
                Our AI helps structure your knowledge into engaging, effective lessons
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teaching Options */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Create Your First Lesson</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {teachingOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.title}
                className="hover:shadow-xl transition-all group cursor-pointer border-2 border-transparent hover:border-purple-300"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    {option.badge && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link to={option.href}>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Your Teaching Impact</CardTitle>
          <CardDescription>See how your lessons are making a difference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-3xl font-bold text-purple-600 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="mt-12 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle>Teaching Guidelines</CardTitle>
          <CardDescription>What makes a great lesson on Impact Academy</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold">Focus on Real-World Skills</p>
                <p className="text-sm text-gray-600">
                  Teach what people actually need: financial literacy, communication, mental health, career skills
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold">Make It Actionable</p>
                <p className="text-sm text-gray-600">
                  Students should be able to apply what they learn immediately in their lives
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold">Connect to Career Paths</p>
                <p className="text-sm text-gray-600">
                  Show how skills lead to meaningful careers and opportunities
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <p className="font-semibold">Be Authentic</p>
                <p className="text-sm text-gray-600">
                  Share your real experiences, failures, and insights—not just theory
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}