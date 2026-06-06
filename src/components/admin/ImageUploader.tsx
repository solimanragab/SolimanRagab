import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (base64Url: string) => void;
  className?: string;
}

export default function ImageUploader({ label, value, onChange, className = '' }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setError('Please select or drop a valid image file (PNG, JPG, WEBP).');
      return;
    }

    // Validate size (limit to ~4MB to avoid localStorage quota limits)
    if (file.size > 4 * 1024 * 1024) {
      setError('Image file is too large. Please select an image under 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        onChange(base64);
      } else {
        setError('Failed to process the image file.');
      }
    };
    reader.onerror = () => {
      setError('Error reading the image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-semibold text-dark/70">
        {label}
      </label>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-xl flex items-start gap-2 text-xs border border-red-100 mb-2 font-normal animate-shake">
          <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        className={`relative w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer select-none group min-h-[160px] ${
          dragActive
            ? 'border-accent bg-accent/5 ring-2 ring-accent/20'
            : value
            ? 'border-dark/10 bg-cream/5 hover:border-accent/50 hover:bg-cream/10'
            : 'border-dark/15 bg-cream/20 hover:border-accent hover:bg-accent/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />

        {value ? (
          /* Preview image */
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="relative max-h-36 max-w-full rounded-lg overflow-hidden border border-dark/15 shadow-sm group-hover:shadow-md transition-all">
              <img
                src={value}
                alt="Preview"
                className="max-h-36 max-w-full object-contain"
              />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 p-1.5 bg-dark-800/80 hover:bg-dark-800 text-cream rounded-full transition-all border border-cream/10 shadow hover:scale-105 active:scale-95"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-[10px] text-dark/45 font-semibold text-center">
              Click or drag another image to replace.
            </p>
          </div>
        ) : (
          /* Empty dropzone */
          <div className="text-center space-y-2.5">
            <div className="mx-auto w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center transition-colors group-hover:bg-accent group-hover:text-cream">
              <Upload size={20} className="transition-transform group-hover:-translate-y-0.5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-semibold text-dark">
                Drag & drop image here
              </p>
              <p className="text-[10px] text-dark/40 font-semibold">
                or click to browse local files (under 4MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
