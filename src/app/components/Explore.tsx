import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Play, Heart, Clock } from "lucide-react";
import { lessons, categories } from "../data/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

export function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      searchTerm === "" ||
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === null || lesson.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore All Lessons</h1>
        <p className="text-xl text-gray-600">
          Discover free courses on life skills, career development, and making an impact
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search lessons, skills, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 text-lg border-purple-200 focus:border-purple-400"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? "bg-purple-600" : ""}
          >
            <Filter className="w-4 h-4 mr-2" />
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )
              }
              className={selectedCategory === category.name ? "bg-purple-600" : ""}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-purple-600">{filteredLessons.length}</span>{" "}
          {filteredLessons.length === 1 ? "lesson" : "lessons"}
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-xl transition-all group border-purple-100">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={lesson.teacherAvatar}
                  alt={lesson.teacherName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{lesson.teacherName}</p>
                  <Badge variant="secondary" className="text-xs">
                    {lesson.category}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                {lesson.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {lesson.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {lesson.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-purple-200 text-purple-700"
                  >
                    {tag}
                  </Badge>
                ))}
                {lesson.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                    +{lesson.tags.length - 2}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {lesson.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" /> {(lesson.views / 1000).toFixed(1)}K
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" /> {lesson.likes}
                </span>
              </div>

              {lesson.realWorldApplication && (
                <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs font-semibold text-purple-900 mb-1">Real-World Impact:</p>
                  <p className="text-xs text-purple-700 line-clamp-2">
                    {lesson.realWorldApplication}
                  </p>
                </div>
              )}

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

      {/* No Results */}
      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No lessons found matching your search.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory(null);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
