export interface Subdistrict {
  name: string;
  name_en?: string;
  zipcode: string;
}

export interface District {
  name: string;
  name_en?: string;
  subdistricts: Subdistrict[];
}

export interface Province {
  name: string;
  name_en?: string;
  districts: District[];
}

export type ResultItem = {
  province: string;
  district: string;
  subdistrict: string;
  zipcode: string;
};
