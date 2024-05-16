// interfaces.ts

export interface Books {
    id: number;
    book_id: number;
    title: string;
    author: string;
    published_year: number;
    genre: string;
    available: number;
  }
  
export interface Users {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface BookCheckout {
  checkout_id: number;
  user_id: number;
  book_id: number;
  checkout_date: string; 
  return_date: string; 
  returned: boolean;
}