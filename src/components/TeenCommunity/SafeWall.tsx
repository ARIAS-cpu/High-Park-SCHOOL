import React, { useState } from 'react';
import { ShieldCheck, Heart, Flame, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { SAFE_WALL_POSTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const SafeWall: React.FC = () => {
  const { addPoints, showToast } = useApp();
  const [posts, setPosts] = useState(SAFE_WALL_POSTS);
  const [userReactions, setUserReactions] = useState<Record<string, string>>({});
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleReaction = (postId: string, type: 'like' | 'fire' | 'mindblown') => {
    const key = `${postId}-${type}`;
    if (userReactions[key]) return;

    setUserReactions((prev) => ({ ...prev, [key]: 'active' }));
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          if (type === 'like') return { ...p, likes: p.likes + 1 };
          if (type === 'fire') return { ...p, fire: p.fire + 1 };
          if (type === 'mindblown') return { ...p, mindblown: p.mindblown + 1 };
        }
        return p;
      })
    );
    addPoints(5, 'Reacció afegida al mur');
    showToast('✨ Reacció afegida a la publicació');
  };

  const handleVotePoll = (index: number) => {
    if (selectedPollOption !== null) return;
    setSelectedPollOption(index);
    setPosts((prev) =>
      prev.map((p) => {
        if (p.poll) {
          const newOpts = [...p.poll.options];
          newOpts[index] = { ...newOpts[index], votes: newOpts[index].votes + 1 };
          return { ...p, poll: { ...p.poll, options: newOpts } };
        }
        return p;
      })
    );
    addPoints(15, 'Enquesta contestada');
    showToast('🗳️ El teu vot ha estat comptabilitzat!');
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    showToast('📨 Comentari enviat al professor per a moderació prèvia abans de publicar-se.');
    setNewComment('');
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold tracking-tight">
              Mur Comunitari Segur & Moderat
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Espai supervisat pel professorat: reaccions a anuncis, enquestes ràpides i comentaris moderats sense xat obert directe.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Entorn 100% Protegit
        </span>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4"
          >
            {/* Author info */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{post.avatar}</span>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>{post.author}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                      {post.role}
                    </span>
                  </h4>
                  <span className="text-[10px] text-neutral-500">{post.date}</span>
                </div>
              </div>
            </div>

            {/* Content text */}
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
              {post.content}
            </p>

            {/* Poll if available */}
            {post.poll && (
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 block">
                  📊 Enquesta: {post.poll.question}
                </span>

                <div className="space-y-2">
                  {post.poll.options.map((opt, optIdx) => {
                    const totalVotes = post.poll!.options.reduce((acc, curr) => acc + curr.votes, 0);
                    const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                    const isSelected = selectedPollOption === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleVotePoll(optIdx)}
                        disabled={selectedPollOption !== null}
                        className={`w-full p-2.5 rounded-lg text-xs font-semibold text-left relative overflow-hidden transition-all border cursor-pointer ${
                          isSelected
                            ? 'border-red-500 text-white font-bold'
                            : 'border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div
                          className="absolute inset-0 bg-[#E10E17]/20 transition-all pointer-events-none"
                          style={{ width: `${pct}%` }}
                        />
                        <div className="relative z-10 flex items-center justify-between px-1">
                          <span>{opt.label}</span>
                          <span className="font-mono text-[11px] text-neutral-400">{pct}% ({opt.votes} vots)</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reaction buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80">
              <button
                onClick={() => handleReaction(post.id, 'like')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  userReactions[`${post.id}-like`]
                    ? 'bg-red-600/30 text-red-400 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{post.likes}</span>
              </button>

              <button
                onClick={() => handleReaction(post.id, 'fire')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  userReactions[`${post.id}-fire`]
                    ? 'bg-amber-600/30 text-amber-400 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{post.fire}</span>
              </button>

              <button
                onClick={() => handleReaction(post.id, 'mindblown')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  userReactions[`${post.id}-mindblown`]
                    ? 'bg-purple-600/30 text-purple-400 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{post.mindblown}</span>
              </button>
            </div>
          </div>
        ))}

        {/* Send Moderated Comment */}
        <form
          onSubmit={handleSubmitComment}
          className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Escriu un comentari o dubte per al professor (revisió prèvia)..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#E10E17] hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Enviar</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
