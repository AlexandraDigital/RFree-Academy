import { useState } from "react";
import { Plus, Users, Target, TrendingUp, Heart, Filter } from "lucide-react";
import { projects, categories } from "../data/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function Projects() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredProjects = selectedDifficulty
    ? projects.filter((p) => p.difficulty === selectedDifficulty)
    : projects;

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 border-green-300",
    intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300",
    advanced: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Impact Projects</h1>
        <p className="text-xl text-gray-600">
          Collaborate on real-world projects that make a difference. Learn by doing, create lasting change.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 border-0 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Project-Based Learning</CardTitle>
          <CardDescription className="text-purple-100">
            Real skills come from real projects, not textbooks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Real Impact
              </h3>
              <p className="text-sm text-purple-100">
                Work on projects that address actual problems in communities
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Collaborate
              </h3>
              <p className="text-sm text-purple-100">
                Team up with learners and experts from around the world
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Build Portfolio
              </h3>
              <p className="text-sm text-purple-100">
                Create tangible work that demonstrates your skills to employers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Project CTA */}
      <Card className="mb-8 border-purple-200 bg-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Have a Project Idea?</CardTitle>
              <CardDescription>
                Share your vision and find collaborators to make it happen
              </CardDescription>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <Button
            variant={selectedDifficulty === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDifficulty(null)}
            className={selectedDifficulty === null ? "bg-purple-600" : ""}
          >
            <Filter className="w-4 h-4 mr-2" />
            All Levels
          </Button>
          <Button
            variant={selectedDifficulty === "beginner" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setSelectedDifficulty(selectedDifficulty === "beginner" ? null : "beginner")
            }
            className={selectedDifficulty === "beginner" ? "bg-green-600" : ""}
          >
            Beginner
          </Button>
          <Button
            variant={selectedDifficulty === "intermediate" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setSelectedDifficulty(selectedDifficulty === "intermediate" ? null : "intermediate")
            }
            className={selectedDifficulty === "intermediate" ? "bg-yellow-600" : ""}
          >
            Intermediate
          </Button>
          <Button
            variant={selectedDifficulty === "advanced" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setSelectedDifficulty(selectedDifficulty === "advanced" ? null : "advanced")
            }
            className={selectedDifficulty === "advanced" ? "bg-red-600" : ""}
          >
            Advanced
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-xl transition-all group">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <Badge className={difficultyColors[project.difficulty]}>
                  {project.difficulty}
                </Badge>
                <Badge variant="secondary">{project.category}</Badge>
              </div>
              <CardTitle className="group-hover:text-purple-600 transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-green-900 mb-1">Impact</p>
                      <p className="text-xs text-green-800">{project.impact}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Contributors</span>
                    <span className="font-semibold">{project.contributors}</span>
                  </div>
                  <Progress value={(project.contributors / 50) * 100} className="h-2" />
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Users className="w-4 h-4 mr-2" />
                  Join Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Project */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">Featured Project</Badge>
              <CardTitle className="text-2xl">Global Skills Exchange Platform</CardTitle>
              <CardDescription className="text-indigo-100">
                Build a platform connecting people who want to learn with those who want to teach
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-sm text-purple-100 mb-1">Skills Needed</p>
              <p className="font-semibold">Web Dev, Design, Marketing</p>
            </div>
            <div>
              <p className="text-sm text-purple-100 mb-1">Current Team</p>
              <p className="font-semibold">47 Contributors</p>
            </div>
            <div>
              <p className="text-sm text-purple-100 mb-1">Impact Goal</p>
              <p className="font-semibold">Connect 10K+ learners</p>
            </div>
          </div>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
            <Users className="w-5 h-5 mr-2" />
            Join This Project
          </Button>
        </CardContent>
      </Card>

      {/* How Projects Work */}
      <Card className="mt-12 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle>How Impact Projects Work</CardTitle>
          <CardDescription>From idea to real-world change</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold mb-2">Find or Create</h3>
              <p className="text-sm text-gray-600">
                Browse projects or pitch your own idea to the community
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold mb-2">Collaborate</h3>
              <p className="text-sm text-gray-600">
                Work with team members using real tools and workflows
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold mb-2">Launch</h3>
              <p className="text-sm text-gray-600">
                Deploy your project and measure its real-world impact
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-3">
                4
              </div>
              <h3 className="font-semibold mb-2">Showcase</h3>
              <p className="text-sm text-gray-600">
                Add to your portfolio and share your impact story
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
