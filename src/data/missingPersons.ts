
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
    name: 'Aman Tiwari',
    age: 28,
    gender: 'Male',
    lastSeen: {
      date: '2023-10-15',
      location: 'Vanaras, india '
    },
    description: 'Aman was last seen wearing a blue jacket and jeans. He has a distinctive tattoo on his right arm.',
    imageUrl: '/images/person1.jpg',
    contactInfo: {
      name: 'aman kumar tiwari',
      relation: 'Sister',
      phone: '555-123-4567',
      email: 'amankumartiwari5255@gmail.com'
    },
    status: 'missing'
  },
  {
    id: '2',
    name: 'Ashish Yadav',
    age: 17,
    gender: 'Female',
    lastSeen: {
      date: '2023-11-02',
      location: 'up, pratapgargh'
    },
    description: 'Emma has brown hair and green eyes. She was wearing a green hoodie and carrying a black backpack.',
    imageUrl: '/images/person1.jpg',
    contactInfo: {
      name: 'ashish yadav',
      relation: 'Father',
      phone: '555-987-6543',
      email: 'ashishyadav@gmail.com'
    },
    status: 'missing'
  },
  {
    id: '3',
    name: 'Aman Mishra',
    age: 42,
    gender: 'Male',
    lastSeen: {
      date: '2023-09-28',
      location: 'up, pratapgargh'
    },
    description: 'Michael is approximately 6\'1" with a slim build. Has a scar on his left cheek.',
    imageUrl: '/images/person1.jpg',
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
    name: 'Arav ghosh',
    age: 31,
    gender: 'Female',
    lastSeen: {
      date: '2023-10-30',
      location: 'Chicago Transit Station, Illinois'
    },
    description: 'Olivia has blonde hair and was wearing a red coat when last seen. She speaks with a slight accent.',
    imageUrl: '/images/person1.jpg',
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
    name: 'Ankit Shukla',
    age: 24,
    gender: 'Male',
    lastSeen: {
      date: '2023-11-07',
      location: 'Golden Gate Park, San Francisco'
    },
    description: 'David has dark brown hair and hazel eyes. Last seen wearing a gray t-shirt and black shorts.',
    imageUrl: '/images/person1.jpg',
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
    name: 'Ritesh Kumar',
    age: 19,
    gender: 'Female',
    lastSeen: {
      date: '2023-10-20',
      location: 'University Campus, Austin, Texas'
    },
    description: 'Sophia is 5\'5" with long black hair. Last seen wearing a university sweatshirt and carrying a laptop bag.',
    imageUrl: '/images/person1.jpg',
    contactInfo: {
      name: 'Carlos Martinez',
      relation: 'Father',
      phone: '555-345-6789',
      email: 'carlos.martinez@example.com'
    },
    status: 'missing'
  }
];
