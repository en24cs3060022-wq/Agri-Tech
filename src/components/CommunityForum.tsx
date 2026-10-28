import React, { useState } from 'react';
import { ForumPost, User } from '../types';
import { TranslationStrings } from '../translations';
import { MessageSquare, CheckCircle2, ThumbsUp, Send, UserCheck, ShieldCheck, Plus, Sparkles, Filter } from 'lucide-react';

interface Props {
  posts: ForumPost[];
  currentUser: User;
  onAddQuestion: (title: string, content: string, category: ForumPost['category']) => Promise<void>;
  onAddAnswer: (postId: string, content: string) => Promise<void>;
  t: TranslationStrings;
}

const CATEGORIES: ForumPost['category'][] = [
  'Crop Diseases',
  'Soil Management',
  'Irrigation',
  'Govt Schemes',
  'Market Prices'
];

export const CommunityForum: React.FC<Props> = ({
  posts,
  currentUser,
  onAddQuestion,
  onAddAnswer,
  t
}) => {
  const [isAsking, setIsAsking] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('Crop Diseases');
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredPosts = posts.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    setIsSubmitting(true);
    try {
      await onAddQuestion(newTitle, newContent, newCategory);
      setNewTitle('');
      setNewContent('');
      setIsAsking(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostAnswer = async (postId: string) => {
    const text = replyTextMap[postId];
    if (!text) return;
    try {
      await onAddAnswer(postId, text);
      setReplyTextMap({ ...replyTextMap, [postId]: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-700" />
            <span>Expert Consultation & Farmer Community Forum</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Connect with certified agronomists and peer farmers for pest queries, soil advice, and crop marketing.
          </p>
        </div>

        <button
          onClick={() => setIsAsking(!isAsking)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isAsking ? 'Close Form' : 'Ask an Agronomist'}</span>
        </button>
      </div>

      {/* Ask Question Form */}
      {isAsking && (
        <form
          onSubmit={handleCreateQuestion}
          className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-md space-y-4 animate-in fade-in duration-150"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-stone-900 text-sm">Post a Query to University Agronomists</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-2xs font-bold uppercase text-stone-600 mb-1">
                Question Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Recommended fungicide dose for wheat brown rust in humid morning conditions?"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase text-stone-600 mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-2xs font-bold uppercase text-stone-600 mb-1">
              Detailed Description & Observation *
            </label>
            <textarea
              rows={3}
              required
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Mention your region, crop stage, soil type, and exact symptoms seen on plants..."
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAsking(false)}
              className="px-4 py-1.5 border border-stone-300 rounded-lg text-stone-600 text-xs font-semibold hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Question'}
            </button>
          </div>
        </form>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2.5 rounded-xl border border-stone-200">
        <span className="text-xs font-semibold text-stone-500 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter by Topic:
        </span>
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Discussions Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-stone-900">{post.authorName}</h3>
                    <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                      {post.authorRole}
                    </span>
                  </div>
                  <span className="text-2xs text-stone-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <span className="text-2xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <div>
              <h2 className="text-base font-bold text-stone-900 leading-snug">{post.title}</h2>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{post.content}</p>
            </div>

            {/* Answers Thread */}
            <div className="pt-3 border-t border-stone-100 space-y-3">
              <div className="text-2xs font-bold uppercase tracking-wider text-stone-500">
                Agronomist & Community Answers ({post.answers.length}):
              </div>

              {post.answers.map((ans) => (
                <div
                  key={ans.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    ans.isVerifiedExpert
                      ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-200'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-stone-900">
                      <span>{ans.authorName}</span>
                      {ans.isVerifiedExpert && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-700 text-white text-2xs font-bold">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified Agronomist</span>
                        </span>
                      )}
                    </div>
                    <span className="text-2xs text-stone-400">
                      {new Date(ans.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed pl-1">{ans.content}</p>
                </div>
              ))}

              {/* Reply Box */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={replyTextMap[post.id] || ''}
                  onChange={(e) =>
                    setReplyTextMap({ ...replyTextMap, [post.id]: e.target.value })
                  }
                  placeholder={
                    currentUser.role === 'expert'
                      ? 'Provide your expert agronomic recommendation...'
                      : 'Share your field experience or reply...'
                  }
                  className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostAnswer(post.id);
                  }}
                />
                <button
                  type="button"
                  onClick={() => handlePostAnswer(post.id)}
                  className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
