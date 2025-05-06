import { useState, useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";

const RegisterCase = () => {
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();
  
  // Personal details
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  
  // Case details
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // Contact info
  const [contactName, setContactName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const uploadPhoto = async () => {
    if (!photoFile || !user) return null;
    
    try {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Check if the bucket exists, create it if not
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets?.find(bucket => bucket.name === 'case_photos')) {
        await supabase.storage.createBucket('case_photos', { public: true });
      }
      
      const { data, error } = await supabase.storage
        .from('case_photos')
        .upload(fileName, photoFile);
      
      if (error) throw error;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('case_photos')
        .getPublicUrl(fileName);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in or create an account to register a case");
      return;
    }
    
    if (!date) {
      toast.error("Please select the last seen date");
      return;
    }
    
    if (!photoFile) {
      toast.error("Please upload a photo");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload photo first
      const photoUrl = await uploadPhoto();
      
      if (!photoUrl) {
        throw new Error("Failed to upload photo");
      }
      
      console.log("Uploading case with user ID:", user.id);
      
      // Insert missing person case
      const { data: caseData, error: caseError } = await supabase
        .from('missing_persons')
        .insert({
          user_id: user.id,
          name,
          age: parseInt(age),
          gender,
          height,
          weight,
          hair_color: hairColor,
          eye_color: eyeColor,
          last_seen_date: date.toISOString(),
          last_seen_location: location,
          description,
          photo_url: photoUrl,
          status: 'missing'
        })
        .select();
      
      if (caseError) {
        console.error("Error inserting case:", caseError);
        throw caseError;
      }
      
      console.log("Case inserted:", caseData);
      
      if (!caseData || caseData.length === 0) {
        throw new Error("No case data returned after insertion");
      }
      
      // Insert contact information
      const { error: contactError } = await supabase
        .from('contact_info')
        .insert({
          case_id: caseData[0].id,
          contact_name: contactName,
          relationship,
          phone,
          email
        });
      
      if (contactError) throw contactError;
      
      toast.success("Case registered successfully");
      
      // Reset form fields
      setName("");
      setAge("");
      setGender("");
      setHeight("");
      setWeight("");
      setHairColor("");
      setEyeColor("");
      setDate(undefined);
      setLocation("");
      setDescription("");
      setPhotoFile(null);
      setPhotoPreview(null);
      setContactName("");
      setRelationship("");
      setPhone("");
      setEmail("");
      
      // Navigate to search page
      navigate("/search");
    } catch (error) {
      console.error("Error registering case:", error);
      toast.error("Failed to register case: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Make the tab navigation work properly
  const navigateToTab = (tabValue: string) => {
    const tabsElement = document.querySelector('[role="tablist"]');
    if (tabsElement) {
      const tabTrigger = tabsElement.querySelector(`[data-state][value="${tabValue}"]`);
      if (tabTrigger && tabTrigger instanceof HTMLElement) {
        tabTrigger.click();
      }
    }
  };
  
  // Check if authenticated
  if (!user && !loading) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Sign In or Create an Account</h2>
            <AuthForm onAuthenticated={() => null} />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-finder-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="case">Case Details</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name of missing person"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender} required>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Height in centimeters"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Weight in kilograms"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hair-color">Hair Color</Label>
              <Input
                id="hair-color"
                placeholder="Hair color"
                value={hairColor}
                onChange={(e) => setHairColor(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eye-color">Eye Color</Label>
              <Input
                id="eye-color"
                placeholder="Eye color"
                value={eyeColor}
                onChange={(e) => setEyeColor(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="button" onClick={() => navigateToTab("case")}>
              Next
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="case" className="space-y-6 pt-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Last Seen Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Last Seen Location</Label>
              <Input
                id="location"
                placeholder="Address, city, or landmark"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Any identifying details, what they were wearing, circumstances of disappearance, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    required
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a clear, recent photo. Max size: 5MB.
                  </p>
                </div>
                
                {photoPreview && (
                  <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-md">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigateToTab("personal")}>
              Previous
            </Button>
            <Button type="button" onClick={() => navigateToTab("contact")}>
              Next
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Your Name</Label>
              <Input
                id="contact-name"
                placeholder="Your full name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship to Missing Person</Label>
              <Input
                id="relationship"
                placeholder="e.g. Parent, Sibling, Friend"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              By submitting this form, you certify that the information provided is accurate to the best of your knowledge.
              Law enforcement will be notified about this case.
            </p>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigateToTab("case")}>
                Previous
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Register Case"
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default RegisterCase;
