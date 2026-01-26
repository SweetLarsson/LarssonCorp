
export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  items: ServiceItem[];
  color: string;
}

export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
