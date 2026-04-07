import { useState, useRef } from "react";
import { Video, Monitor, Mic, Square, Play, Pause, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export function RecordLesson() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingMode, setRecordingMode] = useState({
    webcam: true,
    screen: true,
    audio: true,
  });
  const [hasRecording, setHasRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // In a real implementation, this would use MediaRecorder API
    const interval = setInterval(() => {
      setRecordingTime((t) => t + 1);
    }, 1000);

    // Store interval ID for cleanup
    (window as any).recordingInterval = interval;
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setHasRecording(true);
    
    if ((window as any).recordingInterval) {
      clearInterval((window as any).recordingInterval);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Record Your Lesson</h1>
        <p className="text-xl text-gray-600">
          Capture your screen, webcam, and audio to create engaging video lessons
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Recording Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recording Preview</CardTitle>
              <CardDescription>
                {isRecording
                  ? "Recording in progress..."
                  : hasRecording
                  ? "Preview your recording"
                  : "Configure settings and start recording"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                {!isRecording && !hasRecording ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Video className="w-16 h-16 mx-auto mb-4" />
                      <p>Click "Start Recording" to begin</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    {/* Placeholder for video preview */}
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Monitor className="w-20 h-20 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">
                          {isRecording ? "🔴 Recording..." : "Recording Preview"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Webcam overlay (bottom right) */}
                    {recordingMode.webcam && (
                      <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-purple-700 to-indigo-700 flex items-center justify-center">
                          <Video className="w-12 h-12 text-white opacity-50" />
                        </div>
                      </div>
                    )}

                    {/* Recording indicator */}
                    {isRecording && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        <span className="font-semibold">{formatTime(recordingTime)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Recording Controls */}
              <div className="mt-6 flex items-center justify-center gap-4">
                {!isRecording && !hasRecording && (
                  <Button
                    size="lg"
                    onClick={startRecording}
                    disabled={!recordingMode.screen && !recordingMode.webcam}
                    className="bg-red-600 hover:bg-red-700 px-8"
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Start Recording
                  </Button>
                )}

                {isRecording && (
                  <>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={togglePause}
                      className="px-8"
                    >
                      {isPaused ? (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          Pause
                        </>
                      )}
                    </Button>
                    <Button
                      size="lg"
                      onClick={stopRecording}
                      className="bg-red-600 hover:bg-red-700 px-8"
                    >
                      <Square className="w-5 h-5 mr-2" />
                      Stop Recording
                    </Button>
                  </>
                )}

                {hasRecording && !isRecording && (
                  <>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setHasRecording(false)}
                      className="px-8"
                    >
                      Record Again
                    </Button>
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 px-8"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Save & Continue
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">Recording Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Close unnecessary applications to improve performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Test your microphone before starting the recording</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Use a quiet environment for better audio quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Position your webcam at eye level for professional appearance</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recording Settings</CardTitle>
              <CardDescription>Choose what to capture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-purple-600" />
                  <Label htmlFor="screen" className="cursor-pointer">
                    <div>
                      <p className="font-semibold">Screen Capture</p>
                      <p className="text-xs text-gray-500">Record your screen</p>
                    </div>
                  </Label>
                </div>
                <Switch
                  id="screen"
                  checked={recordingMode.screen}
                  onCheckedChange={(checked) =>
                    setRecordingMode({ ...recordingMode, screen: checked })
                  }
                  disabled={isRecording}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-purple-600" />
                  <Label htmlFor="webcam" className="cursor-pointer">
                    <div>
                      <p className="font-semibold">Webcam</p>
                      <p className="text-xs text-gray-500">Show your face</p>
                    </div>
                  </Label>
                </div>
                <Switch
                  id="webcam"
                  checked={recordingMode.webcam}
                  onCheckedChange={(checked) =>
                    setRecordingMode({ ...recordingMode, webcam: checked })
                  }
                  disabled={isRecording}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-purple-600" />
                  <Label htmlFor="audio" className="cursor-pointer">
                    <div>
                      <p className="font-semibold">Microphone</p>
                      <p className="text-xs text-gray-500">Record audio</p>
                    </div>
                  </Label>
                </div>
                <Switch
                  id="audio"
                  checked={recordingMode.audio}
                  onCheckedChange={(checked) =>
                    setRecordingMode({ ...recordingMode, audio: checked })
                  }
                  disabled={isRecording}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="shrink-0">1</Badge>
                  <span>Configure your recording settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="shrink-0">2</Badge>
                  <span>Click "Start Recording" and allow browser permissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="shrink-0">3</Badge>
                  <span>Teach your lesson naturally</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="shrink-0">4</Badge>
                  <span>Stop recording and save your video</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="shrink-0">5</Badge>
                  <span>AI will auto-generate transcripts and timestamps</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
