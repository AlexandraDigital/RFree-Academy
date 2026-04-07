import { useState, useRef } from "react";
import { Download, Palette, Type, Image as ImageIcon, Sparkles, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

export function ThumbnailGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnailData, setThumbnailData] = useState({
    title: "",
    subtitle: "",
    category: "Life Skills",
    bgColor: "#7c3aed", // purple-600
    textColor: "#ffffff",
    template: "gradient",
  });

  const templates = [
    { id: "gradient", name: "Gradient", preview: "bg-gradient-to-br from-purple-600 to-indigo-600" },
    { id: "split", name: "Split Color", preview: "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500" },
    { id: "minimal", name: "Minimal", preview: "bg-white border-4 border-purple-600" },
    { id: "bold", name: "Bold", preview: "bg-black" },
  ];

  const categories = [
    { name: "Life Skills", color: "#7c3aed", emoji: "💡" },
    { name: "Career", color: "#2563eb", emoji: "🚀" },
    { name: "Impact", color: "#059669", emoji: "🌍" },
    { name: "Health", color: "#dc2626", emoji: "❤️" },
    { name: "Tech", color: "#4f46e5", emoji: "💻" },
    { name: "Business", color: "#ea580c", emoji: "💼" },
  ];

  const generateThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to YouTube thumbnail dimensions
    canvas.width = 1280;
    canvas.height = 720;

    // Draw background based on template
    if (thumbnailData.template === "gradient") {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, thumbnailData.bgColor);
      gradient.addColorStop(1, adjustColor(thumbnailData.bgColor, -40));
      ctx.fillStyle = gradient;
    } else if (thumbnailData.template === "split") {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, thumbnailData.bgColor);
      gradient.addColorStop(0.5, "#ec4899");
      gradient.addColorStop(1, "#f97316");
      ctx.fillStyle = gradient;
    } else if (thumbnailData.template === "minimal") {
      ctx.fillStyle = "#ffffff";
    } else {
      ctx.fillStyle = "#000000";
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add border for minimal template
    if (thumbnailData.template === "minimal") {
      ctx.strokeStyle = thumbnailData.bgColor;
      ctx.lineWidth = 20;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    }

    // Draw category badge
    const categoryData = categories.find((c) => c.name === thumbnailData.category);
    if (categoryData) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fillRect(40, 40, 200, 60);
      
      ctx.font = "bold 36px sans-serif";
      ctx.fillStyle = thumbnailData.template === "minimal" ? thumbnailData.bgColor : "#ffffff";
      ctx.fillText(`${categoryData.emoji} ${categoryData.name}`, 60, 85);
    }

    // Draw title
    ctx.font = "bold 80px sans-serif";
    ctx.fillStyle = thumbnailData.template === "minimal" ? "#000000" : thumbnailData.textColor;
    ctx.textAlign = "center";
    
    // Word wrap title
    const words = thumbnailData.title.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    
    words.forEach((word) => {
      const testLine = currentLine + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > canvas.width - 100 && currentLine !== "") {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());

    const startY = canvas.height / 2 - (lines.length * 90) / 2;
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + index * 90);
    });

    // Draw subtitle
    if (thumbnailData.subtitle) {
      ctx.font = "36px sans-serif";
      ctx.fillStyle = thumbnailData.template === "minimal" ? "#666666" : "rgba(255, 255, 255, 0.9)";
      ctx.fillText(thumbnailData.subtitle, canvas.width / 2, startY + lines.length * 90 + 40);
    }

    // Draw "Impact Academy" branding
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "left";
    ctx.fillStyle = thumbnailData.template === "minimal" ? thumbnailData.bgColor : "rgba(255, 255, 255, 0.8)";
    ctx.fillText("✨ Impact Academy", 40, canvas.height - 40);
  };

  const adjustColor = (color: string, amount: number) => {
    const num = parseInt(color.replace("#", ""), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  };

  const downloadThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${thumbnailData.title.replace(/\s+/g, "-").toLowerCase()}-thumbnail.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // Generate on mount and when data changes
  useState(() => {
    setTimeout(generateThumbnail, 100);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Thumbnail Generator</h1>
        <p className="text-xl text-gray-600">
          Create eye-catching thumbnails for your lessons with AI-powered templates
        </p>
      </div>

      {/* AI Assistant Card */}
      <Card className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <CardTitle>Professional Thumbnails in Seconds</CardTitle>
              <CardDescription className="text-purple-100">
                Great thumbnails get 10x more clicks. Stand out with custom designs.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Thumbnail Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="font-semibold mb-2 block">
                  Lesson Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Master Financial Literacy"
                  value={thumbnailData.title}
                  onChange={(e) => {
                    setThumbnailData({ ...thumbnailData, title: e.target.value });
                    setTimeout(generateThumbnail, 10);
                  }}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="subtitle" className="font-semibold mb-2 block">
                  Subtitle (Optional)
                </Label>
                <Input
                  id="subtitle"
                  placeholder="e.g., Build Wealth from Zero"
                  value={thumbnailData.subtitle}
                  onChange={(e) => {
                    setThumbnailData({ ...thumbnailData, subtitle: e.target.value });
                    setTimeout(generateThumbnail, 10);
                  }}
                />
              </div>

              <div>
                <Label className="font-semibold mb-3 block">Category</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setThumbnailData({
                          ...thumbnailData,
                          category: cat.name,
                          bgColor: cat.color,
                        });
                        setTimeout(generateThumbnail, 10);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        thumbnailData.category === cat.name
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{cat.emoji}</span>
                      <span className="text-sm font-semibold">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Design Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setThumbnailData({ ...thumbnailData, template: template.id });
                      setTimeout(generateThumbnail, 10);
                    }}
                    className={`relative rounded-lg overflow-hidden border-4 transition-all ${
                      thumbnailData.template === template.id
                        ? "border-purple-600 scale-105"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className={`h-24 ${template.preview} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{template.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <Label htmlFor="bgColor" className="font-semibold mb-2 block">
                  Custom Background Color
                </Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="bgColor"
                    value={thumbnailData.bgColor}
                    onChange={(e) => {
                      setThumbnailData({ ...thumbnailData, bgColor: e.target.value });
                      setTimeout(generateThumbnail, 10);
                    }}
                    className="w-16 h-12 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    value={thumbnailData.bgColor}
                    onChange={(e) => {
                      setThumbnailData({ ...thumbnailData, bgColor: e.target.value });
                      setTimeout(generateThumbnail, 10);
                    }}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Use 5-7 words max for title - short and punchy wins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>High contrast colors make text more readable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Test thumbnail at small size - it needs to work on mobile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Thumbnails with faces get 154% more clicks</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Preview
                </CardTitle>
                <Badge variant="secondary">1280 x 720</Badge>
              </div>
              <CardDescription>This is how your thumbnail will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto rounded-lg shadow-lg"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>

              <Button
                onClick={downloadThumbnail}
                disabled={!thumbnailData.title}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-lg py-6"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Thumbnail (PNG)
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-900">Ready to Create?</CardTitle>
              <CardDescription className="text-green-700">
                Use this thumbnail in your lesson creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Create Lesson with This Thumbnail
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
