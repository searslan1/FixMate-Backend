export interface Part {
    name: string;
    price: number;
  }
  
  export interface CreateServiceLogInput {
    date: Date;
    mileage: number;
    type: string;
    description: string;
    notes?: string;
    partsUsed: Part[];
  }
  