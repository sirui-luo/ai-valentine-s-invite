import React, { useState, useRef } from 'react';
import { InviteData } from '../types';
import { generateRomanticMessage } from '../services/geminiService';
import { Heart, Upload, Sparkles, MapPin, Calendar, User, ArrowRight, X } from 'lucide-react';

interface CreatorFormProps {
  onComplete: (data: InviteData) => void;
}

// Extend InviteData for multiple photoUrls (max 10)
type MultiPhotoInviteData = Omit<InviteData, "photoUrl"> & { photoUrls: string[] };

const MAX_PHOTOS = 10;

const CreatorForm: React.FC<CreatorFormProps> = ({ onComplete }) => {
  // The message field is explicitly to be delivered to the receiver (AskScreen)
  const [formData, setFormData] = useState<MultiPhotoInviteData>({
    senderName: '',
    receiverName: '',
    message: '',
    date: '',
    location: '',
    photoUrls: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert FileList to array and limit to MAX_PHOTOS
    const selectedFiles = Array.from(files).slice(0, MAX_PHOTOS - formData.photoUrls.length);
    const urls = selectedFiles.map(file => URL.createObjectURL(file as Blob));
    setFormData(prev => ({
      ...prev,
      photoUrls: [...prev.photoUrls, ...urls].slice(0, MAX_PHOTOS)
    }));
    // reset the file input so user can upload the same file again later if wanted
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      photoUrls: prev.photoUrls.filter((_, i) => i !== idx)
    }));
  };

  const handleGenerateMessage = async () => {
    if (!formData.senderName || !formData.receiverName) {
      alert("Please enter names first so the AI can write a personal message!");
      return;
    }
    setIsGenerating(true);
    try {
      const message = await generateRomanticMessage(formData.senderName, formData.receiverName);
      setFormData((prev) => ({ ...prev, message }));
    } catch (e) {
      alert("Sorry, could not generate a message right now. Please try again later.");
    }
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Defensive: allow empty or whitespace message, but trim it
    const safeMessage = typeof formData.message === "string" ? formData.message : "";
    // The sweet message (even if it's a poem or any info) is delivered to AskScreen for the receiver to see.
    // For backward compatibility: set photoUrl as the first photo, or null if none
    const inviteData: InviteData = {
      ...formData,
      message: safeMessage, // this gets displayed to the receiver in AskScreen
      photoUrl: formData.photoUrls[0] ?? null
    };
    onComplete(inviteData);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 border-pink-200 relative z-10">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-red-100 rounded-full mb-3">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        </div>
        <h1 className="text-4xl font-handwriting text-red-600 mb-2">Create Your Invite</h1>
        <p className="text-gray-600 text-sm">Design the perfect Valentine's surprise.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">FROM</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-pink-400" />
              <input
                required
                autoComplete="off"
                name="senderName"
                placeholder="Your Name"
                value={formData.senderName}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none bg-pink-50/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">TO</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-pink-400" />
              <input
                required
                autoComplete="off"
                name="receiverName"
                placeholder="Their Name"
                value={formData.receiverName}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none bg-pink-50/50"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            MESSAGE{" "}
            <span className="font-normal text-xs text-gray-400"></span>
          </label>
          <div className="relative">
            <textarea
              required
              name="message"
              rows={3}
              placeholder="Write a sweet message..."
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none bg-pink-50/50 resize-none font-handwriting text-xl text-gray-700"
            />
            <button
              type="button"
              onClick={handleGenerateMessage}
              disabled={isGenerating}
              className="absolute right-2 bottom-2 text-xs bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-full flex items-center hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {isGenerating ? 'Thinking...' : 'AI Writer'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">WHEN</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-pink-400" />
              <input
                type="text"
                name="date"
                placeholder="Feb 14, 7:00 PM"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none bg-pink-50/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">WHERE</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-pink-400" />
              <input
                type="text"
                name="location"
                placeholder="Restaurant..."
                value={formData.location}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none bg-pink-50/50"
              />
            </div>
          </div>
        </div>

        {/* --- Redesigned Photo Upload Section --- */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            SPECIAL PHOTOS <span className="font-normal text-xs text-gray-400">(up to {MAX_PHOTOS})</span>
          </label>
          <div
            className={`w-full min-h-[112px] border-2 border-dashed border-pink-300 rounded-2xl flex flex-col items-center justify-center relative transition-colors duration-200`}
          >
            {formData.photoUrls.length === 0 && (
              <div className="flex flex-col items-center justify-center py-7">
                {formData.photoUrls.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    tabIndex={0}
                    className="border border-pink-200 rounded-xl px-4 py-2 flex flex-col items-center justify-center hover:bg-pink-50 transition hover:border-pink-300 group"
                    onClick={e => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    aria-label="Add photo"
                  >
                    <Upload className="w-5 h-5 text-pink-400 mb-1 group-hover:text-pink-500" />
                    <span className="text-xs text-pink-400 group-hover:text-pink-500" style={{ fontSize: "0.72rem" }}>Add</span>
                  </button>
                )}
              </div>
            )}

            {formData.photoUrls.length > 0 && (
              <div className="w-full flex flex-wrap gap-3 justify-center items-center py-4">
                {formData.photoUrls.map((url, idx) => (
                  <div key={url} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded-xl border-2 border-pink-200 shadow transition-transform group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleRemovePhoto(idx);
                      }}
                      className="absolute top-1 right-1 bg-pink-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition z-10"
                      title="Remove"
                      aria-label={`Remove photo ${idx + 1}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.photoUrls.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    tabIndex={0}
                    className="w-24 h-24 rounded-xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center hover:bg-pink-50 hover:border-pink-300 transition-colors mx-1"
                    onClick={e => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    aria-label="Add photo"
                  >
                    <Upload className="w-6 h-6 text-pink-400 mb-1" />
                    <span className="text-[0.70rem] text-pink-400">Add</span>
                  </button>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={formData.photoUrls.length >= MAX_PHOTOS}
            />
            {formData.photoUrls.length >= MAX_PHOTOS && (
              <div className="absolute bottom-0 left-0 w-full text-center text-xs text-pink-600 bg-pink-100/80 py-1 rounded-b-2xl">
                Max {MAX_PHOTOS} photos uploaded
              </div>
            )}
          </div>
        </div>
        {/* --- End Photo Upload Section --- */}

        <button
          type="submit"
          className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transform transition-all hover:scale-[1.02] flex items-center justify-center mt-4"
        >
          Create Invitation <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </form>
    </div>
  );
};

export default CreatorForm;