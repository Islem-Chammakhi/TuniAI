import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Camera } from "lucide-react";

interface PhotoUploadProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

export default function PhotoUpload({ onImageUpload, isLoading }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
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

  const processFile = (file: File) => {
    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Pass file to parent
    onImageUpload(file);
  };

  const takePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement('video');
      const canvasElement = document.createElement('canvas');
      
      videoElement.srcObject = stream;
      await videoElement.play();
      
      // Set dimensions
      const width = videoElement.videoWidth;
      const height = videoElement.videoHeight;
      canvasElement.width = width;
      canvasElement.height = height;
      
      // Draw video frame to canvas
      const context = canvasElement.getContext('2d');
      if (context) {
        context.drawImage(videoElement, 0, 0, width, height);
        
        // Convert to file
        canvasElement.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });
            processFile(file);
            
            // Stop tracks
            stream.getTracks().forEach(track => track.stop());
          }
        }, 'image/jpeg');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check your permissions.');
    }
  };

  return (
    <div className="bg-sand rounded-2xl p-8 lg:p-12 shadow-lg">
      <h2 className="text-2xl font-bold font-el-messiri text-dark-brown mb-4">Try Monument Recognition</h2>
      <p className="text-dark-brown/80 mb-6">
        Upload a photo of a Tunisian monument or landmark to see our AI in action. We'll identify it and provide detailed information.
      </p>
      
      <div 
        className={`border-2 border-dashed ${dragActive ? 'border-terracotta bg-terracotta/5' : 'border-terracotta/50'} rounded-xl p-8 text-center bg-white relative`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Uploaded monument" 
              className="max-h-48 mx-auto rounded-lg object-contain"
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-brown/50 rounded-lg">
                <Loader2 className="h-12 w-12 text-white animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-terracotta mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Drag & Drop Your Photo</h3>
            <p className="text-sm text-dark-brown/60 mb-4">or click to browse files</p>
          </>
        )}
        
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        <Button
          onClick={handleButtonClick}
          className="px-6 py-2.5 bg-terracotta text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : previewUrl ? (
            "Upload Another Image"
          ) : (
            "Upload Image"
          )}
        </Button>
        
        <p className="text-xs text-dark-brown/50 mt-4">
          Supports JPG, PNG • Max size 10MB
        </p>
      </div>
      
      <div className="mt-6 flex items-center justify-center">
        <Button 
          className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-azure-blue rounded-lg text-white font-medium"
          onClick={takePhoto}
          disabled={isLoading}
        >
          <Camera className="h-4 w-4 mr-2" />
          <span>Take Photo Instead</span>
        </Button>
      </div>
    </div>
  );
}
