export interface FAQItem {
  question: string;
  answer: string;
}

export interface PackageItem {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  image: string;
}