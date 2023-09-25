export class AddressSuggestion {
    distance?: number;
    highlightedTitle?: string;
    highlightedVicinity?: string;
    lat: number;
    lng: number;
    tag?: string;
    title: string;
    vicinity: string;
    address: Address;
}

export class Address {
    city: string;
    countryCode: string;
    countryName: string;
    county: string;
    district: string;
    label: string;
    postalCode: string;
    state: string;
    stateCode: string;
    street: string;
    houseNumber: string;
}

export class MapView {
    west?: number;
    south?: number;
    east?: number;
    north?: number;
}

export class AddressDisplay {
    title: string = '';
    detail: string = '';
    fullResult?: AddressSuggestion;
}
