'use client';

import { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Code2,
  Presentation,
  Trash2,
  RotateCcw,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Target,
  Zap,
} from 'lucide-react';

interface SubmissionFile {
  id: string;
  name: string;
  type: 'essay' | 'ppt' | 'code';
  file: File;
  uploadedAt: Date;
}

interface FeedbackItem {
  category: string;
  score: number;
  maxScore: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

interface OverallFeedback {
  overallScore: number;
  summary: string;
  filesFeedback: FeedbackItem[];
  keyHighlights: string[];
  priorityAreas: string[];
  timeline: string;
}

const mockAnalyzeSubmission = async (
  files: SubmissionFile[]
): Promise<OverallFeedback> => {
  // Simulate API call with mock feedback
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const feedbackByType: { [key: string]: FeedbackItem } = {
    essay: {
      category: 'Essay',
      score: 78,
      maxScore: 100,
      strengths: [
        'Clear thesis statement and structure',
        'Good use of citations and references',
        'Strong argumentative flow',
      ],
      improvements: [
        'Expand on specific examples',
        'Reduce wordiness in introduction',
        'Add more contemporary references',
      ],
      suggestions: [
        'Use more transition phrases between paragraphs',
        'Include at least 2 more peer-reviewed sources',
        'Proofread for grammatical consistency',
      ],
    },
    ppt: {
      category: 'Presentation',
      score: 82,
      maxScore: 100,
      strengths: [
        'Visually appealing slide design',
        'Good balance of text and visuals',
        'Effective use of color schemes',
      ],
      improvements: [
        'Add more speaker notes',
        'Reduce text density on slides',
        'Include data visualization',
      ],
      suggestions: [
        'Use consistent font sizing across all slides',
        'Add animations for better engagement',
        'Include a summary slide at the end',
      ],
    },
    code: {
      category: 'Code Quality',
      score: 85,
      maxScore: 100,
      strengths: [
        'Well-structured code architecture',
        'Good variable naming conventions',
        'Proper error handling',
      ],
      improvements: [
        'Add more inline comments',
        'Reduce code duplication',
        'Implement unit tests',
      ],
      suggestions: [
        'Follow PEP 8 style guidelines more consistently',
        'Add docstrings to functions',
        'Consider refactoring large methods',
      ],
    },
  };

  const fileTypes = files.map((f) => f.type);
  const relevantFeedback = fileTypes.map((type) => feedbackByType[type]);

  const overallScore = Math.round(
    relevantFeedback.reduce((sum, f) => sum + f.score, 0) / relevantFeedback.length
  );

  return {
    overallScore,
    summary: `Your lab submission shows strong work overall. You've demonstrated good understanding of the concepts with well-organized materials. Focus on the priority areas below to elevate your work to excellence.`,
    filesFeedback: relevantFeedback,
    keyHighlights: [
      'Excellent file organization and naming',
      'Clear demonstration of core competencies',
      'Professional presentation quality',
      'Good code documentation practices',
    ],
    priorityAreas: [
      'Expand analysis depth in essay sections',
      'Add more interactive elements to presentation',
      'Increase test coverage in code',
    ],
    timeline: '2-3 hours recommended for improvements',
  };
};

export default function LabSubmissionPage() {
  const [submissions, setSubmissions] = useState<SubmissionFile[]>([]);
  const [feedback, setFeedback] = useState<OverallFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'feedback'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const fileType = getFileType(file.name);
      if (fileType) {
        const newSubmission: SubmissionFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: fileType,
          file,
          uploadedAt: new Date(),
        };
        setSubmissions((prev) => [...prev, newSubmission]);
      }
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getFileType = (filename: string): 'essay' | 'ppt' | 'code' | null => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['doc', 'docx', 'pdf', 'txt'].includes(ext || '')) return 'essay';
    if (['ppt', 'pptx', 'odp'].includes(ext || '')) return 'ppt';
    if (['py', 'js', 'java', 'cpp', 'c', 'cs', 'rb', 'go', 'ts', 'tsx'].includes(ext || ''))
      return 'code';
    return null;
  };

  const getFileIcon = (type: 'essay' | 'ppt' | 'code') => {
    const iconClass = 'w-5 h-5';
    switch (type) {
      case 'essay':
        return <FileText className={iconClass} />;
      case 'ppt':
        return <Presentation className={iconClass} />;
      case 'code':
        return <Code2 className={iconClass} />;
    }
  };

  const removeSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAnalyze = async () => {
    if (submissions.length === 0) return;

    setIsAnalyzing(true);
    setActiveTab('feedback');
    const result = await mockAnalyzeSubmission(submissions);
    setFeedback(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setSubmissions([]);
    setFeedback(null);
    setActiveTab('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-3">
            Lab Submission Hub
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Upload your essays, presentations, and code for comprehensive AI-powered analysis and feedback
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upload Materials
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            disabled={!feedback}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'feedback'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900 disabled:text-slate-300'
            }`}
          >
            Feedback & Analysis
          </button>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-8">
            {/* Upload Area */}
            <div className="bg-white/70 backdrop-blur rounded-2xl border-2 border-dashed border-blue-300 p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".doc,.docx,.pdf,.txt,.ppt,.pptx,.odp,.py,.js,.java,.cpp,.c,.cs,.rb,.go,.ts,.tsx"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-4 w-full"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Drop files or click to upload
                  </h3>
                  <p className="text-slate-600">
                    Support: Essays (DOC, DOCX, PDF), Presentations (PPT, PPTX), Code (PY, JS, JAVA, etc.)
                  </p>
                </div>
              </button>
            </div>

            {/* File List */}
            {submissions.length > 0 && (
              <div className="bg-white/70 backdrop-blur rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                  <h3 className="text-lg font-bold text-slate-900">
                    Uploaded Files ({submissions.length})
                  </h3>
                </div>
                <div className="divide-y divide-slate-200">
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          {getFileIcon(submission.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{submission.name}</p>
                          <p className="text-sm text-slate-500">
                            {submission.type.charAt(0).toUpperCase() + submission.type.slice(1)} •{' '}
                            {submission.uploadedAt.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeSubmission(submission.id)}
                        className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-6">
              <button
                onClick={handleAnalyze}
                disabled={submissions.length === 0 || isAnalyzing}
                className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all ${
                  submissions.length === 0 || isAnalyzing
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-200 hover:scale-105'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze Submissions'}
              </button>
              {submissions.length > 0 && (
                <button
                  onClick={() => setSubmissions([])}
                  className="px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && feedback && (
          <div className="space-y-8">
            {/* Overall Score Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-blue-100 font-semibold mb-2">OVERALL SCORE</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl font-black">{feedback.overallScore}</span>
                    <span className="text-2xl text-blue-100">/100</span>
                  </div>
                </div>
                <div className="text-6xl">
                  {feedback.overallScore >= 90 ? '⭐' : feedback.overallScore >= 80 ? '✨' : '🎯'}
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">{feedback.summary}</p>
            </div>

            {/* Key Highlights */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Highlights */}
              <div className="bg-white/70 backdrop-blur rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Key Highlights</h3>
                </div>
                <ul className="space-y-3">
                  {feedback.keyHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Priority Areas */}
              <div className="bg-white/70 backdrop-blur rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Priority Areas</h3>
                </div>
                <ul className="space-y-3">
                  {feedback.priorityAreas.map((area, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700">
                      <span className="text-orange-600 font-bold mt-1">→</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detailed Feedback by File Type */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Detailed Feedback
              </h2>

              {feedback.filesFeedback.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 backdrop-blur rounded-2xl border border-slate-200 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900">{item.category}</h3>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-black text-blue-600">{item.score}</p>
                          <p className="text-sm text-slate-600">out of {item.maxScore}</p>
                        </div>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#e2e8f0"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#2563eb"
                              strokeWidth="8"
                              strokeDasharray={`${(item.score / item.maxScore) * 282.6} 282.6`}
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-8">
                    {/* Strengths */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-lg">💪</span> Strengths
                      </h4>
                      <ul className="space-y-2">
                        {item.strengths.map((strength, sidx) => (
                          <li key={sidx} className="flex gap-3 text-slate-700 bg-green-50/50 p-3 rounded-lg">
                            <span className="text-green-600 font-bold">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Areas for Improvement */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-lg">📈</span> Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {item.improvements.map((improvement, iidx) => (
                          <li key={iidx} className="flex gap-3 text-slate-700 bg-amber-50/50 p-3 rounded-lg">
                            <span className="text-amber-600 font-bold">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-lg">💡</span> Actionable Suggestions
                      </h4>
                      <ul className="space-y-2">
                        {item.suggestions.map((suggestion, sugidx) => (
                          <li
                            key={sugidx}
                            className="flex gap-3 text-slate-700 bg-blue-50/50 p-3 rounded-lg border-l-2 border-blue-300"
                          >
                            <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="bg-white/70 backdrop-blur rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Estimated Revision Time</h3>
              </div>
              <p className="text-slate-700 text-lg">{feedback.timeline}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-6">
              <button
                onClick={handleReset}
                className="px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-200 hover:scale-105 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Submit New Files
              </button>
              <button
                onClick={() => window.print()}
                className="px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all"
              >
                <FileText className="w-5 h-5" />
                Print Report
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-12 text-center shadow-2xl">
              <div className="mb-6 flex justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-spin" style={{ animation: 'spin 3s linear infinite' }}></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Your Submission</h3>
              <p className="text-slate-600">Using AI to generate comprehensive feedback...</p>
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
      `}</style>
    </div>
  );
}