export interface PropertyFormData {
    address: string;
    unit_number: string;
    property_type: string;
    floor_area: string;
    rent_price: string;
    availability_status: string;
    description: string;
    amenities: string[];
    photos: File[];
    [key: string]: string | string[] | File[];
}
