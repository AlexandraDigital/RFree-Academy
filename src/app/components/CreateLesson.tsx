import { useState } from "react";
import { Sparkles, Upload, FileVideo, FileText, Zap, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function CreateLesson() {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    category: "",
    subtopics: "",
    teacherExpertise: "",
    realWorldApplication: "",
    targetAudience: "",
    videoFile: null as File | null,
  });
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockGenerated = {
      title: `Mastering ${formData.topic}`,
      description: `A comprehensive guide to ${formData.topic} with real-world applications and actionable insights.`,
      sections: [
        {
          title: "Introduction & Fundamentals",
          content: `Understanding the core concepts of ${formData.topic} is essential for ${formData.targetAudience}. We'll start with the basics and build up to advanced applications.`,
          keyPoints: [
            `Define what ${formData.topic} means in practical terms`,
            "Understand why this skill matters in the real world",
            "Identify common misconceptions and pitfalls",
          ],
          duration: "10 mins",
        },
        {
          title: "Deep Dive & Techniques",
          content: `Now that we've covered the basics, let's explore the specific techniques and strategies that make ${formData.topic} effective in real-world scenarios.`,
          keyPoints: [
            "Learn proven frameworks and methodologies",
            "Practice with real-world examples",
            "Understand when and how to apply each technique",
          ],
          duration: "15 mins",
        },
        {
          title: "Real-World Application",
          content: formData.realWorldApplication || `Apply ${formData.topic} to solve actual problems and create tangible results in your life and career.`,
          keyPoints: [
            "Immediate actions you can take today",
            "Common challenges and how to overcome them",
            "Measuring your progress and success",
          ],
          duration: "12 mins",
        },
        {
          title: "Career Paths & Next Steps",
          content: `Discover how mastering ${formData.topic} can open doors to meaningful careers and opportunities for impact.`,
          keyPoints: [
            "Career opportunities that leverage this skill",
            "Building a portfolio and gaining experience",
            "Continuing your learning journey",
          ],
          duration: "8 mins",
        },
      ],
      suggestedTags: formData.subtopics
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
      estimatedDuration: "45 mins",
    };

    setGeneratedContent(mockGenerated);
    setGenerating(false);
    setStep(3);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "video/mp4") {
      setFormData({ ...formData, videoFile: file });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Create New Lesson</h1>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            Step {step} of 3
          </Badge>
        </div>
        <Progress value={(step / 3) * 100} className="h-2" />
      </div>

      {/* Step 1: Topic & Expertise */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>What Will You Teach?</CardTitle>
                <CardDescription>
                  Tell us about your topic and expertise. Our AI will help structure your knowledge.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="topic" className="text-base font-semibold mb-2 block">
                Main Topic or Skill
              </Label>
              <Input
                id="topic"
                placeholder="e.g., Financial Literacy, Public Speaking, Mental Health..."
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="text-lg py-6"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-base font-semibold mb-2 block">
                Category
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a category...</option>
                <option value="Life Skills">Life Skills</option>
                <option value="Career Development">Career Development</option>
                <option value="Impact">Make an Impact</option>
                <option value="Health">Health & Wellness</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business & Entrepreneurship</option>
              </select>
            </div>

            <div>
              <Label htmlFor="subtopics" className="text-base font-semibold mb-2 block">
                Subtopics & Key Areas
              </Label>
              <Input
                id="subtopics"
                placeholder="e.g., budgeting, investing, debt management (comma-separated)"
                value={formData.subtopics}
                onChange={(e) => setFormData({ ...formData, subtopics: e.target.value })}
              />
              <p className="text-sm text-gray-500 mt-1">Separate multiple subtopics with commas</p>
            </div>

            <div>
              <Label htmlFor="expertise" className="text-base font-semibold mb-2 block">
                Your Expertise & Experience
              </Label>
              <Textarea
                id="expertise"
                placeholder="What's your background? What unique insights can you share? Why should students learn from you?"
                value={formData.teacherExpertise}
                onChange={(e) => setFormData({ ...formData, teacherExpertise: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="application" className="text-base font-semibold mb-2 block">
                Real-World Application
              </Label>
              <Textarea
                id="application"
                placeholder="How will students use this skill in real life? What problems does it solve?"
                value={formData.realWorldApplication}
                onChange={(e) => setFormData({ ...formData, realWorldApplication: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="audience" className="text-base font-semibold mb-2 block">
                Target Audience
              </Label>
              <Input
                id="audience"
                placeholder="e.g., Young adults starting their careers, Anyone struggling with money..."
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              />
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.topic || !formData.category}
              className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg"
            >
              Continue to Video Upload
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Upload Video */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <FileVideo className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>Upload Your Lesson Video</CardTitle>
                <CardDescription>
                  Upload an MP4 video or skip to generate lesson content first
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-12 text-center hover:border-purple-500 transition-colors">
              <input
                type="file"
                accept="video/mp4"
                onChange={handleFileChange}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                {formData.videoFile ? (
                  <div>
                    <p className="text-lg font-semibold text-purple-600 mb-1">
                      {formData.videoFile.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(formData.videoFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button variant="outline" className="mt-4">
                      Change Video
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-semibold mb-2">
                      Drop your MP4 video here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">Maximum file size: 500MB</p>
                  </div>
                )}
              </label>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-900 mb-1">AI Enhancement</p>
                  <p className="text-sm text-purple-700">
                    Once uploaded, we'll automatically generate transcripts, timestamps, and key points from your video.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleGenerate}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Lesson with AI
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: AI Generated Content */}
      {step === 3 && (
        <div className="space-y-6">
          {generating ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Zap className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-pulse" />
                <h3 className="text-xl font-semibold mb-2">AI is Generating Your Lesson...</h3>
                <p className="text-gray-600 mb-4">
                  Analyzing your topic, structuring content, and creating engaging lesson sections
                </p>
                <Progress value={65} className="max-w-md mx-auto" />
              </CardContent>
            </Card>
          ) : generatedContent ? (
            <>
              <Card className="border-purple-300 bg-purple-50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <div>
                      <CardTitle className="text-purple-900">AI-Generated Lesson Structure</CardTitle>
                      <CardDescription className="text-purple-700">
                        Review and customize your lesson content below
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{generatedContent.title}</CardTitle>
                  <CardDescription>{generatedContent.description}</CardDescription>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="secondary">{formData.category}</Badge>
                    <Badge variant="outline">{generatedContent.estimatedDuration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {generatedContent.sections.map((section: any, index: number) => (
                      <div key={index} className="border-l-4 border-purple-500 pl-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">Section {index + 1}</Badge>
                          <h3 className="font-semibold text-lg">{section.title}</h3>
                          <span className="text-sm text-gray-500 ml-auto">{section.duration}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{section.content}</p>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <p className="text-sm font-semibold text-purple-900 mb-2">Key Points:</p>
                          <ul className="space-y-1">
                            {section.keyPoints.map((point: string, i: number) => (
                              <li key={i} className="text-sm text-purple-800 flex items-start gap-2">
                                <span className="text-purple-500">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Real-World Application:</h4>
                    <p className="text-sm text-green-800">{formData.realWorldApplication}</p>
                  </div>

                  <div className="mt-4">
                    <Label className="text-sm font-semibold mb-2 block">Suggested Tags:</Label>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.suggestedTags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-purple-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back to Edit
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6">
                  <FileText className="w-5 h-5 mr-2" />
                  Publish Lesson
                </Button>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
