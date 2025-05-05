
import { MissingPerson } from "@/data/missingPersons";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Phone, Mail, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface MissingPersonCardProps {
  person: MissingPerson;
  compact?: boolean;
}

const MissingPersonCard = ({ person, compact = false }: MissingPersonCardProps) => {
  const { name, age, gender, lastSeen, imageUrl, status, contactInfo } = person;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (compact) {
    return (
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
        <div className="aspect-square relative">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <Badge 
            className={`absolute top-2 right-2 ${status === 'found' ? 'bg-finder-accent hover:bg-green-600' : 'bg-finder-error hover:bg-red-600'}`}
          >
            {status === 'found' ? 'Found' : 'Missing'}
          </Badge>
        </div>
        <CardContent className="py-4">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{age} years, {gender}</p>
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <MapPin size={12} className="mr-1" />
            <span>{lastSeen.location}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button size="sm" asChild className="w-full">
            <Link to={`/person/${person.id}`}>
              <Info size={16} className="mr-2" />
              Details
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3 overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <Badge 
            className={`absolute top-2 right-2 ${status === 'found' ? 'bg-finder-accent hover:bg-green-600' : 'bg-finder-error hover:bg-red-600'}`}
          >
            {status === 'found' ? 'Found' : 'Missing'}
          </Badge>
        </div>
        <div className="sm:w-2/3">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xl">{name}</h3>
                <p className="text-muted-foreground">{age} years, {gender}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-muted-foreground" />
                <span>Last seen: {formatDate(lastSeen.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <span>{lastSeen.location}</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm font-medium">Contact Information:</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">{contactInfo.name} ({contactInfo.relation})</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-muted-foreground" />
                    <span>{contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={14} className="text-muted-foreground" />
                    <span>{contactInfo.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to={`/person/${person.id}`}>
                <Info size={16} className="mr-2" />
                View Full Details
              </Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default MissingPersonCard;
