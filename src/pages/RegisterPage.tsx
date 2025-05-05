
import Navbar from "@/components/Navbar";
import RegisterCase from "@/components/RegisterCase";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Register a Missing Person</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Fill out the form below with as much detail as possible to help in the search efforts.
              The more information you provide, the better the chances of finding the person.
            </p>
          </div>
          
          <RegisterCase />
          
          <div className="mt-16 max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Important Information</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex gap-2">
                <span className="text-finder-primary">•</span>
                <span>All cases are reviewed by our team before being made public.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-finder-primary">•</span>
                <span>You will receive email updates on your case status.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-finder-primary">•</span>
                <span>We work with local authorities to assist in finding missing persons.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-finder-primary">•</span>
                <span>Please contact emergency services immediately if the person is in immediate danger.</span>
              </li>
            </ul>
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

export default RegisterPage;
