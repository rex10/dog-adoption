export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
    city:string;
    state:string;
  }
  
  export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
  }
  
  export interface Coordinates {
    lat: number;
    lon: number;
  }
  
  export interface LocationSearchParams {
    city?: string;
    states?: string[];
    geoBoundingBox?: {
      top?: number;
      left?: number;
      bottom?: number;
      right?: number;
      bottom_left?: Coordinates;
      top_right?: Coordinates;
      bottom_right?: Coordinates;
      top_left?: Coordinates;
    };
    size?: number;
    from?: number;
  }
  
  export interface LocationSearchResult {
    results: Location[];
    total: number;
  }
  
  export interface SearchParams {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    sort?: string;
    from?: number;
    size?: number;
  }
  
  export interface Pagination {
    currentPage: number;
    totalItems: number;
    pageSize: number;
  }
  
  export interface ApiError {
    message: string;
    status?: number;
  }