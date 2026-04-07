import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Explore } from "./components/Explore";
import { CreateLesson } from "./components/CreateLesson";
import { LessonDetail } from "./components/LessonDetail";
import { Community } from "./components/Community";
import { Projects } from "./components/Projects";
import { RecordLesson } from "./components/RecordLesson";
import { TeachDashboard } from "./components/TeachDashboard";
import { ThumbnailGenerator } from "./components/ThumbnailGenerator";
import { Funding } from "./components/Funding";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "explore", Component: Explore },
      { path: "teach", Component: TeachDashboard },
      { path: "create-lesson", Component: CreateLesson },
      { path: "record-lesson", Component: RecordLesson },
      { path: "lesson/:id", Component: LessonDetail },
      { path: "community", Component: Community },
      { path: "projects", Component: Projects },
      { path: "thumbnail-generator", Component: ThumbnailGenerator },
      { path: "funding", Component: Funding },
    ],
  },
]);