'use client';

import { useState, useRef, useEffect } from 'react';

import {
    
  Sparkles,
  Calendar,
  BookOpen,
  Clock,
  CheckCircle2,
  Plus,
  Trash2,
  RotateCcw,
  ArrowRight,
  Zap,
  Target,
  Brain,
  Lightbulb,
} from 'lucide-react';

interface Task {
  id: string;
  activity: string;
  subject: string;
}

interface ScheduleBlock {
  day: string;
  time: string;
  subject: string;
  activity: string;
  duration: string;
  type: 'learn' | 'practice' | 'review' | 'project';
}

interface WeeklySchedule {
  schedule: ScheduleBlock[];
  tips: string[];
  goals: string[];
}

const SUBJECTS = [
  { value: 'economics', label: '📊 Economics', color: 'from-blue-400 to-cyan-400' },
  { value: 'history', label: '📚 History', color: 'from-amber-400 to-orange-400' },
  { value: 'coding', label: '💻 Coding', color: 'from-purple-400 to-pink-400' },
  { value: 'math', label: '🔢 Math', color: 'from-green-400 to-emerald-400' },
  { value: 'language', label: '🌐 Language', color: 'from-red-400 to-rose-400' },
  { value: 'science', label: '🧪 Science', color: 'from-indigo-400 to-blue-400' },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const generateSchedule = async (
  subjects: string[],
  goals: string[],
  activities: string[]
): Promise<WeeklySchedule> => {
  // Simulate AI processing
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const timeSlots = [
    { time: '6:00 AM', duration: '1 hour' },
    { time: '9:00 AM', duration: '1.5 hours' },
    { time: '12:00 PM', duration: '1 hour' },
    { time: '2:00 PM', duration: '1.5 hours' },
    { time: '4:00 PM', duration: '1 hour' },
    { time: '6:00 PM', duration: '1.5 hours' },
  ];

  const activityTypes: Array<'learn' | 'practice' | 'review' | 'project'> = [
    'learn',
    'practice',
    'review',
    'project',
  ];

  const schedule: ScheduleBlock[] = [];

  DAYS.forEach((day, dayIdx) => {
    const daySubjects = subjects.slice(dayIdx % subjects.length, (dayIdx + 2) % subjects.length + 1);

    daySubjects.forEach((subject, idx) => {
      const slot = timeSlots[(dayIdx + idx) % timeSlots.length];
      const type = activityTypes[(dayIdx + idx) % activityTypes.length];

      schedule.push({
        day,
        time: slot.time,
        subject,
        activity: `${capitalize(type)} ${capitalize(subject)}`,
        duration: slot.duration,
        type,
      });
    });
  });

  return {
    schedule: schedule.slice(0, 35), // 5 activities per day
    tips: [
      '🎯 Start with the most challenging subjects during peak hours (9-11 AM)',
      '⏰ Take a 15-minute break after every 45 minutes of study',
      '📝 Review previous concepts for 10 minutes before learning new material',
      '💪 Practice problems immediately after theory sessions',
      '🎉 Dedicate weekends for revision and project work',
      '🧠 Use the Pomodoro technique for better focus',
      '✨ Set daily micro-goals and celebrate small wins',
    ],
    goals: [
      `Master core concepts in ${subjects.join(', ')}`,
      'Build consistent study habits',
      'Improve problem-solving skills through daily practice',
      'Complete all planned projects by end of week',
      'Review and consolidate learning on weekends',
    ],
  };
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const getSubjectColor = (subject: string) => {
  const subj = SUBJECTS.find((s) => s.value === subject);
  return subj?.color || 'from-gray-400 to-slate-400';
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'learn':
      return 'bg-blue-100/60 border-blue-300 text-blue-900';
    case 'practice':
      return 'bg-purple-100/60 border-purple-300 text-purple-900';
    case 'review':
      return 'bg-green-100/60 border-green-300 text-green-900';
    case 'project':
      return 'bg-orange-100/60 border-orange-300 text-orange-900';
    default:
      return 'bg-slate-100/60 border-slate-300 text-slate-900';
  }
};

export default function WeeklyPlannerPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['coding', 'math']);
  const [learningGoals, setLearningGoals] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskActivity, setNewTaskActivity] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('coding');
  const [schedule, setSchedule] = useState<WeeklySchedule | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState<'setup' | 'schedule'>('setup');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddTask = () => {
    if (!newTaskActivity.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      activity: newTaskActivity,
      subject: newTaskSubject,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskActivity('');
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleGenerateSchedule = async () => {
    if (selectedSubjects.length === 0) return;

    setIsGenerating(true);
    setActiveView('schedule');

    const goals = learningGoals
      .split('\n')
      .filter((g) => g.trim())
      .slice(0, 3);
    const activities = tasks.map((t) => t.activity);

    const result = await generateSchedule(selectedSubjects, goals, activities);
    setSchedule(result);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setSelectedSubjects(['coding', 'math']);
    setLearningGoals('');
    setTasks([]);
    setSchedule(null);
    setActiveView('setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900">AI Study Planner</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl">
            Create a personalized weekly study schedule powered by intelligent planning
          </p>
        </div>

        {/* Setup View */}
        {activeView === 'setup' && (
          <div className="space-y-8">
            {/* Subject Selection */}
            <div className="bg-white/70 backdrop-blur rounded-2xl border border-emerald-200/50 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Select Your Subjects</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SUBJECTS.map((subject) => (
                  <button
                    key={subject.value}
                    onClick={() => toggleSubject(subject.value)}
                    className={`p-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                      selectedSubjects.includes(subject.value)
                        ? `bg-gradient-to-br ${subject.color} text-white shadow-lg`
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {subject.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-cyan-50/60 rounded-lg border border-cyan-200/50">
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-900">{selectedSubjects.length} subject(s) selected</span> •
                  Schedule will be optimized for {selectedSubjects.length === 1 ? 'deep focus' : 'balanced learning'}
                </p>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white/70 backdrop-blur rounded-2xl border border-emerald-200/50 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">What Do You Want to Learn?</h2>
              </div>

              <textarea
                value={learningGoals}
                onChange={(e) => setLearningGoals(e.target.value)}
                placeholder="Enter your learning goals (one per line)&#10;e.g., Understand advanced algorithms&#10;Master data structures&#10;Build a complete project"
                className="w-full h-32 p-4 rounded-xl border-2 border-emerald-300 bg-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 resize-none"
              />

              <div className="mt-4 p-4 bg-emerald-50/60 rounded-lg border border-emerald-200/50">
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  AI will optimize your schedule based on these goals
                </p>
              </div>
            </div>

            {/* Tasks & Activities */}
            <div className="bg-white/70 backdrop-blur rounded-2xl border border-emerald-200/50 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">What Do You Need to Do?</h2>
              </div>

              {/* Add Task Form */}
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={newTaskActivity}
                  onChange={(e) => setNewTaskActivity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  placeholder="e.g., Complete assignment, Practice problems..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-emerald-300 bg-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                />
                <select
                  value={newTaskSubject}
                  onChange={(e) => setNewTaskSubject(e.target.value)}
                  className="px-4 py-3 rounded-xl border-2 border-emerald-300 bg-white focus:outline-none focus:border-cyan-400"
                >
                  {SUBJECTS.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddTask}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Task List */}
              {tasks.length > 0 && (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
                        <span className="text-slate-900 font-medium">{task.activity}</span>
                        <span className="text-xs font-bold px-3 py-1 bg-slate-200 rounded-full text-slate-700">
                          {SUBJECTS.find((s) => s.value === task.subject)?.label}
                        </span>
                      </div>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="flex gap-4 justify-center pt-8">
              <button
                onClick={handleGenerateSchedule}
                disabled={selectedSubjects.length === 0 || isGenerating}
                className={`px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 ${
                  selectedSubjects.length === 0 || isGenerating
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-cyan-300'
                }`}
              >
                <Brain className="w-6 h-6" />
                {isGenerating ? 'AI is Planning...' : 'Generate AI Schedule'}
              </button>
            </div>
          </div>
        )}

        {/* Schedule View */}
        {activeView === 'schedule' && schedule && (
          <div className="space-y-8">
            {/* Weekly Schedule Grid */}
            <div className="bg-white/70 backdrop-blur rounded-2xl border border-emerald-200/50 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-cyan-100 to-emerald-100 p-6 border-b border-emerald-200">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Your AI-Generated Weekly Schedule</h2>
                </div>
              </div>

              <div className="p-6 overflow-x-auto">
                <div className="min-w-full">
                  {DAYS.map((day) => {
                    const daySchedule = schedule.schedule.filter((s) => s.day === day);
                    return (
                      <div key={day} className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <span className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></span>
                          {day}
                        </h3>
                        <div className="space-y-3 ml-5">
                          {daySchedule.map((block, idx) => (
                            <div
                              key={idx}
                              className={`p-4 rounded-lg border-2 ${getActivityColor(
                                block.type
                              )} transition-all hover:shadow-md`}
                              style={{
                                animationDelay: `${idx * 0.1}s`,
                              }}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-bold text-sm">{block.time}</span>
                                    <span className="text-xs font-semibold px-2 py-1 bg-white/60 rounded">
                                      {block.duration}
                                    </span>
                                  </div>
                                  <h4 className="font-bold text-base mb-1">{block.activity}</h4>
                                  <p className="text-xs opacity-75">
                                    Subject: {capitalize(block.subject)}
                                  </p>
                                </div>
                                <div className="text-2xl ml-4">
                                  {block.type === 'learn' && '📚'}
                                  {block.type === 'practice' && '💪'}
                                  {block.type === 'review' && '🔄'}
                                  {block.type === 'project' && '🚀'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tips & Goals Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Study Tips */}
              <div className="bg-white/70 backdrop-blur rounded-2xl border border-emerald-200/50 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">AI Study Tips</h3>
                </div>
                <ul className="space-y-3">
                  {schedule.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700 p-3 bg-cyan-50/60 rounded-lg">
                      <span className="flex-shrink-0 mt-0.5">✨</span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weekly Goals */}
              <div className="bg-white/70 backdrop-blur rounded-2xl border border-emerald-200/50 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Weekly Goals</h3>
                </div>
                <ul className="space-y-3">
                  {schedule.goals.map((goal, idx) => (
                    <li key={idx} className="flex gap-3 items-start p-3 bg-emerald-50/60 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-8">
              <button
                onClick={handleReset}
                className="px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-cyan-300 transition-all transform hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                Create New Plan
              </button>
              <button
                onClick={() => window.print()}
                className="px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 bg-slate-200 text-slate-900 hover:bg-slate-300 transition-all"
              >
                <Calendar className="w-5 h-5" />
                Print Schedule
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-12 text-center shadow-2xl">
              <div className="mb-6 flex justify-center">
                <div className="relative w-20 h-20">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                    style={{
                      animation: 'spin 3s linear infinite',
                    }}
                  ></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <Brain className="w-10 h-10 text-emerald-600" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">AI is Planning Your Week</h3>
              <p className="text-slate-600 mb-4">Optimizing schedule based on your subjects and goals...</p>
              <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden mx-auto">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                  style={{
                    animation: 'slideRight 2s ease-in-out infinite',
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slideRight {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}