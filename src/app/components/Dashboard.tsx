import { Link } from "react-router";
import { ArrowRight, Play, Users, Zap, Heart, TrendingUp } from "lucide-react";
import { lessons, categories } from "../data/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Dashboard() {
  const featuredLessons = lessons.slice(0, 4);
  const stats = [
    { label: "Active Learners", value: "50K+", icon: Users, color: "text-purple-600" },
    { label: "Free Lessons", value: "1,200+", icon: Play, color: "text-indigo-600" },
    { label: "Impact Projects", value: "340+", icon: Heart, color: "text-pink-600" },
    { label: "Career Paths", value: "150+", icon: TrendingUp, color: "text-blue-600" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Learn Skills That Actually Matter
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Free education focused on real-world skills, financial literacy, mental health, and making an impact. 
              No tuition, no traditional tests—just practical knowledge for life and career success.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Link to="/explore" className="flex items-center">
                  Start Learning Free <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/teach" className="flex items-center">
                  Share Your Knowledge
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-white shadow-lg">
                <CardContent className="p-6 text-center">
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-purple-900">Why Traditional School Fails You</h2>
            <p className="text-lg text-purple-800 mb-6">
              The current education system teaches you to memorize facts for tests, but not how to manage money, 
              build mental resilience, communicate effectively, or find meaningful work. We're changing that.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Real-World Skills</h3>
                  <p className="text-sm text-purple-700">Financial literacy, communication, mental health, and career development</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Mission-Driven</h3>
                  <p className="text-sm text-purple-700">Learn by solving real problems and making an impact</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Community Learning</h3>
                  <p className="text-sm text-purple-700">Connect with peers and mentors who share your goals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Career Focused</h3>
                  <p className="text-sm text-purple-700">Build skills that lead to meaningful careers, not just jobs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/explore"
              className={`${category.color} text-white rounded-xl p-6 text-center hover:scale-105 transition-transform`}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <p className="font-semibold text-sm">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Lessons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Lessons</h2>
          <Button asChild variant="outline">
            <Link to="/explore">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredLessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-xl transition-all group border-purple-100">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={lesson.teacherAvatar}
                    alt={lesson.teacherName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                        {lesson.title}
                      </CardTitle>
                      <Badge variant="secondary" className="shrink-0">{lesson.duration}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">by {lesson.teacherName}</p>
                    <CardDescription>{lesson.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-purple-200 text-purple-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Play className="w-4 h-4" /> {lesson.views.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {lesson.likes.toLocaleString()} likes
                  </span>
                </div>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link to={`/lesson/${lesson.id}`}>
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn What Really Matters?</h2>
          <p className="text-xl mb-6 text-indigo-100 max-w-2xl mx-auto">
            Join thousands of mission-driven learners building skills for real-world success. 
            100% free, forever.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
            <Link to="/explore">
              Explore All Courses <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
