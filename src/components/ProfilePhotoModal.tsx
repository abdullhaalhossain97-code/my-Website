import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  Sparkles, 
  Camera, 
  Check, 
  RotateCcw, 
  User, 
  ShieldCheck, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  VideoOff
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar?: string;
  onSaveAvatar: (newAvatarUrl: string, avatarBase64?: string) => Promise<void>;
  lang: Language;
}

const PRESET_AVATARS = [
  {
    id: 'official-studio',
    labelEn: 'Official Portrait (Data Center)',
    labelBn: 'অফিসিয়াল পোর্ট্রেট (ডাটা সেন্টার)',
    url: '/assets/hossen_ali_profile.jpg',
    tag: 'Recommended'
  },
  {
    id: 'executive-cloud',
    labelEn: 'Executive Cloud Architect',
    labelBn: 'ক্লাউড আর্কিটেক্ট (স্টুডিও লাইট)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    tag: 'Executive'
  },
  {
    id: 'modern-coder',
    labelEn: 'Full-Stack Lead Engineer',
    labelBn: 'সিনিয়র লিড ডেভেলপার',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    tag: 'Engineering'
  },
  {
    id: 'cyber-tech',
    labelEn: 'Cybersecurity Specialist',
    labelBn: 'সাইবার সিকিউরিটি স্পেশালিস্ট',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    tag: 'Security'
  },
  {
    id: 'minimal-dev',
    labelEn: 'Modern Tech Leader',
    labelBn: 'মডার্ন টেক লিডার',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    tag: 'Modern'
  },
  {
    id: 'github-avatar',
    labelEn: 'GitHub Avatar Profile',
    labelBn: 'গিটহাব অটো অবতার',
    url: 'https://github.com/mhossenali740.png',
    tag: 'GitHub Sync'
  }
];

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  onSaveAvatar,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const photoT = t.profilePhoto;

  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets' | 'camera'>('upload');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatar || '/assets/hossen_ali_profile.jpg');
  const [avatarBase64, setAvatarBase64] = useState<string | undefined>(undefined);
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Camera state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Sync current avatar if prop changes
  useEffect(() => {
    if (currentAvatar) {
      setSelectedAvatar(currentAvatar);
    }
  }, [currentAvatar]);

  // Clean up camera on unmount or tab switch
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  const startCamera = async () => {
    setCameraError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError(lang === 'bn' ? 'আপনার ব্রাউজারে ক্যামেরা সমর্থিত নয়।' : 'Camera is not supported on this device/browser.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: 'user' },
        audio: false
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.warn('Camera access denied or failed:', err);
      setCameraError(lang === 'bn' ? 'ক্যামেরা চালু করা যায়নি। অনুগ্রহ করে ব্রাউজার পারমিশন চেক করুন।' : 'Unable to access camera. Please allow camera permissions.');
    }
  };

  const handleTabChange = (tab: 'upload' | 'url' | 'presets' | 'camera') => {
    setActiveTab(tab);
    setErrorMessage('');
    if (tab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  };

  // Process file upload with client-side canvas compression for snappy storage
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে শুধুমাত্র একটি ইমেজ ফাইল (JPG, PNG, WebP) সিলেক্ট করুন।' : 'Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Compress to max 800x800 for high quality & lightning-fast caching
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setSelectedAvatar(compressedDataUrl);
          setAvatarBase64(compressedDataUrl);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    const cleanUrl = urlInput.trim();
    setSelectedAvatar(cleanUrl);
    setAvatarBase64(undefined);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Mirror if front camera
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedAvatar(dataUrl);
      setAvatarBase64(dataUrl);
      stopCamera();
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage('');
    try {
      await onSaveAvatar(selectedAvatar, avatarBase64);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        stopCamera();
        onClose();
      }, 900);
    } catch (err: any) {
      setErrorMessage(lang === 'bn' ? 'ছবি সেভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Failed to save photo. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefault = () => {
    const defaultUrl = '/assets/hossen_ali_profile.jpg';
    setSelectedAvatar(defaultUrl);
    setAvatarBase64(undefined);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/20">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{photoT.modalTitle}</span>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Md. Hossen Ali
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {photoT.modalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success toast banner */}
        {saveSuccess && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{photoT.savedSuccess}</span>
          </div>
        )}

        {/* Error banner */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Body: Split into Interactive Controls (Left/Top) & Live Preview (Right/Bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 overflow-y-auto pr-1">
          
          {/* Method Tabs & Inputs (Col 7) */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Tab navigation */}
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleTabChange('upload')}
                className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl transition ${
                  activeTab === 'upload' 
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{photoT.uploadTab}</span>
                <span className="sm:hidden">{lang === 'bn' ? 'ফাইল' : 'File'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('url')}
                className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl transition ${
                  activeTab === 'url' 
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{photoT.urlTab}</span>
                <span className="sm:hidden">{lang === 'bn' ? 'লিংক' : 'URL'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('presets')}
                className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl transition ${
                  activeTab === 'presets' 
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{photoT.presetsTab}</span>
                <span className="sm:hidden">{lang === 'bn' ? 'অবতার' : 'Presets'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('camera')}
                className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl transition ${
                  activeTab === 'camera' 
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Camera className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{photoT.cameraTab}</span>
                <span className="sm:hidden">{lang === 'bn' ? 'ক্যামেরা' : 'Cam'}</span>
              </button>
            </div>

            {/* TAB 1: FILE UPLOAD */}
            {activeTab === 'upload' && (
              <div
                onDragOver={e => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition flex flex-col items-center justify-center gap-3 cursor-pointer ${
                  isDragging
                    ? 'border-sky-400 bg-sky-950/30 scale-[1.01]'
                    : 'border-slate-700/80 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-900/50'
                }`}
              >
                <input
                  type="file"
                  id="profile-file-input"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <label htmlFor="profile-file-input" className="cursor-pointer w-full flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/30 shadow-inner">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {photoT.dragDropText}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {photoT.dragDropHint}
                    </p>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-sky-300 border border-slate-700 transition">
                    <ImageIcon className="h-3.5 w-3.5" />
                    <span>{photoT.browseFiles}</span>
                  </span>
                </label>
              </div>
            )}

            {/* TAB 2: IMAGE URL */}
            {activeTab === 'url' && (
              <form onSubmit={handleUrlSubmit} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <label className="block text-xs font-semibold text-slate-300">
                  {photoT.urlLabel}
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    placeholder={photoT.urlPlaceholder}
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-sky-600 hover:bg-sky-500 px-4 py-2.5 text-xs font-bold text-white transition shadow"
                  >
                    {lang === 'bn' ? 'প্রিভিউ' : 'Load'}
                  </button>
                </div>
                <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">
                    {lang === 'bn' ? 'দ্রুত লিংক শর্টকাট:' : 'Quick Shortcuts:'}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const url = 'https://github.com/mhossenali740.png';
                        setUrlInput(url);
                        setSelectedAvatar(url);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-[11px] border border-slate-700"
                    >
                      GitHub Avatar (mhossenali740)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const url = '/assets/hossen_ali_profile.jpg';
                        setUrlInput(url);
                        setSelectedAvatar(url);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[11px] border border-slate-700"
                    >
                      {lang === 'bn' ? 'অফিসিয়াল স্টুডিও ফটো' : 'Official Studio Photo'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 3: CURATED PRESETS */}
            {activeTab === 'presets' && (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                <p className="text-xs text-slate-400">
                  {lang === 'bn' ? 'পছন্দমতো যেকোনো প্রফেশনাল অবতার এক ক্লিকে নির্বাচন করুন:' : 'Select any verified developer portrait with 1-click:'}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {PRESET_AVATARS.map(avatar => {
                    const isSelected = selectedAvatar === avatar.url;
                    return (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(avatar.url);
                          setAvatarBase64(undefined);
                        }}
                        className={`flex items-center gap-2.5 p-2 rounded-2xl border text-left transition ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-950/30 ring-2 ring-emerald-500/20'
                            : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="relative shrink-0">
                          <img
                            src={avatar.url}
                            alt={avatar.labelEn}
                            className="h-11 w-11 rounded-xl object-cover border border-slate-700"
                          />
                          {isSelected && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-slate-950">
                              <Check className="h-3 w-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">
                            {lang === 'bn' ? avatar.labelBn : avatar.labelEn}
                          </p>
                          <span className="text-[10px] text-sky-400 font-medium">
                            {avatar.tag}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: LIVE WEBCAM */}
            {activeTab === 'camera' && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3 text-center">
                {cameraError ? (
                  <div className="py-6 flex flex-col items-center gap-2 text-slate-400">
                    <VideoOff className="h-8 w-8 text-red-400" />
                    <p className="text-xs text-red-300 font-medium">{cameraError}</p>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="mt-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white"
                    >
                      {lang === 'bn' ? 'আবার চেষ্টা করুন' : 'Retry Camera'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative mx-auto w-56 h-56 rounded-2xl overflow-hidden border-2 border-sky-500/50 bg-black shadow-lg">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover -scale-x-100"
                      />
                      <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-full m-3" />
                    </div>

                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={capturePhoto}
                        disabled={!isCameraActive}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white transition shadow-lg shadow-emerald-600/30 disabled:opacity-50"
                      >
                        <Camera className="h-4 w-4" />
                        <span>{photoT.takeSnapshot}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reset to Default Button */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleResetDefault}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{photoT.resetDefault}</span>
              </button>
            </div>

          </div>

          {/* Live Preview Column (Col 5) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-800 bg-slate-950/70 text-center relative overflow-hidden">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              {photoT.preview}
            </span>

            {/* Avatar Frame with Glowing Ring */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 opacity-75 blur-md group-hover:opacity-100 transition duration-500" />
              
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-900 shadow-2xl">
                {selectedAvatar ? (
                  <img
                    src={selectedAvatar}
                    alt="Profile Avatar"
                    className="h-full w-full object-cover"
                    onError={() => {
                      setSelectedAvatar('/assets/hossen_ali_profile.jpg');
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-400">
                    <User className="h-12 w-12" />
                  </div>
                )}
              </div>

              {/* Status Pill Badge */}
              <span className="absolute bottom-1 right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
              </span>
            </div>

            {/* Name & Credentials in Preview */}
            <div className="mt-3.5 space-y-0.5">
              <div className="flex items-center justify-center gap-1.5">
                <h4 className="text-sm font-bold text-white">Md. Hossen Ali</h4>
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'ফুল-স্ট্যাক ক্লাউড আর্কিটেক্ট' : 'Senior Full-Stack Architect'}
              </p>
            </div>

            {/* Verified badge tag */}
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-mono text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{photoT.statusOnline}</span>
            </div>
          </div>

        </div>

        {/* Modal Action Buttons Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-end gap-3 relative z-10">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            {lang === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/25 transition disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            <span>{isSaving ? (lang === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : photoT.saveAndApply}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
