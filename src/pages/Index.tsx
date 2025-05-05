
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import MissingPersonCard from "@/components/MissingPersonCard";
import { missingPersonsData } from "@/data/missingPersons";
import { ArrowRight, Search, UserPlus, Share2, CheckCircle, Users, UserX, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  // Filter only active missing cases (not found) for the recent cases section
  const activeMissingCases = missingPersonsData.filter(person => person.status === 'missing');
  
  // Filter only found cases for success stories
  const foundCases = missingPersonsData.filter(person => person.status === 'found');
  
  // Calculate statistics
  const totalCases = missingPersonsData.length;
  const foundCount = foundCases.length;
  const missingCount = activeMissingCases.length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-800">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              Help Find Missing People
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10">
              Join our community effort to reunite families and find missing loved ones. 
              Upload a photo to search or register a missing person case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/search">
                  <Search className="mr-2 h-5 w-5" />
                  Find a Person
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Register a Case
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-14 px-4 bg-white dark:bg-gray-950">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 dark:bg-blue-900 w-14 h-14 rounded-full flex items-center justify-center">
                    <Users className="h-7 w-7 text-finder-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold mt-4">{totalCases}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">Total Registered Cases</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-green-100 dark:bg-green-900 w-14 h-14 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-3xl font-bold mt-4">{foundCount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">People Found</CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-amber-100 dark:bg-amber-900 w-14 h-14 rounded-full flex items-center justify-center">
                    <UserX className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                  </div>
                  <CardTitle className="text-3xl font-bold mt-4">{missingCount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">People Still Missing</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="action-card">
                <div className="action-card-content">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 mx-auto">
                    <Search className="h-6 w-6 text-finder-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Search by Photo</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Upload a photo of the person you're looking for. Our advanced facial recognition system will search for matches.
                  </p>
                </div>
              </div>
              
              <div className="action-card">
                <div className="action-card-content">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 mx-auto">
                    <UserPlus className="h-6 w-6 text-finder-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Register a Case</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    If someone you know is missing in known, please register a case with person details and photos to help others identify them.
                  </p>
                </div>
              </div>
              
              <div className="action-card">
                <div className="action-card-content">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 mx-auto">
                    <Share2 className="h-6 w-6 text-finder-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Share Cases</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Help spread the word by sharing missing the missing person profiles on social media and public places with your community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Stories Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Success Stories</h2>
              <Button variant="ghost" asChild>
                <Link to="/success-stories" className="flex items-center">
                  <span>View All</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <Carousel className="mb-10 max-w-4xl mx-auto">
              <CarouselContent>
                {foundCases.map((person) => (
                  <CarouselItem key={person.id} className="md:basis-1/2 lg:basis-1/2">
                    <Card className="overflow-hidden h-full">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={person.imageUrl} 
                          alt={person.name} 
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          <span>Found</span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle>{person.name}</CardTitle>
                        <CardDescription>Found after {Math.floor(Math.random() * 30) + 1} days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                          {person.name} was found safe in {person.lastSeen.location} thanks to community efforts and 
                          the dedication of local authorities.
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </div>
            </Carousel>

            <div className="text-center mb-8">
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
                Every success story represents a family reunited and a community that came together. 
                Your help can make the difference for those still missing.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button asChild>
                <Link to="/register">
                  Join Our Effort
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Recent Missing Persons */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Recent Missing Persons</h2>
              <Button variant="ghost" asChild>
                <Link to="/search" className="flex items-center">
                  <span>View All</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {activeMissingCases.slice(0, 4).map((person) => (
                <MissingPersonCard key={person.id} person={person} compact />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Trace Me</h3>
              <p className="text-gray-400 text-sm">Helping reunite families since 2023</p>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>© 2023 Trace Me. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
