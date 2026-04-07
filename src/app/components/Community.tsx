import { useState } from "react";
import { Heart, MessageCircle, Share2, Users, TrendingUp, Sparkles } from "lucide-react";
import { communityPosts, categories } from "../data/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Avatar } from "./ui/avatar";

export function Community() {
  const [newPost, setNewPost] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredPosts = activeFilter
    ? communityPosts.filter((post) => post.category === activeFilter)
    : communityPosts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Community</h1>
        <p className="text-xl text-gray-600">
          Connect with mission-driven learners and teachers making an impact
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">Share with the Community</CardTitle>
              <CardDescription>
                Share insights, ask questions, or find collaborators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Share a success, ask a question, or propose a project..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-2">
                    <option>Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filter */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(null)}
              className={activeFilter === null ? "bg-purple-600" : ""}
            >
              All Posts
            </Button>
            {categories.slice(0, 4).map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.name ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setActiveFilter(activeFilter === category.name ? null : category.name)
                }
                className={activeFilter === category.name ? "bg-purple-600" : ""}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold">{post.author}</p>
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-gray-500 ml-auto">
                          {post.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-800 mb-4">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Stats */}
          <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-0">
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">50,247</p>
                  <p className="text-sm text-purple-100">Active Members</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">12,430</p>
                  <p className="text-sm text-purple-100">Discussions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">340</p>
                  <p className="text-sm text-purple-100">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { tag: "financial-literacy", count: "1.2K posts" },
                  { tag: "mental-health", count: "856 posts" },
                  { tag: "climate-action", count: "624 posts" },
                  { tag: "career-change", count: "498 posts" },
                  { tag: "entrepreneurship", count: "387 posts" },
                ].map((topic) => (
                  <button
                    key={topic.tag}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors text-left"
                  >
                    <span className="font-semibold text-purple-700">#{topic.tag}</span>
                    <span className="text-sm text-gray-600">{topic.count}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Members */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Contributors</CardTitle>
              <CardDescription>Most helpful community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Alex Chen",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                    contributions: "127 helpful posts",
                  },
                  {
                    name: "Maya Rodriguez",
                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
                    contributions: "98 helpful posts",
                  },
                  {
                    name: "Jordan Kim",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
                    contributions: "84 helpful posts",
                  },
                ].map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.contributions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Be respectful and supportive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Share knowledge freely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Focus on real-world impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Collaborate, don't compete</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
