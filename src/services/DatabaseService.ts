import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event, events, organizers } from '../constants/mockData';

/**
 * Simple database service using AsyncStorage
 */
class DatabaseService {
  private initialized: boolean = false;

  constructor() {
    console.log('Initializing Simple Database Service');
    this.initDatabase();
  }

  /**
   * Initialize the database with mock data
   */
  private async initDatabase() {
    try {

      await AsyncStorage.setItem('events', JSON.stringify(events));
      await AsyncStorage.setItem('organizers', JSON.stringify(organizers));
      console.log('Database initialized with mock data');


      this.initialized = true;
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  /**
   * Get all events
   */
  async getAllEvents(): Promise<Event[]> {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        return JSON.parse(storedEvents);
      }
      // Fallback to mock data if nothing in storage
      return events;
    } catch (error) {
      console.error('Error getting events:', error);
      return events; // Return mock data as fallback
    }
  }

  /**
   * Get event by ID
   */
  async getEventById(id: string): Promise<Event | null> {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents) as Event[];
        const event = parsedEvents.find(e => e.id === id);
        return event || null;
      }
      // Fallback to mock data
      return events.find(e => e.id === id) || null;
    } catch (error) {
      console.error('Error getting event by ID:', error);
      return events.find(e => e.id === id) || null;
    }
  }

  /**
   * Get events by category
   */
  async getEventsByCategory(category: string): Promise<Event[]> {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents) as Event[];
        return parsedEvents.filter(e => e.category === category);
      }
      // Fallback to mock data
      return events.filter(e => e.category === category);
    } catch (error) {
      console.error('Error getting events by category:', error);
      return events.filter(e => e.category === category);
    }
  }

  /**
   * Get all organizers
   */
  async getAllOrganizers(): Promise<any[]> {
    try {
      const storedOrganizers = await AsyncStorage.getItem('organizers');
      if (storedOrganizers) {
        return JSON.parse(storedOrganizers);
      }
      // Fallback to mock data
      return organizers;
    } catch (error) {
      console.error('Error getting organizers:', error);
      return organizers;
    }
  }

  /**
   * Get organizer by ID
   */
  async getOrganizerById(id: string): Promise<any | null> {
    try {
      const storedOrganizers = await AsyncStorage.getItem('organizers');
      if (storedOrganizers) {
        const parsedOrganizers = JSON.parse(storedOrganizers);
        const organizer = parsedOrganizers.find((o: any) => o.id === id);
        return organizer || null;
      }
      // Fallback to mock data
      return organizers.find(o => o.id === id) || null;
    } catch (error) {
      console.error('Error getting organizer by ID:', error);
      return organizers.find(o => o.id === id) || null;
    }
  }
}

// Create a singleton instance
const dbService = new DatabaseService();

export default dbService; 