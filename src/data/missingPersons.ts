
export interface MissingPerson {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastSeen: {
    date: string;
    location: string;
  };
  description: string;
  imageUrl: string;
  contactInfo: {
    name: string;
    relation: string;
    phone: string;
    email: string;
  };
  status: 'missing' | 'found';
}

// Sample data for development purposes
export const missingPersonsData: MissingPerson[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 28,
    gender: 'Male',
    lastSeen: {
      date: '2023-10-15',
      location: 'Central Park, New York'
    },
    description: 'John was last seen wearing a blue jacket and jeans. He has a distinctive tattoo on his right arm.',
    imageUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    contactInfo: {
      name: 'Mary Smith',
      relation: 'Sister',
      phone: '555-123-4567',
      email: 'mary.smith@example.com'
    },
    status: 'missing'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    age: 17,
    gender: 'Female',
    lastSeen: {
      date: '2023-11-02',
      location: 'Downtown Seattle, Washington'
    },
    description: 'Emma has brown hair and green eyes. She was wearing a green hoodie and carrying a black backpack.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    contactInfo: {
      name: 'Robert Johnson',
      relation: 'Father',
      phone: '555-987-6543',
      email: 'robert.johnson@example.com'
    },
    status: 'missing'
  },
  {
    id: '3',
    name: 'Michael Davis',
    age: 42,
    gender: 'Male',
    lastSeen: {
      date: '2023-09-28',
      location: 'Miami Beach, Florida'
    },
    description: 'Michael is approximately 6\'1" with a slim build. Has a scar on his left cheek.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    contactInfo: {
      name: 'Sarah Davis',
      relation: 'Wife',
      phone: '555-789-0123',
      email: 'sarah.davis@example.com'
    },
    status: 'found'
  },
  {
    id: '4',
    name: 'Olivia Wilson',
    age: 31,
    gender: 'Female',
    lastSeen: {
      date: '2023-10-30',
      location: 'Chicago Transit Station, Illinois'
    },
    description: 'Olivia has blonde hair and was wearing a red coat when last seen. She speaks with a slight accent.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    contactInfo: {
      name: 'James Wilson',
      relation: 'Brother',
      phone: '555-456-7890',
      email: 'james.wilson@example.com'
    },
    status: 'missing'
  },
  {
    id: '5',
    name: 'David Brown',
    age: 24,
    gender: 'Male',
    lastSeen: {
      date: '2023-11-07',
      location: 'Golden Gate Park, San Francisco'
    },
    description: 'David has dark brown hair and hazel eyes. Last seen wearing a gray t-shirt and black shorts.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    contactInfo: {
      name: 'Lisa Brown',
      relation: 'Mother',
      phone: '555-234-5678',
      email: 'lisa.brown@example.com'
    },
    status: 'missing'
  },
  {
    id: '6',
    name: 'Sophia Martinez',
    age: 19,
    gender: 'Female',
    lastSeen: {
      date: '2023-10-20',
      location: 'University Campus, Austin, Texas'
    },
    description: 'Sophia is 5\'5" with long black hair. Last seen wearing a university sweatshirt and carrying a laptop bag.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    contactInfo: {
      name: 'Carlos Martinez',
      relation: 'Father',
      phone: '555-345-6789',
      email: 'carlos.martinez@example.com'
    },
    status: 'missing'
  }
];
