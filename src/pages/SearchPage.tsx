
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SearchByPhoto from "@/components/SearchByPhoto";
import MissingPersonCard from "@/components/MissingPersonCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal, Image, Loader2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { MissingPerson } from "@/data/missingPersons";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchResults, setSearchResults] = useState<MissingPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch cases from Supabase
  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('missing_persons')
          .select(`
            id,
            name,
            age,
            gender,
            last_seen_date,
            last_seen_location,
            description,
            photo_url,
            status,
            contact_info (
              contact_name,
              relationship,
              phone,
              email
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform the data to match our MissingPerson interface
        const formattedData: MissingPerson[] = data.map(person => ({
          id: person.id,
          name: person.name,
          age: person.age || 0,
          gender: person.gender || '',
          lastSeen: {
            date: person.last_seen_date ? new Date(person.last_seen_date).toISOString().split('T')[0] : '',
            location: person.last_seen_location || ''
          },
          description: person.description || '',
          imageUrl: person.photo_url || '',
          contactInfo: {
            name: person.contact_info?.[0]?.contact_name || '',
            relation: person.contact_info?.[0]?.relationship || '',
            phone: person.contact_info?.[0]?.phone || '',
            email: person.contact_info?.[0]?.email || ''
          },
          status: person.status as 'missing' | 'found'
        }));

        setSearchResults(formattedData);
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Filter by search term and status
    const fetchFilteredResults = async () => {
      try {
        let query = supabase
          .from('missing_persons')
          .select(`
            id,
            name,
            age,
            gender,
            last_seen_date,
            last_seen_location,
            description,
            photo_url,
            status,
            contact_info (
              contact_name,
              relationship,
              phone,
              email
            )
          `);

        // Add status filter if not "all"
        if (statusFilter !== "all") {
          query = query.eq('status', statusFilter);
        }

        // Add search term filter if provided
        if (searchTerm) {
          query = query.or(`name.ilike.%${searchTerm}%,last_seen_location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        // Transform the data to match our MissingPerson interface
        const formattedData: MissingPerson[] = data.map(person => ({
          id: person.id,
          name: person.name,
          age: person.age || 0,
          gender: person.gender || '',
          lastSeen: {
            date: person.last_seen_date ? new Date(person.last_seen_date).toISOString().split('T')[0] : '',
            location: person.last_seen_location || ''
          },
          description: person.description || '',
          imageUrl: person.photo_url || '',
          contactInfo: {
            name: person.contact_info?.[0]?.contact_name || '',
            relation: person.contact_info?.[0]?.relationship || '',
            phone: person.contact_info?.[0]?.phone || '',
            email: person.contact_info?.[0]?.email || ''
          },
          status: person.status as 'missing' | 'found'
        }));

        setSearchResults(formattedData);
      } catch (error) {
        console.error('Error searching cases:', error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchFilteredResults();
  };

  // Filter when status changes
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setIsSearching(true);
    
    // Also apply the current search term
    const fetchFilteredResults = async () => {
      try {
        let query = supabase
          .from('missing_persons')
          .select(`
            id,
            name,
            age,
            gender,
            last_seen_date,
            last_seen_location,
            description,
            photo_url,
            status,
            contact_info (
              contact_name,
              relationship,
              phone,
              email
            )
          `);

        // Add status filter if not "all"
        if (value !== "all") {
          query = query.eq('status', value);
        }

        // Add search term filter if provided
        if (searchTerm) {
          query = query.or(`name.ilike.%${searchTerm}%,last_seen_location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        // Transform the data to match our MissingPerson interface
        const formattedData: MissingPerson[] = data.map(person => ({
          id: person.id,
          name: person.name,
          age: person.age || 0,
          gender: person.gender || '',
          lastSeen: {
            date: person.last_seen_date ? new Date(person.last_seen_date).toISOString().split('T')[0] : '',
            location: person.last_seen_location || ''
          },
          description: person.description || '',
          imageUrl: person.photo_url || '',
          contactInfo: {
            name: person.contact_info?.[0]?.contact_name || '',
            relation: person.contact_info?.[0]?.relationship || '',
            phone: person.contact_info?.[0]?.phone || '',
            email: person.contact_info?.[0]?.email || ''
          },
          status: person.status as 'missing' | 'found'
        }));

        setSearchResults(formattedData);
      } catch (error) {
        console.error('Error filtering cases:', error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchFilteredResults();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Find Missing Persons</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Upload a photo or search by name, location, or description to help find missing individuals.
            </p>
          </div>
          
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Search size={16} />
                <span>Text Search</span>
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex items-center gap-2">
                <Image size={16} />
                <span>Photo Search</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text">
              <div className="mb-10">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by name, location, or description"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select 
                      defaultValue="all" 
                      value={statusFilter}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cases</SelectItem>
                        <SelectItem value="missing">Missing</SelectItem>
                        <SelectItem value="found">Found</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="submit" disabled={isSearching}>
                      {isSearching ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        "Search"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Search Results</h2>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <SlidersHorizontal size={14} />
                  <span>Filter</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                  <div className="flex justify-center items-center p-10">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((person) => (
                    <MissingPersonCard key={person.id} person={person} />
                  ))
                ) : (
                  <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">No matching results found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="photo">
              <div className="max-w-3xl mx-auto">
                <SearchByPhoto />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© 2025 FindMyPerson. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
