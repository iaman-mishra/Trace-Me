
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Phone, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PersonDetails {
  id: string;
  name: string;
  age: number;
  gender: string;
  height?: string;
  weight?: string;
  hair_color?: string;
  eye_color?: string;
  last_seen_date: string;
  last_seen_location: string;
  description: string;
  photo_url: string;
  status: 'missing' | 'found';
  contact_info?: {
    id: string;
    contact_name: string;
    relationship: string;
    phone: string;
    email: string;
  }[];
}

const PersonDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPersonDetails = async () => {
      if (!id) {
        setError("Person ID is missing");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('missing_persons')
          .select(`
            *,
            contact_info (*)
          `)
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        if (!data) {
          setError("Person not found");
        } else {
          setPerson(data as PersonDetails);
        }
      } catch (err) {
        console.error('Error fetching person details:', err);
        toast.error("Error fetching person details");
        setError("Error fetching person details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonDetails();
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-10 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl flex justify-center items-center h-full">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin text-finder-primary" />
              <p className="mt-4 text-lg">Loading person details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (error || !person) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-10 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Error</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "Person not found"}</p>
              <Button asChild>
                <Link to="/search">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Search
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Button variant="outline" asChild className="mr-4">
              <Link to="/search">
                <ArrowLeft size={16} className="mr-2" />
                Back to Search
              </Link>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold">{person.name}</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Photo</h2>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square overflow-hidden rounded-md relative">
                    <img 
                      src={person.photo_url} 
                      alt={person.name} 
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${person.status === 'found' ? 'bg-finder-accent hover:bg-green-600' : 'bg-finder-error hover:bg-red-600'}`}
                    >
                      {person.status === 'found' ? 'Found' : 'Missing'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              {person.contact_info && person.contact_info.length > 0 && (
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-medium">{person.contact_info[0].contact_name} ({person.contact_info[0].relationship})</p>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <span>{person.contact_info[0].phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      <span>{person.contact_info[0].email}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Personal Details</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="text-lg font-medium">{person.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="text-lg font-medium">{person.gender}</p>
                    </div>
                    {person.height && (
                      <div>
                        <p className="text-sm text-muted-foreground">Height</p>
                        <p className="text-lg font-medium">{person.height} cm</p>
                      </div>
                    )}
                    {person.weight && (
                      <div>
                        <p className="text-sm text-muted-foreground">Weight</p>
                        <p className="text-lg font-medium">{person.weight} kg</p>
                      </div>
                    )}
                    {person.hair_color && (
                      <div>
                        <p className="text-sm text-muted-foreground">Hair Color</p>
                        <p className="text-lg font-medium">{person.hair_color}</p>
                      </div>
                    )}
                    {person.eye_color && (
                      <div>
                        <p className="text-sm text-muted-foreground">Eye Color</p>
                        <p className="text-lg font-medium">{person.eye_color}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Last Seen</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-gray-500" />
                    <span className="font-medium">{formatDate(person.last_seen_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gray-500" />
                    <span>{person.last_seen_location}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Description</h2>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{person.description}</p>
                </CardContent>
              </Card>
              
              {person.status === 'missing' && (
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button className="w-full">
                    <Phone size={16} className="mr-2" />
                    Contact Authorities
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail size={16} className="mr-2" />
                    Share This Case
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© 2023 FindMyPerson. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PersonDetailsPage;
