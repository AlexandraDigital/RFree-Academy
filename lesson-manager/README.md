# RFree Lesson Manager

A simple web app to manage lessons with video links and outlines. All lessons are auto-saved to GitHub.

## Features

✅ **Add/Edit/Delete Lessons** - Full CRUD for teachers  
✅ **Video Links** - Store YouTube, Vimeo, or any video URL  
✅ **Outlines & Descriptions** - Detailed lesson information  
✅ **Auto-Save to GitHub** - Every change syncs instantly  
✅ **Import/Export** - Backup and share lessons as JSON  
✅ **Click to Watch** - Students click lesson name → video opens

## Lesson Structure

Each lesson has:
- **Name** (e.g., "Introduction to Budgeting")
- **Video URL** (e.g., `https://youtube.com/watch?v=...`)
- **Outline** (Key topics and lesson description)

## How It Works

### Teachers
1. Click **"Add Lesson"** in the app
2. Fill in Name, Video URL, and Outline
3. Click **"Create Lesson"** → Auto-saves to GitHub ✓

### Students
1. See the lesson list with names
2. Click the **lesson name** → Video opens in new tab
3. Read the **outline** below for context

## Storage

All lessons are stored in `/lesson-manager/lessons.json` in your GitHub repo as:

```json
{
  "lessons": [
    {
      "id": "1712687230000",
      "name": "Introduction to Budgeting",
      "videoUrl": "https://youtube.com/watch?v=abc123",
      "outline": "Key topics covered: income, expenses, saving..."
    }
  ]
}
```

Each change auto-syncs to GitHub instantly.
