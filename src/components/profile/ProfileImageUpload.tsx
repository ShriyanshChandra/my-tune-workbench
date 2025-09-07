import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { setupStorageBucket } from '@/utils/setupStorage';

interface ProfileImageUploadProps {
  currentImageUrl?: string | null;
  userId: string;
  userName?: string | null;
  onImageUpdate: (newImageUrl: string) => void;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImageUrl,
  userId,
  userName,
  onImageUpdate,
}) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [setupInstructions, setSetupInstructions] = useState<string[] | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image must be less than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const uploadImage = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setSetupInstructions(null);
    
    try {
      // First try to set up storage bucket
      const setupResult = await setupStorageBucket();
      
      if (!setupResult.success) {
        if (setupResult.instructions) {
          setSetupInstructions(setupResult.instructions);
        }
        throw new Error(setupResult.error || 'Storage setup failed');
      }

      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('user-uploads')
        .upload(filePath, selectedFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('user-uploads')
        .getPublicUrl(filePath);

      // Update the user's profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw new Error(`Failed to update profile: ${updateError.message}`);
      }

      onImageUpdate(publicUrl);
      setIsDialogOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setSetupInstructions(null);
      
      toast({
        title: 'Success',
        description: 'Profile image updated successfully!',
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      
      let errorMessage = 'Failed to upload image. Please try again.';
      
      if (error.message.includes('Storage setup failed') || error.message.includes('not accessible')) {
        errorMessage = 'Storage is not set up. Please follow the instructions below or contact your administrator.';
      } else if (error.message.includes('not found')) {
        errorMessage = 'Storage bucket not found. Please follow the setup instructions below.';
      } else if (error.message.includes('Unauthorized')) {
        errorMessage = 'You don\'t have permission to upload images.';
      } else if (error.message.includes('too large')) {
        errorMessage = 'Image is too large. Please choose an image smaller than 5MB.';
      }
      
      toast({
        title: 'Upload Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer">
          <Avatar className="h-24 w-24 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
            <AvatarImage src={currentImageUrl || undefined} />
            <AvatarFallback className="text-xl bg-gradient-to-br from-primary/20 to-secondary/20">
              {userName?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-background/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Camera className="h-6 w-6 text-primary" />
          </div>
        </div>
      </DialogTrigger>
      
        <DialogContent className="sm:max-w-md" aria-describedby="profile-image-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Update Profile Image
          </DialogTitle>
          <p id="profile-image-description" className="text-sm text-muted-foreground">
            Upload a new profile image from your device
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Setup Instructions Alert */}
          {setupInstructions && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <div className="font-semibold mb-2">Manual Setup Required:</div>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {setupInstructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </AlertDescription>
            </Alert>
          )}

          {/* Current/Preview Image */}
          <div className="flex justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src={previewUrl || currentImageUrl || undefined} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                {userName?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* File Selection */}
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                Click to select an image
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Max size: 5MB
              </span>
            </label>

            {selectedFile && (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm truncate">{selectedFile.name}</span>
                <Button variant="ghost" size="sm" onClick={clearSelection}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={uploadImage}
              disabled={!selectedFile || uploading}
              className="flex-1"
            >
              {uploading ? 'Uploading...' : 'Update Image'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};