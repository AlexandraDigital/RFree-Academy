import { useState } from "react";
import { useParams, Link } from "react-router";
import { Play, Heart, Share2, Download, MessageCircle, CheckCircle, ArrowLeft, Lightbulb } from "lucide-react";
import { lessons } from "../data/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const lesson = lessons.find((l) => l.id === id);
  const [liked, setLiked] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Button asChild>
            <Link to="/explore">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Explore
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link to="/explore">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Explore
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <Card className="overflow-hidden">
            <div className="relative bg-gray-900 aspect-video">
              {/* Placeholder video player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video Player</p>
                  <p className="text-sm text-gray-400 mt-2">{lesson.duration}</p>
                </div>
              </div>
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 rounded-full w-20 h-20"
                >
                  <Play className="w-10 h-10" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Lesson Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-3xl font-bold mb-3">{lesson.title}</h1>
                  <p className="text-lg text-gray-700 mb-4">{lesson.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {lesson.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Teacher Info */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <img
                  src={lesson.teacherAvatar}
                  alt={lesson.teacherName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{lesson.teacherName}</p>
                  <p className="text-sm text-gray-600">{lesson.category}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={liked ? "default" : "outline"}
                  onClick={() => setLiked(!liked)}
                  className={liked ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                  {liked ? "Liked" : "Like"} ({lesson.likes.toLocaleString()})
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Content */}
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Lesson Content</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {lesson.content.sections.map((section, index) => (
                      <AccordionItem key={index} value={`section-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">Section {index + 1}</Badge>
                            <span className="font-semibold">{section.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4">
                            <p className="text-gray-700 mb-4">{section.content}</p>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-5 h-5 text-purple-600" />
                                <p className="font-semibold text-purple-900">Key Points</p>
                              </div>
                              <ul className="space-y-2">
                                {section.keyPoints.map((point, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-purple-800">
                                    <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Video Transcript</CardTitle>
                  <CardDescription>Auto-generated with AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {lesson.transcript || "Transcript is being generated..."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Discussion</CardTitle>
                  <CardDescription>
                    Ask questions and share insights with other learners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No comments yet. Be the first to start a discussion!</p>
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                      Add Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Real-World Application */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Real-World Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-900">{lesson.realWorldApplication}</p>
            </CardContent>
          </Card>

          {/* Career Paths */}
          {lesson.careerPaths && lesson.careerPaths.length > 0 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Career Paths</CardTitle>
                <CardDescription>Where this skill can take you</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lesson.careerPaths.map((career) => (
                    <li
                      key={career}
                      className="flex items-center gap-2 text-sm text-blue-900"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      {career}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lesson Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Views</span>
                <span className="font-semibold">{lesson.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Likes</span>
                <span className="font-semibold">{lesson.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold">{lesson.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Published</span>
                <span className="font-semibold">{lesson.createdAt}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}