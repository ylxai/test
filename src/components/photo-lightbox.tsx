'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2, 
  Heart, 
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Photo {
  id: string;
  eventId: string;
  url: string;
  filename: string;
  uploadedAt: string;
  downloads: number;
  likes: number;
  album?: string;
}

interface PhotoLightboxProps {
  photos: Photo[];
  initialPhoto: Photo;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onLike: () => void;
  onShare: () => void;
  onSlideshow: () => void;
}

export function PhotoLightbox({
  photos,
  initialPhoto,
  isOpen,
  onClose,
  onDownload,
  onLike,
  onShare,
  onSlideshow
}: PhotoLightboxProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const index = photos.findIndex(photo => photo.id === initialPhoto.id);
    setCurrentPhotoIndex(index >= 0 ? index : 0);
  }, [initialPhoto, photos]);

  useEffect(() => {
    if (isSlideshowActive) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isSlideshowActive, photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          toggleSlideshow();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPhotoIndex, photos.length]);

  const currentPhoto = photos[currentPhotoIndex];

  const goToPrevious = () => {
    setCurrentPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
    resetView();
  };

  const goToNext = () => {
    setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
    resetView();
  };

  const toggleSlideshow = () => {
    setIsSlideshowActive(!isSlideshowActive);
    if (!isSlideshowActive) {
      onSlideshow();
    }
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => prev + 90);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  if (!currentPhoto) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-0">
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-4">
              <h3 className="text-white font-medium truncate">{currentPhoto.filename}</h3>
              {currentPhoto.album && (
                <Badge variant="secondary" className="text-xs">
                  {currentPhoto.album}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            <div
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.filename}
                className="max-w-full max-h-full object-contain"
                draggable={false}
              />
            </div>

            {/* Navigation Arrows */}
            {photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Footer Controls */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                {/* Photo Info */}
                <div className="flex items-center space-x-4 text-white text-sm">
                  <span>{format(new Date(currentPhoto.uploadedAt), 'd MMM yyyy', { locale: id })}</span>
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {currentPhoto.likes}
                  </span>
                  <span className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {currentPhoto.downloads}
                  </span>
                  <span>{currentPhotoIndex + 1} / {photos.length}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {/* View Controls */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    className="text-white hover:bg-white/20"
                    disabled={zoom <= 0.5}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    className="text-white hover:bg-white/20"
                    disabled={zoom >= 3}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRotate}
                    className="text-white hover:bg-white/20"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetView}
                    className="text-white hover:bg-white/20"
                  >
                    Reset
                  </Button>

                  {/* Photo Actions */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={`hover:bg-white/20 ${
                      isLiked ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDownload}
                    className="text-white hover:bg-white/20"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onShare}
                    className="text-white hover:bg-white/20"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  {photos.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSlideshow}
                      className={`hover:bg-white/20 ${
                        isSlideshowActive ? 'text-blue-400' : 'text-white'
                      }`}
                    >
                      {isSlideshowActive ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Slideshow Progress */}
              {isSlideshowActive && (
                <div className="mt-3">
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div
                      className="bg-blue-400 h-1 rounded-full transition-all duration-3000 ease-linear"
                      style={{
                        width: `${((currentPhotoIndex + 1) / photos.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {photos.length > 1 && (
            <div className="absolute bottom-20 left-4 right-4 z-10">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                <div className="flex space-x-2 overflow-x-auto">
                  {photos.map((photo, index) => (
                    <button
                      key={photo.id}
                      onClick={() => {
                        setCurrentPhotoIndex(index);
                        resetView();
                      }}
                      className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                        index === currentPhotoIndex
                          ? 'border-blue-400 scale-110'
                          : 'border-transparent hover:border-white/50'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.filename}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}