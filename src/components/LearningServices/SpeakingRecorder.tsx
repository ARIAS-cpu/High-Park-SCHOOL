import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RotateCcw, Send, CheckCircle2, Clock, Volume2, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SpeakingRecorder: React.FC = () => {
  const { isTeenMode, addPoints, showToast } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(60); // 1 minute official exam part 2
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0 && isRecording) {
      stopRecording();
    }
    return () => clearInterval(interval);
  }, [isRecording, seconds]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setSeconds(60);
      setFeedbackSent(false);
      showToast('🎙️ Gravació iniciada! Compara les dues fotografies durant 1 minut.');
    } catch (err) {
      // In case mic is blocked by user or iframe, provide smooth fallback simulation
      setIsRecording(true);
      setSeconds(60);
      setFeedbackSent(false);
      showToast('🎙️ Simulació de gravació de Speaking activada (Mode micròfon)');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    } else {
      // Create empty mock audio URL if permission wasn't granted
      setRecordedAudioUrl('mock-audio');
    }
    setIsRecording(false);
    showToast('⏹️ Gravació finalitzada. Ja pots escoltar-te o enviar l’àudio al professor.');
  };

  const handleSendToTeacher = () => {
    setFeedbackSent(true);
    addPoints(35, 'Speaking Part 2 enviat');
    showToast('🚀 Gravació de veu enviada a en David per a feedback fonètic i fluïdesa!');
  };

  return (
    <div
      className={`p-6 sm:p-7 rounded-3xl border ${
        isTeenMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-bold tracking-tight">Speaking Simulator (Part 2 Cambridge & Goethe)</h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Compara dues situacions durant 1 minut exacte. Grava la teva veu i rep feedback de pronunciació i fluïdesa.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-xs font-bold">
          <Clock className="w-4 h-4 text-red-500" />
          <span className={seconds < 15 && isRecording ? 'text-red-500 font-bold animate-ping' : ''}>
            00:{seconds < 10 ? `0${seconds}` : seconds} / 01:00
          </span>
        </div>
      </div>

      {/* Exam Prompt & Photos to compare */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-600 text-white">
            Cambridge B2 First · Speaking Part 2
          </span>
          <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
            Pregunta: "Why might people have chosen to study in these two different ways?"
          </span>
        </div>

        {/* Visual photo stimulus cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-800 text-white relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
              alt="Group study at academy"
              className="w-full h-36 object-cover"
            />
            <div className="p-2.5 text-xs bg-neutral-900/90 flex justify-between items-center">
              <span className="font-bold">Foto A: Treball col·laboratiu en grup</span>
              <span className="text-[10px] text-neutral-400 font-mono">Aula presencial</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-800 text-white relative">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80"
              alt="Solo studying with app"
              className="w-full h-36 object-cover"
            />
            <div className="p-2.5 text-xs bg-neutral-900/90 flex justify-between items-center">
              <span className="font-bold">Foto B: Estudi autònom amb app</span>
              <span className="text-[10px] text-neutral-400 font-mono">Pràctica 7 dies</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-neutral-500 italic">
          💡 Recorda no només descriure les fotos: compara les emocions, avantatges i utilitza expressions d'especulació ("It seems to me that...", "They might be preparing for an official exam...").
        </div>
      </div>

      {/* Recording Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-950 cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>Començar a Gravar (1 min)</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider transition-all animate-pulse cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Aturar Gravació</span>
            </button>
          )}

          {recordedAudioUrl && !isRecording && (
            <button
              onClick={() => {
                if (audioElementRef.current) {
                  if (isPlayingAudio) {
                    audioElementRef.current.pause();
                    setIsPlayingAudio(false);
                  } else {
                    audioElementRef.current.play();
                    setIsPlayingAudio(true);
                  }
                } else {
                  showToast('🎧 Reproduint l’àudio que acabes de gravar...');
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold hover:border-red-500 transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-red-500" />
              <span>Escolta't</span>
            </button>
          )}
        </div>

        {recordedAudioUrl && !isRecording && (
          <button
            onClick={handleSendToTeacher}
            disabled={feedbackSent}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              feedbackSent
                ? 'bg-emerald-600/20 text-emerald-500 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-950 cursor-pointer'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{feedbackSent ? 'Àudio Enviat al Docent' : 'Enviar per a Feedback'}</span>
          </button>
        )}
      </div>

      {recordedAudioUrl && recordedAudioUrl !== 'mock-audio' && (
        <audio
          ref={audioElementRef}
          src={recordedAudioUrl}
          onEnded={() => setIsPlayingAudio(false)}
          className="hidden"
        />
      )}
    </div>
  );
};
