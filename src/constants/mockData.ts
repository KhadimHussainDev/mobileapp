export interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  description: string;
  category: string;
  price: string | null;
  organizer: string;
  deadline: string;
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Festival de musique d\'Ottawa',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    date: '2023-06-15',
    location: 'Parc Lansdowne, Ottawa',
    description: 'Un festival de musique en plein air avec des artistes locaux et internationaux.',
    category: 'Musique',
    price: '$35',
    organizer: 'Ottawa Events Inc.',
    deadline: '2023-06-14T23:59:59',
  },
  {
    id: '2',
    title: 'Exposition d\'art contemporain',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6',
    date: '2023-07-10',
    location: 'Galerie d\'art d\'Ottawa',
    description: 'Une exposition mettant en vedette des artistes contemporains locaux.',
    category: 'Art',
    price: '$10',
    organizer: 'Galerie d\'art d\'Ottawa',
    deadline: '2023-07-09T23:59:59',
  },
  {
    id: '3',
    title: 'Marathon d\'Ottawa',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635',
    date: '2023-08-20',
    location: 'Centre-ville d\'Ottawa',
    description: 'Course annuelle de marathon à travers les rues d\'Ottawa.',
    category: 'Sport',
    price: '$50',
    organizer: 'Run Ottawa',
    deadline: '2023-08-15T23:59:59',
  },
  {
    id: '4',
    title: 'Marché fermier du week-end',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9',
    date: '2023-05-28',
    location: 'Marché By, Ottawa',
    description: 'Marché de produits frais locaux et d\'artisanat.',
    category: 'Marché',
    price: null,
    organizer: 'Association des fermiers d\'Ottawa',
    deadline: '2023-05-28T08:00:00',
  },
  {
    id: '5',
    title: 'Conférence sur la technologie',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    date: '2023-09-05',
    location: 'Centre des congrès d\'Ottawa',
    description: 'Une conférence sur les dernières tendances technologiques.',
    category: 'Technologie',
    price: '$100',
    organizer: 'Tech Ottawa',
    deadline: '2023-09-01T23:59:59',
  },
];

export const organizers = [
  {
    id: '1',
    name: 'Ottawa Events Inc.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    events: 15,
  },
  {
    id: '2',
    name: 'Galerie d\'art d\'Ottawa',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
    events: 8,
  },
  {
    id: '3',
    name: 'Run Ottawa',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2',
    events: 3,
  },
  {
    id: '4',
    name: 'Association des fermiers d\'Ottawa',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e',
    events: 52,
  },
]; 