
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, Search, UserPlus, Home } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="w-full py-4 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">Trace Me</span>
        </Link>

        {isMobile ? (
          <MobileMenu />
        ) : (
          <div className="flex items-center gap-6">
            <NavLinks />
            <ActionButtons />
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = () => (
  <div className="flex items-center gap-6">
    <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-finder-primary dark:hover:text-finder-secondary transition-colors flex items-center gap-2">
      <Home size={18} />
      <span>Home</span>
    </Link>
    <Link to="/search" className="text-gray-700 dark:text-gray-300 hover:text-finder-primary dark:hover:text-finder-secondary transition-colors flex items-center gap-2">
      <Search size={18} />
      <span>Find Person</span>
    </Link>
    <Link to="/register" className="text-gray-700 dark:text-gray-300 hover:text-finder-primary dark:hover:text-finder-secondary transition-colors flex items-center gap-2">
      <UserPlus size={18} />
      <span>Register Case</span>
    </Link>
  </div>
);

const ActionButtons = () => (
  <div className="flex items-center gap-2">
    <Button asChild variant="outline">
      <Link to="/search">
        <Search size={16} className="mr-2" />
        Search
      </Link>
    </Button>
    <Button asChild>
      <Link to="/register">
        <UserPlus size={16} className="mr-2" />
        Register Case
      </Link>
    </Button>
  </div>
);

const MobileMenu = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon">
        <MenuIcon size={20} />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <div className="flex flex-col gap-6 pt-10">
        <Link 
          to="/" 
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link 
          to="/search" 
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Search size={18} />
          <span>Find Person</span>
        </Link>
        <Link 
          to="/register" 
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <UserPlus size={18} />
          <span>Register Case</span>
        </Link>
      </div>
    </SheetContent>
  </Sheet>
);

export default Navbar;
