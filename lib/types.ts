export interface WeddingConfig {
  meta: { title: string; description: string; ogImage: string };
  theme: { primaryColor: string; goldColor: string; backgroundColor: string };
  couple: {
    bride: CoupleInfo;
    groom: CoupleInfo;
  };
  events: Event[];
  eventsBride?: Event[];
  weddingDate: string;
  weddingDateBride?: string;
  venue: Venue;
  venueBride?: Venue;
  timeline: TimelineItem[];
  timelineBride?: TimelineItem[];
  family: Family;
  gallery: string[];
  gift: Gift;
  contact: Contact;
  rsvp: { enabled: boolean; deadline: string; deadlineMalayalam?: string };
  music: { enabled: boolean; autoPlay: boolean; src: string };
}

export interface CoupleInfo {
  name: string;
  nameMalayalam?: string;
  nameArabic: string;
  description: string;
  descriptionMalayalam?: string;
  photo: string;
}

export interface Event {
  id: string;
  title: string;
  titleMalayalam?: string;
  titleArabic: string;
  date: string;
  dateMalayalam?: string;
  time: string;
  venue: string;
  venueMalayalam?: string;
  address: string;
  addressMalayalam?: string;
  icon: string;
}

export interface Venue {
  name: string;
  nameMalayalam?: string;
  address: string;
  addressMalayalam?: string;
  mapEmbed: string;
  googleMapsUrl: string;
  directionsUrl: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  titleMalayalam?: string;
  titleArabic: string;
  date: string;
  dateMalayalam?: string;
  description: string;
  descriptionMalayalam?: string;
  icon: string;
}

export interface FamilyMember {
  father: string;
  fatherMalayalam?: string;
  mother: string;
  motherMalayalam?: string;
  siblings: string;
  siblingsMalayalam?: string;
}

export interface Family {
  bride: FamilyMember;
  groom: FamilyMember;
}

export interface Gift {
  enabled: boolean;
  message: string;
  messageMalayalam?: string;
  upiId: string;
  upiQR: string;
}

export interface Contact {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}
