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
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  }
  

export interface BookCheckout {
  checkout_id: number;
  title: string;
  user_id: number;
  book_id: number;
  checkout_date: string; 
  return_date: string; 
  returned: boolean;
}