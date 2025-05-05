
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Search, ImageIcon, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import MissingPersonCard from "@/components/MissingPersonCard";

const SearchByPhoto = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file (JPEG, PNG, etc.)");
      return;
    }
    
    setSelectedFile(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
    setShowResults(false);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setMatchResults([]);
    setShowResults(false);
  };

  const handleSearch = async () => {
    if (!selectedFile || !previewUrl) {
      toast.error("Please upload a photo to search");
      return;
    }

    setIsSearching(true);
    setShowResults(false);
    setMatchResults([]);
    
    try {
      // Get face embedding from our edge function
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke("face-match", {
        body: { imageBase64: previewUrl },
        headers: session?.access_token 
          ? { Authorization: `Bearer ${session.access_token}` }
          : undefined
      });
      
      if (response.error) {
        throw new Error(response.error.message || "Failed to process image");
      }
      
      const { matches } = response.data;
      setMatchResults(matches || []);
      setShowResults(true);
      
      if (matches && matches.length > 0) {
        toast.success(`Found ${matches.length} potential matches!`);
      } else {
        toast.info("No matches found in our database");
      }
    } catch (error) {
      console.error("Error during face search:", error);
      toast.error("Error processing the image. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photo" className="text-base font-medium">Upload Photo</Label>
              <div
                className={`photo-drop-area border-2 border-dashed rounded-lg p-4 transition-colors ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700'
                } ${previewUrl ? 'bg-gray-50 dark:bg-gray-900' : ''} cursor-pointer`}
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={triggerFileInput}
              >
                <Input
                  ref={fileInputRef}
                  id="photo"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-60 mx-auto rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white hover:bg-black/70 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectedFile();
                      }}
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                    <div className="mt-4">
                      <p className="text-sm font-medium">
                        Drag and drop an image here or click to browse
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPEG, PNG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleSearch} 
                disabled={!selectedFile || isSearching}
                className="w-full"
              >
                {isSearching ? (
                  <span className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    Analyzing Image...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="mr-2 h-4 w-4" />
                    Search for This Person
                  </span>
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                Upload a clear photo of the person you're looking for. Our AI will analyze the image and search for potential matches in our database.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Results Section */}
      {showResults && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Match Results</h2>
          
          {matchResults.length > 0 ? (
            <div className="space-y-6">
              {matchResults.map((match) => (
                <div key={match.id} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                    <span>AI Match Confidence: {match.confidence}%</span>
                  </div>
                  <MissingPersonCard 
                    person={{
                      id: match.id,
                      name: match.name,
                      age: match.age,
                      gender: match.gender,
                      lastSeen: {
                        date: new Date(match.last_seen_date).toISOString().split('T')[0],
                        location: match.last_seen_location
                      },
                      description: match.description || '',
                      imageUrl: match.photo_url,
                      contactInfo: {
                        name: '',
                        relation: '',
                        phone: '',
                        email: ''
                      },
                      status: match.status
                    }} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Matches Found</h3>
              <p className="text-center text-muted-foreground max-w-md">
                We couldn't find any matching records in our database. 
                You can try uploading a different photo or using our text search feature.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchByPhoto;
