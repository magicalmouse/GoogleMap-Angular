/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type BraintreeResponse = {
  __typename: "BraintreeResponse";
  status?: string;
  error?: string | null;
  item?: BraintreeItem;
  paymentMethods?: Array<BraintreeItem | null> | null;
};

export type BraintreeItem = {
  __typename: "BraintreeItem";
  UserId?: string | null;
  cardId?: string | null;
  CardNbr?: string | null;
  CustomerId?: string | null;
  PaymentId?: string | null;
  CardType?: string | null;
  active?: boolean | null;
};

export type SignUpResponse = {
  __typename: "SignUpResponse";
  error?: boolean;
  data?: SignUpData;
  messages?: Array<MessageFormat | null> | null;
};

export type SignUpData = {
  __typename: "SignUpData";
  userId?: string | null;
  deviceId?: string | null;
  refreshToken?: string | null;
  sessionToken?: string | null;
  refreshExpire?: number | null;
  sessionExpire?: number | null;
};

export type MessageFormat = {
  __typename: "MessageFormat";
  appMessage?: string | null;
  userMessage?: string | null;
};

export type AccountQuestions = {
  __typename: "AccountQuestions";
  question?: string | null;
  userMessage?: string | null;
}

// response to enterCodeAuthenticate
export type EnterCode = AuthenticateResponse | PasswordRequiredFlag | Errors;

export type AuthenticateResponse = {
  __typename: "AuthenticateResponse";
  // we need tokens since late-signup
  tokens?: Tokens;
  authenticateInfo?: AuthenticateInfo;
};

export type Tokens = {
  __typename: "Tokens";
  refresh?: Token;
  session?: Token;
};

export type Token = {
  __typename: "Token";
  value?: string;
  expire?: string;
};

// part of the data returned in authentication response
export type AuthenticateInfo = SignUpStep | User;

export type SignUpStep = {
  __typename: "SignUpStep";
  unused?: number | null;
};

export type User = {
  __typename: "User";
  userId?: string | null;
  lname?: string | null;
  fname?: string | null;
  email?: string | null;
  phone?: string | null;
  postalCode?: string | null;
  dateActive?: number | null;
  defaultTip?: TipDataResponse;
};

export type TipDataResponse = {
  __typename: "TipDataResponse";
  tipType?: string | null;
  value?: string | null;
};

export type PasswordRequiredFlag = {
  __typename: "PasswordRequiredFlag";
  unused?: boolean | null;
};

export type Errors = {
  __typename: "Errors";
  errorCode?: number;
  messages?: Array<MessageFormat>;
};

// response to enterPasswordAuthenticate
export type EnterPasswordAuthenticate = AuthenticateResponse | Errors;

export type EnterPhoneNbrAuthenticate = AuthenticateResponse | Errors;

export type CheckPromoResponse = {
  __typename: "CheckPromoResponse";
  error?: boolean | null;
  data?: falseData;
  messages?: PromoMessageFormat;
};

export type falseData = {
  __typename: "falseData";
  promoId?: string | null;
};

export type PromoMessageFormat = {
  __typename: "PromoMessageFormat";
  appMessage?: string | null;
  userMessage?: string | null;
};

export type AddPromoResponse = {
  __typename: "AddPromoResponse";
  error?: boolean | null;
  data?: Array<PromoDataResponse | null> | null;
  messages?: PromoMessageFormat;
};

export type PromoDataResponse = {
  __typename: "PromoDataResponse";
  id?: number;
  promo_code?: string | null;
  promo_type?: string | null;
  promo_title?: string | null;
  amount?: PromoAmount;
  promo_short_description?: string | null;
  promo_long_description?: string | null;
  expiry_date?: string | null;
  start_date?: string | null;
  evergreen?: boolean | null;
  status?: boolean | null;
  fleet?: fleetType;
  usage_limit?: limitPayload;
  customers?: Array<string | null> | null;
  isallcustomers?: boolean | null;
  expiry_status?: boolean | null;
  valid_area?: string | null;
};

export type PromoAmount = {
  __typename: "PromoAmount";
  AmtOrPercentage?: string | null;
  amount?: string | null;
  MaxSaving?: string | null;
};

export type fleetType = {
  __typename: "fleetType";
  allfleets?: boolean | null;
  data?: Array<string | null> | null;
};

export type limitPayload = {
  __typename: "limitPayload";
  CoupounLimit?: string | null;
  CouponLimitStatus?: string | null;
};

export type AddCardResponse = {
  __typename: "AddCardResponse";
  uid?: string | null;
  method?: string | null;
  error?: boolean | null;
  data?: CardDataFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type CardDataFormat = {
  __typename: "CardDataFormat";
  error?: boolean | null;
  statusCode?: string | null;
  cards?: Array<CardFormat | null> | null;
};

export type CardFormat = {
  __typename: "CardFormat";
  id?: string | null;
  last_4?: string | null;
  exp_year?: string | null;
  exp_month?: string | null;
  card_brand?: string | null;
  billing_address?: BillingaddressFormat;
  isProfile?: boolean | null;
  email?: string | null;
  profile_type?: string | null;
};

export type BillingaddressFormat = {
  __typename: "BillingaddressFormat";
  postal_code?: string | null;
};

export type DeleteCardResponse = {
  __typename: "DeleteCardResponse";
  uid?: string | null;
  method?: string | null;
  error?: boolean | null;
  data?: DeleteCardDataFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type DeleteCardDataFormat = {
  __typename: "DeleteCardDataFormat";
  error?: boolean | null;
  statusCode?: string | null;
  card_id?: string | null;
};

export type PaymentProfileResponse = {
  __typename: "PaymentProfileResponse";
  uid?: string | null;
  method?: string | null;
  error?: boolean | null;
  data?: ProfileDataFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type ProfileDataFormat = {
  __typename: "ProfileDataFormat";
  error?: boolean | null;
  statusCode?: string | null;
};

export type TipResponse = {
  __typename: "TipResponse";
  error?: boolean;
  data?: TipResponseFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type TipResponseFormat = {
  __typename: "TipResponseFormat";
  error?: string;
  statusCode?: string;
  data?: TipDataObject;
};

export type TipDataObject = {
  __typename: "TipDataObject";
  tipType?: string;
  value?: number;
};

export type ServiceAreaResponse = {
  __typename: "ServiceAreaResponse";
  status?: string | null;
  geometry?: ServiceAreData;
};

export type ServiceAreData = {
  __typename: "ServiceAreData";
  fleet?: string | null;
  zone?: string | null;
  distance?: number | null;
  entity?: string | null;
};

export type InsertTripResponse = {
  __typename: "InsertTripResponse";
  error?: boolean | null;
  data?: InsertTripDataFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type InsertTripDataFormat = {
  __typename: "InsertTripDataFormat";
  error?: string | null;
  errorCode?: string | null;
  zoneId?: string | null;
  tripNbr?: number | null;
  companyPhone?: string | null;
  servicingCompany?: string | null;
  pickup?: string | null;
  destination?: string | null;
  passengerName?: string | null;
  passengerPhone?: string | null;
  callDate?: string | null;
  questions?: Array<string | null> | null;
};

// returned by call to phone number verification
export type VerifyPhone = VerifyPhoneResponse | Errors;

export type VerifyPhoneResponse = {
  __typename: "VerifyPhoneResponse";
  response?: VerifyPhoneDataResponse;
};

// returned by call to phone number verification
export type VerifyPhoneDataResponse =
  | VerifyPhoneAuthenticateData
  | VerifyPhoneSignUpData;

export type VerifyPhoneAuthenticateData = {
  __typename: "VerifyPhoneAuthenticateData";
  // true if deviceID matches on server
  // ##################################################################################################### false otherwise
  codeSkippable?: boolean;
};

export type VerifyPhoneSignUpData = {
  __typename: "VerifyPhoneSignUpData";
  unused?: boolean | null;
  data?: Array<string | null> | null;
};

// response data for entering verification-code, email, and name during sign-up
export type BaseResponse = Success | Errors;

export type Success = {
  __typename: "Success";
  unused?: boolean | null;
};

// returned when password is submitted during sign-up
export type TokenResponse = Tokens | Errors;

// returned by call to accept terms & conditions
export type UserResponse = User | Errors;

export type VehiclesResponse = {
  __typename: "VehiclesResponse";
  error?: boolean;
  data?: VehiclesResponseData;
  messages?: Array<MessageFormat | null> | null;
};

export type VehiclesResponseData = {
  __typename: "VehiclesResponseData";
  eta?: number;
  vehicles?: Array<Vehicle> | null;
};

export type Vehicle = {
  __typename: "Vehicle";
  vehicleId?: string | null;
  lat?: number;
  lng?: number;
  types?: Array<number | null> | null;
  distance?: number | null;
  gpsDirection?: number | null;
};

export type VehicleStatusInput = {
  vehicleId: string;
  driverId?: number | null;
  gpsDirection?: number | null;
  lat?: number | null;
  lng?: number | null;
  locationTimeStamp?: string | null;
  postedStatus?: number | null;
  tripStatus?: string | null;
  currentMeterFare?: number | null;
  currentMeterTotalDist?: number | null;
  meterRate1Set?: number | null;
  meterRate2Set?: number | null;
};

export type FarePriceInput = {
  fare?: number | null;
  miles?: number | null;
  minutes?: number | null;
  promoStatus?: string | null;
  promoId?: number | null;
  promoType?: string | null;
  promoAmount?: number | null;
  promoMaxSaving?: number | null;
  discount?: number | null;
  discountedFare?: number | null;
  processingFee?: number | null;
  displayFare?: string | null;
}

export type VehicleStatus = {
  __typename: "VehicleStatus";
  vehicleId?: string;
  driverId?: number | null;
  gpsDirection?: number | null;
  lat?: number | null;
  lng?: number | null;
  locationTimeStamp?: string | null;
  postedStatus?: number | null;
  tripStatus?: string | null;
  currentMeterFare?: number | null;
  currentMeterTotalDist?: number | null;
  meterRate1Set?: number | null;
  meterRate2Set?: number | null;
};

export type GetLocationForLatLngResponse = {
  __typename: "GetLocationForLatLngResponse";
  status?: string | null;
  address?: LocationsData;
};

export type LocationsData = {
  __typename: "LocationsData";
  Street?: string | null;
  City?: string | null;
  State?: string | null;
  Zip?: string | null;
  Lat?: number | null;
  Lng?: number | null;
};

export type PolyAreaCheckResponse = {
  __typename: "PolyAreaCheckResponse";
  status?: string | null;
  isAirport: boolean;
  poly_name: string;
}

export type CancelRideResponse = {
  __typename: "CancelRideResponse";
  error: boolean;
  messages: String;
}


export type CancelTripDataResponse = {
  __typename: "CancelTripDataResponse";
  error?: boolean;
  data?: CallDriverResponseFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type CallDriverResponseFormat = {
  __typename: "CallDriverResponseFormat";
  error?: string | null;
  errorCode?: string | null;
};

export type Trip = {
  __typename: "Trip";
  tripNbr?: number | null;
  zoneId?: string | null;
  fleetId?: string | null;
  userId?: string | null;
  comment?: string | null;
  pkupDate?: string | null;
  pkupStreet?: string | null;
  pkupApt?: string | null;
  pkupCity?: string | null;
  pkupState?: string | null;
  pkupZip?: string | null;
  pkupLat?: number | null;
  pkupLng?: number | null;
  destStreet?: string | null;
  destApt?: string | null;
  destCity?: string | null;
  destState?: string | null;
  destZip?: string | null;
  destLat?: number | null;
  destLng?: number | null;
  nbrPass?: number | null;
  tripRate?: number | null;
  distance?: number | null;
  timeEstimate?: number | null;
  isNow?: boolean | null;
  couponId?: string | null;
  source?: string | null;
  vehicleType?: string | null;
  pickupTime?: string | null;
  paymentId?: string | null;
  paymentMethod?: string | null;
  tip?: number | null;
  tipType?: string | null;
  tripMinutes?: number | null;
  tripStatus?: MessageFormat;
  status?: string | null;
  statusTime?: string | null;
  vehicleNbr?: number | null;
  driverId?: number | null;
  finalFare?: number | null;
  ratingStatus?: boolean | null;
  tipStatus?: boolean | null;
};

export type TipAddResponse = {
  __typename: "TipAddResponse";
  error?: boolean | null;
  data?: TipAddDataResponse;
  messages?: TipAddDataMessage;
};

export type TipAddDataResponse = {
  __typename: "TipAddDataResponse";
  error?: boolean | null;
  statusCode?: number | null;
};

export type TipAddDataMessage = {
  __typename: "TipAddDataMessage";
  appMessage?: string | null;
  userMessage?: string | null;
};

export type RatingResponse = {
  __typename: "RatingResponse";
  RatingError?: boolean | null;
  tipPaymentError?: boolean | null;
  data?: TipAddDataResponse;
  messages?: TipAddDataMessage;
};

export type FeedbackResponse = {
  __typename: "FeedbackResponse";
  error?: boolean | null;
  data?: TipAddDataResponse;
  messages?: TipAddDataMessage;
};

export type ForgotPasswordRequestDataResponse = {
  __typename: "ForgotPasswordRequestDataResponse";
  error?: boolean;
  data?: ForgotPasswordResponseFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type ForgotPasswordResponseFormat = {
  __typename: "ForgotPasswordResponseFormat";
  error?: string | null;
  errorCode?: string | null;
};

export type DriverInfoResponse = {
  __typename: "DriverInfoResponse";
  error?: boolean | null;
  data?: DriverInfoDataResponse;
  messages?: Array<MessageFormat | null> | null;
};

export type DriverInfoDataResponse = {
  __typename: "DriverInfoDataResponse";
  statusCode?: number | null;
  lname?: string | null;
  fname?: string | null;
  imageUrl?: string | null;
};

export type FleetInfoResponse = {
  __typename: "FleetInfoResponse";
  error?: boolean | null;
  data?: FleetInfoDataResponse;
  messages?: TipAddDataMessage;
};

export type FleetInfoDataResponse = {
  __typename: "FleetInfoDataResponse";
  statusCode?: number | null;
  fleetName?: string | null;
  logo?: string | null;
};

export type addFcmTokenResponse = {
  __typename: "addFcmTokenResponse";
  error?: boolean | null;
  statusCode?: string | null;
  messages?: PromoMessageFormat;
};

export type changeCardResponse = {
  __typename: "changeCardResponse";
  error?: boolean | null;
  statusCode?: number | null;
  data?: string | null;
  messages?: PromoMessageFormat;
};

export type redeemResponse = {
  __typename: "redeemResponse";
  error?: boolean | null;
  data?: string | null;
  messages?: PromoMessageFormat;
};

export type MessageDriverDataResponse = {
  __typename: "MessageDriverDataResponse";
  error?: boolean;
  data?: MessageDriverResponseFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type MessageDriverResponseFormat = {
  __typename: "MessageDriverResponseFormat";
  error?: string | null;
  errorCode?: string | null;
};

export type CallDriverDataResponse = {
  __typename: "CallDriverDataResponse";
  error?: boolean;
  data?: CallDriverResponseFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type RecentLocationDataResponse = {
  __typename: "RecentLocationDataResponse";
  error?: boolean | null;
  data?: LocationsDataResponse;
  messages?: Array<MessageFormat | null> | null;
};

export type LocationsDataResponse = {
  __typename: "LocationsDataResponse";
  locations?: Array<LocationsData | null> | null;
};

export type TotalCardResponse = {
  __typename: "TotalCardResponse";
  error?: boolean | null;
  data?: TotalCardDataFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type TotalCardDataFormat = {
  __typename: "TotalCardDataFormat";
  error?: boolean | null;
  statusCode?: string | null;
  cards?: Array<CardFormat | null> | null;
};

export type AllPromoResponse = {
  __typename: "AllPromoResponse";
  error?: boolean | null;
  data?: Array<PromoDataResponse | null> | null;
  messages?: PromoMessageFormat;
};

export type SelectedPromoResponse = {
  __typename: "SelectedPromoResponse";
  error?: boolean | null;
  data?: PromoDataResponse;
  messages?: PromoMessageFormat;
};

export type TripStatusResponse = {
  __typename: "TripStatusResponse";
  error?: boolean | null;
  data?: TripStatusDataFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type TripStatusDataFormat = {
  __typename: "TripStatusDataFormat";
  error?: boolean | null;
  errorCode?: string | null;
  cabNbr?: number | null;
  fltId?: string | null;
  cabLat?: number | null;
  cabLng?: number | null;
  cabMph?: number | null;
  cabType?: number | null;
  cabDirection?: number | null;
  eta?: string | null;
  driverName?: string | null;
  driverPicUrl?: string | null;
  plateNbr?: string | null;
  isComplete?: boolean | null;
};

export type UserDetailsResponse = {
  __typename: "UserDetailsResponse";
  error?: boolean | null;
  statusCode?: number | null;
  data?: UserDetails;
  msg?: PromoMessageFormat;
};

export type UserDetails = {
  __typename: "UserDetails";
  dateActive?: number | null;
  email?: string | null;
  lname?: string | null;
  fname?: string | null;
  userId?: string | null;
  phone?: string | null;
  postal_code?: string | null;
  defaultTip?: TipDataResponse;
};

export type GetTripFareResponse = {
  __typename: "GetTripFareResponse";
  error?: boolean | null;
  data?: GetTripFareDataFormat;
  messages?: Array<MessageFormat | null> | null;
};

export type GetTripFareDataFormat = {
  __typename: "GetTripFareDataFormat";
  error?: string | null;
  errorCode?: string | null;
  fare?: number | null;
  miles?: number | null;
  minutes?: number | null;
  promoStatus?: string | null;
  promoId?: number | null;
  promoType?: string | null;
  promoAmount?: number | null;
  promoMaxSaving?: number | null;
  discount?: number | null;
  discountedFare?: number | null;
  processingFee?: number | null;
  displayFare?:string | null;
};

export type VehicleTypeResponse = {
  __typename: "VehicleTypeResponse";
  error?: boolean;
  data?: VehicleTypeData;
  messages?: Array<MessageFormat | null> | null;
};

export type VehicleTypeData = {
  __typename: "VehicleTypeData";
  error?: string | null;
  errorCode?: string | null;
  eta?: number | null;
  types?: Array<VehicleType | null> | null;
  vehicles?: Array<Vehicle | null> | null;
};

export type VehicleType = {
  __typename: "VehicleType";
  type?: number;
  eta?: number;
  exist? : number;
};

export type AuthenticationResponse = {
  __typename: "AuthenticationResponse";
  error?: boolean;
  data?: AuthenticationData;
  messages?: Array<MessageFormat | null> | null;
};

export type AuthenticationData = {
  __typename: "AuthenticationData";
  error?: string | null;
  errorCode?: string | null;
  refreshToken?: string | null;
  sessionToken?: string | null;
  refreshExpire?: string | null;
  sessionExpire?: string | null;
};

export type VehicleStatusResponse = Errors | VehicleStatus;

export type RecentUpcomingTripResponse = {
  __typename: "RecentUpcomingTripResponse";
  status?: string | null;
  trips?: Array<Trip | null> | null;
};

export type RideOverviewResponse = {
  __typename: "RideOverviewResponse";
  error?: boolean | null;
  data?: RideOverviewData;
  messages?: Array<MessageFormat | null> | null;
};

export type RideOverviewData = {
  __typename: "RideOverviewData";
  fare?: GetTripFareResponse;
  vehicles?: VehiclesResponse;
};

export type UserTripsResponse = {
  __typename: "UserTripsResponse";
  error?: boolean | null;
  data?: UserTripData;
  messages?: Array<MessageFormat | null> | null;
};

export type UserTripData = {
  __typename: "UserTripData";
  error?: string | null;
  errorCode?: string | null;
  trips?: Array<Trip | null> | null;
};

export type findCabResponse = {
  __typename: "findCabResponse";
  error?: boolean | null;
  data?: string | null;
};

export type VehicleInfoResponse = VehicleInfoData | Errors;

export type VehicleInfoData = {
  __typename: "VehicleInfoData";
  vehicleNbr?: number | null;
  fleetId?: string | null;
  make?: string | null;
  model?: string | null;
  plate?: string | null;
};

export type DriverVehicleResponse = {
  __typename: "DriverVehicleResponse";
  driver?: DriverInfoResponse;
  vehicle?: VehicleInfoResponse;
};

export type EtaResponse = EtaData | Errors;

export type EtaData = {
  __typename: "EtaData";
  vehicleMinutes?: number | null;
  rideMinutes?: number | null;
};

export type FleetPartnersResponse = FleetList | Errors;

export type FleetList = {
  __typename: "FleetList";
  fleets?: Array<Fleet | null> | null;
};

export type Fleet = {
  __typename: "Fleet";
  zoneId?: string | null;
  fleetId?: string | null;
  name?: string | null;
  description?: string | null;
  fleetImageUrl?: string | null;
};

export type BraintreePayMutation = {
  __typename: "BraintreeResponse";
  status: string;
  error?: string | null;
  item?: {
    __typename: "BraintreeItem";
    UserId?: string | null;
    cardId?: string | null;
    CardNbr?: string | null;
    CustomerId?: string | null;
    PaymentId?: string | null;
    CardType?: string | null;
    active?: boolean | null;
  } | null;
  paymentMethods?: Array<{
    __typename: "BraintreeItem";
    UserId?: string | null;
    cardId?: string | null;
    CardNbr?: string | null;
    CustomerId?: string | null;
    PaymentId?: string | null;
    CardType?: string | null;
    active?: boolean | null;
  } | null> | null;
};

export type CompleteSignUpMutation = {
  __typename: "SignUpResponse";
  error: boolean;
  data?: {
    __typename: "SignUpData";
    userId?: string | null;
    deviceId?: string | null;
    refreshToken?: string | null;
    sessionToken?: string | null;
    refreshExpire?: number | null;
    sessionExpire?: number | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type EnterCodeAuthenticateMutation = {
  __typename: "AuthenticateResponse" | "PasswordRequiredFlag" | "Errors";
};

export type EnterPasswordAuthenticateMutation = {
  __typename: "AuthenticateResponse" | "Errors";
};

export type EnterPhoneNbrAuthenticateMutation = {
  __typename: "AuthenticateResponse" | "Errors";
};

export type CheckPromoMutation = {
  __typename: "CheckPromoResponse";
  error?: boolean | null;
  data?: {
    __typename: "falseData";
    promoId?: string | null;
  } | null;
  messages?: {
    __typename: "PromoMessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type AddPromoMutation = {
  __typename: "AddPromoResponse";
  error?: boolean | null;
  data?: Array<{
    __typename: "PromoDataResponse";
    id: number;
    promo_code?: string | null;
    promo_type?: string | null;
    promo_title?: string | null;
    amount?: {
      __typename: "PromoAmount";
      AmtOrPercentage?: string | null;
      amount?: string | null;
      MaxSaving?: string | null;
    } | null;
    promo_short_description?: string | null;
    promo_long_description?: string | null;
    expiry_date?: string | null;
    start_date?: string | null;
    evergreen?: boolean | null;
    status?: boolean | null;
    fleet?: {
      __typename: "fleetType";
      allfleets?: boolean | null;
      data?: Array<string | null> | null;
    } | null;
    usage_limit?: {
      __typename: "limitPayload";
      CoupounLimit?: string | null;
      CouponLimitStatus?: string | null;
    } | null;
    customers?: Array<string | null> | null;
    isallcustomers?: boolean | null;
    expiry_status?: boolean | null;
    valid_area?: string | null;
  } | null> | null;
  messages?: {
    __typename: "PromoMessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type PaymentAddCustomerCardMutation = {
  __typename: "AddCardResponse";
  uid?: string | null;
  method?: string | null;
  error?: boolean | null;
  data?: {
    __typename: "CardDataFormat";
    error?: boolean | null;
    statusCode?: string | null;
    cards?: Array<{
      __typename: "CardFormat";
      id?: string | null;
      last_4?: string | null;
      exp_year?: string | null;
      exp_month?: string | null;
      card_brand?: string | null;
      billing_address?: {
        __typename: "BillingaddressFormat";
        postal_code?: string | null;
      } | null;
      isProfile?: boolean | null;
      email?: string | null;
      profile_type?: string | null;
    } | null> | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type PaymentDeleteCustomerCardMutation = {
  __typename: "DeleteCardResponse";
  uid?: string | null;
  method?: string | null;
  error?: boolean | null;
  data?: {
    __typename: "DeleteCardDataFormat";
    error?: boolean | null;
    statusCode?: string | null;
    card_id?: string | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type PaymentAddProfileMutation = {
  __typename: "PaymentProfileResponse";
  uid?: string | null;
  method?: string | null;
  error?: boolean | null;
  data?: {
    __typename: "ProfileDataFormat";
    error?: boolean | null;
    statusCode?: string | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type SetDefaultTipMutation = {
  __typename: "TipResponse";
  error: boolean;
  data: {
    __typename: "TipResponseFormat";
    error: string;
    statusCode: string;
    data?: {
      __typename: "TipDataObject";
      tipType: string;
      value: number;
    } | null;
  };
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type ServiceAreaCheckMutation = {
  __typename: "ServiceAreaResponse";
  status?: string | null;
  geometry?: {
    __typename: "ServiceAreData";
    fleet?: string | null;
    zone?: string | null;
    distance?: number | null;
    entity?: string | null;
  } | null;
};

export type InsertTripMutation = {
  __typename: "InsertTripResponse";
  error?: boolean | null;
  data?: {
    __typename: "InsertTripDataFormat";
    error?: string | null;
    errorCode?: string | null;
    zoneId?: string | null;
    tripNbr?: number | null;
    companyPhone?: string | null;
    servicingCompany?: string | null;
    pickup?: string | null;
    destination?: string | null;
    passengerName?: string | null;
    questions?: Array<string | null> | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type VerifyPhoneMutation = {
  __typename: "VerifyPhoneResponse" | "Errors";
};

export type EnterCodeEarlySignUpMutation = {
  __typename: "Success" | "Errors";
};

export type EnterEmailMutation = {
  __typename: "Success" | "Errors";
};

export type EnterPasswordEarlySignupMutation = {
  __typename: "Tokens" | "Errors";
};

export type EnterNameMutation = {
  __typename: "Success" | "Errors";
};

export type AcceptTermsMutation = {
  __typename: "User" | "Errors";
};

export type GetVehiclesMutation = {
  __typename: "VehiclesResponse";
  error: boolean;
  data?: {
    __typename: "VehiclesResponseData";
    eta: number;
    vehicles?: Array<{
      __typename: "Vehicle";
      vehicleId?: string | null;
      lat: number;
      lng: number;
      types?: Array<number | null> | null;
      distance?: number | null;
      gpsDirection?: number | null;
    }> | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type UpdateVehicleStatusMutation = {
  __typename: "VehicleStatus";
  vehicleId: string;
  driverId?: number | null;
  gpsDirection?: number | null;
  lat?: number | null;
  lng?: number | null;
  locationTimeStamp?: string | null;
  postedStatus?: number | null;
  tripStatus?: string | null;
  currentMeterFare?: number | null;
  currentMeterTotalDist?: number | null;
  meterRate1Set?: number | null;
  meterRate2Set?: number | null;
};

export type GetLocationForLatLngMutation = {
  __typename: "GetLocationForLatLngResponse";
  status?: string | null;
  address?: {
    __typename: "LocationsData";
    Street?: string | null;
    City?: string | null;
    State?: string | null;
    Zip?: string | null;
    Lat?: number | null;
    Lng?: number | null;
  } | null;
};



export type CancelTripMutation = {
  __typename: "CancelTripDataResponse";
  error: boolean;
  data: {
    __typename: "CallDriverResponseFormat";
    error?: string | null;
    errorCode?: string | null;
  };
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type UpdateTripStatusMutation = {
  __typename: "Trip";
  tripNbr?: number | null;
  zoneId?: string | null;
  fleetId?: string | null;
  userId?: string | null;
  comment?: string | null;
  pkupDate?: string | null;
  pkupStreet?: string | null;
  pkupApt?: string | null;
  pkupCity?: string | null;
  pkupState?: string | null;
  pkupZip?: string | null;
  pkupLat?: number | null;
  pkupLng?: number | null;
  destStreet?: string | null;
  destApt?: string | null;
  destCity?: string | null;
  destState?: string | null;
  destZip?: string | null;
  destLat?: number | null;
  destLng?: number | null;
  nbrPass?: number | null;
  tripRate?: number | null;
  distance?: number | null;
  timeEstimate?: number | null;
  isNow?: boolean | null;
  couponId?: string | null;
  source?: string | null;
  vehicleType?: string | null;
  pickupTime?: string | null;
  paymentId?: string | null;
  paymentMethod?: string | null;
  tip?: number | null;
  tipType?: string | null;
  tripMinutes?: number | null;
  tripStatus?: {
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
  status?: string | null;
  statusTime?: string | null;
  vehicleNbr?: number | null;
  driverId?: number | null;
  finalFare?: number | null;
  ratingStatus?: boolean | null;
  tipStatus?: boolean | null;
};

export type SignInPasswordMutation = {
  __typename: "Tokens" | "Errors";
};

export type AddTipMutation = {
  __typename: "TipAddResponse";
  error?: boolean | null;
  data?: {
    __typename: "TipAddDataResponse";
    error?: boolean | null;
    statusCode?: number | null;
  } | null;
  messages?: {
    __typename: "TipAddDataMessage";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type AddRatingAndChargeTipMutation = {
  __typename: "RatingResponse";
  RatingError?: boolean | null;
  tipPaymentError?: boolean | null;
  data?: {
    __typename: "TipAddDataResponse";
    error?: boolean | null;
    statusCode?: number | null;
  } | null;
  messages?: {
    __typename: "TipAddDataMessage";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type AddFeedbackMutation = {
  __typename: "FeedbackResponse";
  error?: boolean | null;
  data?: {
    __typename: "TipAddDataResponse";
    error?: boolean | null;
    statusCode?: number | null;
  } | null;
  messages?: {
    __typename: "TipAddDataMessage";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type ForgotPasswordRequestMutation = {
  __typename: "ForgotPasswordRequestDataResponse";
  error: boolean;
  data: {
    __typename: "ForgotPasswordResponseFormat";
    error?: string | null;
    errorCode?: string | null;
  };
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type DriverInfoMutation = {
  __typename: "DriverInfoResponse";
  error?: boolean | null;
  data?: {
    __typename: "DriverInfoDataResponse";
    statusCode?: number | null;
    lname?: string | null;
    fname?: string | null;
    imageUrl?: string | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type FleetInfoMutation = {
  __typename: "FleetInfoResponse";
  error?: boolean | null;
  data?: {
    __typename: "FleetInfoDataResponse";
    statusCode?: number | null;
    fleetName?: string | null;
    logo?: string | null;
  } | null;
  messages?: {
    __typename: "TipAddDataMessage";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type AddFcmTokenMutation = {
  __typename: "addFcmTokenResponse";
  error?: boolean | null;
  statusCode?: string | null;
  messages?: {
    __typename: "PromoMessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type ChangeCardMutation = {
  __typename: "changeCardResponse";
  error?: boolean | null;
  statusCode?: number | null;
  data?: string | null;
  messages?: {
    __typename: "PromoMessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type RedeemPromoMutation = {
  __typename: "redeemResponse";
  error?: boolean | null;
  data?: string | null;
  messages?: {
    __typename: "PromoMessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type MessageDriverQuery = {
  __typename: "MessageDriverDataResponse";
  error: boolean;
  data: {
    __typename: "MessageDriverResponseFormat";
    error?: string | null;
    errorCode?: string | null;
  };
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type PolyAreaCheckQuery = {
  __typename: "PolyAreaCheckResponse";
  isAirport: boolean;
  poly_name: string;
}

export type CancelRideQuery = {
  __typename: "CancelRideResponse";
  error : boolean;
  messages: String;
}

export type CallDriverQuery = {
  __typename: "CallDriverDataResponse";
  error: boolean;
  data: {
    __typename: "CallDriverResponseFormat";
    error?: string | null;
    errorCode?: string | null;
  };
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type GetAllRecentLocationsQuery = {
  __typename: "RecentLocationDataResponse";
  error?: boolean | null;
  data?: {
    __typename: "LocationsDataResponse";
    locations?: Array<{
      __typename: "LocationsData";
      Street?: string | null;
      City?: string | null;
      State?: string | null;
      Zip?: string | null;
      Lat?: number | null;
      Lng?: number | null;
    } | null> | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type GetAllCustomerCardQuery = {
  __typename: "TotalCardResponse";
  error?: boolean | null;
  data?: {
    __typename: "TotalCardDataFormat";
    error?: boolean | null;
    statusCode?: string | null;
    cards?: Array<{
      __typename: "CardFormat";
      id?: string | null;
      last_4?: string | null;
      exp_year?: string | null;
      exp_month?: string | null;
      card_brand?: string | null;
      billing_address?: {
        __typename: "BillingaddressFormat";
        postal_code?: string | null;
      } | null;
      isProfile?: boolean | null;
      email?: string | null;
      profile_type?: string | null;
    } | null> | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type GetAllPromoQuery = {
  __typename: "AllPromoResponse";
  error?: boolean | null;
  data?: Array<{
    __typename: "PromoDataResponse";
    id: number;
    promo_code?: string | null;
    promo_type?: string | null;
    promo_title?: string | null;
    amount?: {
      __typename: "PromoAmount";
      AmtOrPercentage?: string | null;
      amount?: string | null;
      MaxSaving?: string | null;
    } | null;
    promo_short_description?: string | null;
    promo_long_description?: string | null;
    expiry_date?: string | null;
    start_date?: string | null;
    evergreen?: boolean | null;
    status?: boolean | null;
    fleet?: {
      __typename: "fleetType";
      allfleets?: boolean | null;
      data?: Array<string | null> | null;
    } | null;
    usage_limit?: {
      __typename: "limitPayload";
      CoupounLimit?: string | null;
      CouponLimitStatus?: string | null;
    } | null;
    customers?: Array<string | null> | null;
    isallcustomers?: boolean | null;
    expiry_status?: boolean | null;
    valid_area?: string | null;
  } | null> | null;
  messages?: {
    __typename: "PromoMessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type GetSelectedPromoQuery = {
  __typename: "SelectedPromoResponse";
  error?: boolean | null;
  data?: {
    __typename: "PromoDataResponse";
    id: number;
    promo_code?: string | null;
    promo_type?: string | null;
    promo_title?: string | null;
    amount?: {
      __typename: "PromoAmount";
      AmtOrPercentage?: string | null;
      amount?: string | null;
      MaxSaving?: string | null;
    } | null;
    promo_short_description?: string | null;
    promo_long_description?: string | null;
    expiry_date?: string | null;
    start_date?: string | null;
    evergreen?: boolean | null;
    status?: boolean | null;
    fleet?: {
      __typename: "fleetType";
      allfleets?: boolean | null;
      data?: Array<string | null> | null;
    } | null;
    usage_limit?: {
      __typename: "limitPayload";
      CoupounLimit?: string | null;
      CouponLimitStatus?: string | null;
    } | null;
    customers?: Array<string | null> | null;
    isallcustomers?: boolean | null;
    expiry_status?: boolean | null;
    valid_area?: string | null;
  } | null;
  messages?: {
    __typename: "PromoMessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type GetPromoDetailQuery = {
  __typename: "AllPromoResponse";
  error?: boolean | null;
  data?: Array<{
    __typename: "PromoDataResponse";
    id: number;
    promo_code?: string | null;
    promo_type?: string | null;
    promo_title?: string | null;
    amount?: {
      __typename: "PromoAmount";
      AmtOrPercentage?: string | null;
      amount?: string | null;
      MaxSaving?: string | null;
    } | null;
    promo_short_description?: string | null;
    promo_long_description?: string | null;
    expiry_date?: string | null;
    start_date?: string | null;
    evergreen?: boolean | null;
    status?: boolean | null;
    fleet?: {
      __typename: "fleetType";
      allfleets?: boolean | null;
      data?: Array<string | null> | null;
    } | null;
    usage_limit?: {
      __typename: "limitPayload";
      CoupounLimit?: string | null;
      CouponLimitStatus?: string | null;
    } | null;
    customers?: Array<string | null> | null;
    isallcustomers?: boolean | null;
    expiry_status?: boolean | null;
    valid_area?: string | null;
  } | null> | null;
  messages?: {
    __typename: "PromoMessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type GetDefaultTipQuery = {
  __typename: "TipResponse";
  error: boolean;
  data: {
    __typename: "TipResponseFormat";
    error: string;
    statusCode: string;
    data?: {
      __typename: "TipDataObject";
      tipType: string;
      value: number;
    } | null;
  };
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type GetTripStatusQuery = {
  __typename: "TripStatusResponse";
  error?: boolean | null;
  data?: {
    __typename: "TripStatusDataFormat";
    error?: boolean | null;
    errorCode?: string | null;
    cabNbr?: number | null;
    fltId?: string | null;
    cabLat?: number | null;
    cabLng?: number | null;
    cabMph?: number | null;
    cabType?: number | null;
    cabDirection?: number | null;
    eta?: string | null;
    driverName?: string | null;
    driverPicUrl?: string | null;
    plateNbr?: string | null;
    isComplete?: boolean | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type GetUserDetailsQuery = {
  __typename: "UserDetailsResponse";
  error?: boolean | null;
  statusCode?: number | null;
  data?: {
    __typename: "UserDetails";
    dateActive?: number | null;
    email?: string | null;
    lname?: string | null;
    fname?: string | null;
    userId?: string | null;
    phone?: string | null;
    postal_code?: string | null;
    defaultTip?: {
      __typename: "TipDataResponse";
      tipType?: string | null;
      value?: string | null;
    } | null;
  } | null;
  msg?: {
    __typename: "PromoMessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
};

export type GetFarePriceQuery = {
  __typename: "GetTripFareResponse";
  error?: boolean | null;
  data?: {
    __typename: "GetTripFareDataFormat";
    error?: string | null;
    errorCode?: string | null;
    fare?: number | null;
    miles?: number | null;
    minutes?: number | null;
    promoStatus?: string | null;
    promoId?: number | null;
    promoType?: string | null;
    promoAmount?: number | null;
    promoMaxSaving?: number | null;
    discount?: number | null;
    discountedFare?: number | null;
    processingFee?: number | null;
    displayFare?: string | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type GetTypesQuery = {
  __typename: "VehicleTypeResponse";
  error: boolean;
  data?: {
    __typename: "VehicleTypeData";
    error?: string | null;
    errorCode?: string | null;
    eta?: number | null;
    types?: Array<{
      __typename: "VehicleType";
      type: number;
      eta: number;
      exist: number;
    } | null> | null;
    vehicles?: Array<{
      __typename: "Vehicle";
      vehicleId?: string | null;
      lat: number;
      lng: number;
      types?: Array<number | null> | null;
      distance?: number | null;
      gpsDirection?: number | null;
    } | null> | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type AuthenticateQuery = {
  __typename: "AuthenticationResponse";
  error: boolean;
  data?: {
    __typename: "AuthenticationData";
    error?: string | null;
    errorCode?: string | null;
    refreshToken?: string | null;
    sessionToken?: string | null;
    refreshExpire?: string | null;
    sessionExpire?: string | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type GetVehicleStatusQuery = {
  __typename: "Errors" | "VehicleStatus";
};

export type GetRecentUpcomingTripsQuery = {
  __typename: "RecentUpcomingTripResponse";
  status?: string | null;
  trips?: Array<{
    __typename: "Trip";
    tripNbr?: number | null;
    zoneId?: string | null;
    fleetId?: string | null;
    userId?: string | null;
    comment?: string | null;
    pkupDate?: string | null;
    pkupStreet?: string | null;
    pkupApt?: string | null;
    pkupCity?: string | null;
    pkupState?: string | null;
    pkupZip?: string | null;
    pkupLat?: number | null;
    pkupLng?: number | null;
    destStreet?: string | null;
    destApt?: string | null;
    destCity?: string | null;
    destState?: string | null;
    destZip?: string | null;
    destLat?: number | null;
    destLng?: number | null;
    nbrPass?: number | null;
    tripRate?: number | null;
    distance?: number | null;
    timeEstimate?: number | null;
    isNow?: boolean | null;
    couponId?: string | null;
    source?: string | null;
    vehicleType?: string | null;
    pickupTime?: string | null;
    paymentId?: string | null;
    paymentMethod?: string | null;
    tip?: number | null;
    tipType?: string | null;
    tripMinutes?: number | null;
    tripStatus?: {
      __typename: "MessageFormat";
      appMessage?: string | null;
      userMessage?: string | null;
    } | null;
    status?: string | null;
    statusTime?: string | null;
    vehicleNbr?: number | null;
    driverId?: number | null;
    finalFare?: number | null;
    ratingStatus?: boolean | null;
    tipStatus?: boolean | null;
  } | null> | null;
};

export type GetRideOverviewDataQuery = {
  __typename: "RideOverviewResponse";
  error?: boolean | null;
  data?: {
    __typename: "RideOverviewData";
    fare?: {
      __typename: "GetTripFareResponse";
      error?: boolean | null;
      data?: {
        __typename: "GetTripFareDataFormat";
        error?: string | null;
        errorCode?: string | null;
        fare?: number | null;
        miles?: number | null;
        minutes?: number | null;
        promoStatus?: string | null;
        promoId?: number | null;
        promoType?: string | null;
        promoAmount?: number | null;
        promoMaxSaving?: number | null;
        discount?: number | null;
        discountedFare?: number | null;
        processingFee?: number | null;
        displayFare? :string | null;
      } | null;
      messages?: Array<{
        __typename: "MessageFormat";
        appMessage?: string | null;
        userMessage?: string | null;
      } | null> | null;
    } | null;
    vehicles?: {
      __typename: "VehiclesResponse";
      error: boolean;
      data?: {
        __typename: "VehiclesResponseData";
        eta: number;
        vehicles?: Array<{
          __typename: "Vehicle";
          vehicleId?: string | null;
          lat: number;
          lng: number;
          types?: Array<number | null> | null;
          distance?: number | null;
          gpsDirection?: number | null;
        }> | null;
      } | null;
      messages?: Array<{
        __typename: "MessageFormat";
        appMessage?: string | null;
        userMessage?: string | null;
      } | null> | null;
    } | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type GetUserTripsQuery = {
  __typename: "UserTripsResponse";
  error?: boolean | null;
  data?: {
    __typename: "UserTripData";
    error?: string | null;
    errorCode?: string | null;
    trips?: Array<{
      __typename: "Trip";
      tripNbr?: number | null;
      zoneId?: string | null;
      fleetId?: string | null;
      userId?: string | null;
      comment?: string | null;
      pkupDate?: string | null;
      pkupStreet?: string | null;
      pkupApt?: string | null;
      pkupCity?: string | null;
      pkupState?: string | null;
      pkupZip?: string | null;
      pkupLat?: number | null;
      pkupLng?: number | null;
      destStreet?: string | null;
      destApt?: string | null;
      destCity?: string | null;
      destState?: string | null;
      destZip?: string | null;
      destLat?: number | null;
      destLng?: number | null;
      nbrPass?: number | null;
      tripRate?: number | null;
      distance?: number | null;
      timeEstimate?: number | null;
      isNow?: boolean | null;
      couponId?: string | null;
      source?: string | null;
      vehicleType?: string | null;
      pickupTime?: string | null;
      paymentId?: string | null;
      paymentMethod?: string | null;
      tip?: number | null;
      tipType?: string | null;
      tripMinutes?: number | null;
      tripStatus?: {
        __typename: "MessageFormat";
        appMessage?: string | null;
        userMessage?: string | null;
      } | null;
      status?: string | null;
      statusTime?: string | null;
      vehicleNbr?: number | null;
      driverId?: number | null;
      finalFare?: number | null;
      ratingStatus?: boolean | null;
      tipStatus?: boolean | null;
    } | null> | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type FindCabsUsingHashQuery = {
  __typename: "findCabResponse";
  error?: boolean | null;
  data?: string | null;
};

export type VehicleInfoQuery = {
  __typename: "VehicleInfoData" | "Errors";
};

export type DriverVehicleInfoQuery = {
  __typename: "DriverVehicleResponse";
  driver?: {
    __typename: "DriverInfoResponse";
    error?: boolean | null;
    data?: {
      __typename: "DriverInfoDataResponse";
      statusCode?: number | null;
      lname?: string | null;
      fname?: string | null;
      imageUrl?: string | null;
    } | null;
    messages?: Array<{
      __typename: "MessageFormat";
      appMessage?: string | null;
      userMessage?: string | null;
    } | null> | null;
  } | null;
  vehicle:
    | (
        | {
            __typename: "VehicleInfoData";
            vehicleNbr?: number | null;
            fleetId?: string | null;
            make?: string | null;
            model?: string | null;
            plate?: string | null;
          }
        | {
            __typename: "Errors";
            errorCode: number;
            messages: Array<{
              __typename: string;
              appMessage?: string | null;
              userMessage?: string | null;
            }>;
          }
      )
    | null;
};

export type GetEtasQuery = {
  __typename: "EtaData" | "Errors";
};

export type GetFleetPartnersQuery = {
  __typename: "FleetList" | "Errors";
};

export type OnDeleteCardSubscription = {
  __typename: "DeleteCardResponse";
  uid?: string | null;
  method?: string | null;
  error?: boolean | null;
  data?: {
    __typename: "DeleteCardDataFormat";
    error?: boolean | null;
    statusCode?: string | null;
    card_id?: string | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type OnPaymentAddSubscription = {
  __typename: "AddCardResponse";
  uid?: string | null;
  method?: string | null;
  error?: boolean | null;
  data?: {
    __typename: "CardDataFormat";
    error?: boolean | null;
    statusCode?: string | null;
    cards?: Array<{
      __typename: "CardFormat";
      id?: string | null;
      last_4?: string | null;
      exp_year?: string | null;
      exp_month?: string | null;
      card_brand?: string | null;
      billing_address?: {
        __typename: "BillingaddressFormat";
        postal_code?: string | null;
      } | null;
      isProfile?: boolean | null;
      email?: string | null;
      profile_type?: string | null;
    } | null> | null;
  } | null;
  messages?: Array<{
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null> | null;
};

export type OnUpdateVehicleStatusSubscription = {
  __typename: "VehicleStatus";
  vehicleId: string;
  driverId?: number | null;
  gpsDirection?: number | null;
  lat?: number | null;
  lng?: number | null;
  locationTimeStamp?: string | null;
  postedStatus?: number | null;
  tripStatus?: string | null;
  currentMeterFare?: number | null;
  currentMeterTotalDist?: number | null;
  meterRate1Set?: number | null;
  meterRate2Set?: number | null;
};

export type OnUpdateTripStatusSubscription = {
  __typename: "Trip";
  tripNbr?: number | null;
  zoneId?: string | null;
  fleetId?: string | null;
  userId?: string | null;
  comment?: string | null;
  pkupDate?: string | null;
  pkupStreet?: string | null;
  pkupApt?: string | null;
  pkupCity?: string | null;
  pkupState?: string | null;
  pkupZip?: string | null;
  pkupLat?: number | null;
  pkupLng?: number | null;
  destStreet?: string | null;
  destApt?: string | null;
  destCity?: string | null;
  destState?: string | null;
  destZip?: string | null;
  destLat?: number | null;
  destLng?: number | null;
  nbrPass?: number | null;
  tripRate?: number | null;
  distance?: number | null;
  timeEstimate?: number | null;
  isNow?: boolean | null;
  couponId?: string | null;
  source?: string | null;
  vehicleType?: string | null;
  pickupTime?: string | null;
  paymentId?: string | null;
  paymentMethod?: string | null;
  tip?: number | null;
  tipType?: string | null;
  tripMinutes?: number | null;
  tripStatus?: {
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
  status?: string | null;
  statusTime?: string | null;
  vehicleNbr?: number | null;
  driverId?: number | null;
  finalFare?: number | null;
  ratingStatus?: boolean | null;
  tipStatus?: boolean | null;
};

export type OnUpdateUserTripSubscription = {
  __typename: "Trip";
  tripNbr?: number | null;
  zoneId?: string | null;
  fleetId?: string | null;
  userId?: string | null;
  comment?: string | null;
  pkupDate?: string | null;
  pkupStreet?: string | null;
  pkupApt?: string | null;
  pkupCity?: string | null;
  pkupState?: string | null;
  pkupZip?: string | null;
  pkupLat?: number | null;
  pkupLng?: number | null;
  destStreet?: string | null;
  destApt?: string | null;
  destCity?: string | null;
  destState?: string | null;
  destZip?: string | null;
  destLat?: number | null;
  destLng?: number | null;
  nbrPass?: number | null;
  tripRate?: number | null;
  distance?: number | null;
  timeEstimate?: number | null;
  isNow?: boolean | null;
  couponId?: string | null;
  source?: string | null;
  vehicleType?: string | null;
  pickupTime?: string | null;
  paymentId?: string | null;
  paymentMethod?: string | null;
  tip?: number | null;
  tipType?: string | null;
  tripMinutes?: number | null;
  tripStatus?: {
    __typename: "MessageFormat";
    appMessage?: string | null;
    userMessage?: string | null;
  } | null;
  status?: string | null;
  statusTime?: string | null;
  vehicleNbr?: number | null;
  driverId?: number | null;
  finalFare?: number | null;
  ratingStatus?: boolean | null;
  tipStatus?: boolean | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async BraintreePay(
    server: string,
    context: string,
    userId: string,
    cardId?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    email?: string,
    customerId?: string,
    paymentNonce?: string,
    deviceData?: string,
    zipCode?: string
  ): Promise<BraintreePayMutation> {
    const statement = `mutation BraintreePay($server: String!, $context: String!, $userId: String!, $cardId: String, $firstName: String, $lastName: String, $phone: String, $email: String, $customerId: String, $paymentNonce: String, $deviceData: String, $zipCode: String) {
        braintreePay(server: $server, context: $context, userId: $userId, cardId: $cardId, firstName: $firstName, lastName: $lastName, phone: $phone, email: $email, customerId: $customerId, paymentNonce: $paymentNonce, deviceData: $deviceData, zipCode: $zipCode) {
          __typename
          status
          error
          item {
            __typename
            UserId
            cardId
            CardNbr
            CustomerId
            PaymentId
            CardType
            active
          }
          paymentMethods {
            __typename
            UserId
            cardId
            CardNbr
            CustomerId
            PaymentId
            CardType
            active
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      server,
      context,
      userId
    };
    if (cardId) {
      gqlAPIServiceArguments.cardId = cardId;
    }
    if (firstName) {
      gqlAPIServiceArguments.firstName = firstName;
    }
    if (lastName) {
      gqlAPIServiceArguments.lastName = lastName;
    }
    if (phone) {
      gqlAPIServiceArguments.phone = phone;
    }
    if (email) {
      gqlAPIServiceArguments.email = email;
    }
    if (customerId) {
      gqlAPIServiceArguments.customerId = customerId;
    }
    if (paymentNonce) {
      gqlAPIServiceArguments.paymentNonce = paymentNonce;
    }
    if (deviceData) {
      gqlAPIServiceArguments.deviceData = deviceData;
    }
    if (zipCode) {
      gqlAPIServiceArguments.zipCode = zipCode;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <BraintreePayMutation>response.data.braintreePay;
  }
  async CompleteSignUp(
    phone: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    acceptTerms?: boolean
  ): Promise<CompleteSignUpMutation> {
    const statement = `mutation CompleteSignUp($phone: String!, $firstName: String, $lastName: String, $email: String, $password: String, $acceptTerms: Boolean) {
        completeSignUp(phone: $phone, firstName: $firstName, lastName: $lastName, email: $email, password: $password, acceptTerms: $acceptTerms) {
          __typename
          error
          data {
            __typename
            userId
            deviceId
            refreshToken
            sessionToken
            refreshExpire
            sessionExpire
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      phone
    };
    if (firstName) {
      gqlAPIServiceArguments.firstName = firstName;
    }
    if (lastName) {
      gqlAPIServiceArguments.lastName = lastName;
    }
    if (email) {
      gqlAPIServiceArguments.email = email;
    }
    if (password) {
      gqlAPIServiceArguments.password = password;
    }
    if (acceptTerms) {
      gqlAPIServiceArguments.acceptTerms = acceptTerms;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CompleteSignUpMutation>response.data.completeSignUp;
  }
  async EnterCodeAuthenticate(
    code: string,
    deviceID: string
  ): Promise<EnterCodeAuthenticateMutation> {
    const statement = `mutation EnterCodeAuthenticate($code: String!, $deviceID: String!) {
        enterCodeAuthenticate(code: $code, deviceID: $deviceID) {
          __typename
          ... on AuthenticateResponse {
            tokens {
              __typename
              refresh {
                __typename
                value
                expire
              }
              session {
                __typename
                value
                expire
              }
            }
            authenticateInfo {
              __typename
              ... on SignUpStep {
                unused
              }
              ... on User {
                userId
                lname
                fname
                email
                phone
                postalCode
                dateActive
                defaultTip {
                  __typename
                  tipType
                  value
                }
              }
            }
          }
          ... on PasswordRequiredFlag {
            unused
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      code,
      deviceID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <EnterCodeAuthenticateMutation>response.data.enterCodeAuthenticate;
  }
  async EnterPasswordAuthenticate(
    password: string,
    deviceID: string
  ): Promise<EnterPasswordAuthenticateMutation> {
    const statement = `mutation EnterPasswordAuthenticate($password: String!, $deviceID: String!) {
        enterPasswordAuthenticate(password: $password, deviceID: $deviceID) {
          __typename
          ... on AuthenticateResponse {
            tokens {
              __typename
              refresh {
                __typename
                value
                expire
              }
              session {
                __typename
                value
                expire
              }
            }
            authenticateInfo {
              __typename
              ... on SignUpStep {
                unused
              }
              ... on User {
                userId
                lname
                fname
                email
                phone
                postalCode
                dateActive
                defaultTip {
                  __typename
                  tipType
                  value
                }
              }
            }
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      password,
      deviceID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <EnterPasswordAuthenticateMutation>(
      response.data.enterPasswordAuthenticate
    );
  }
  async EnterPhoneNbrAuthenticate(
    phone: string,
    deviceID: string
  ): Promise<EnterPhoneNbrAuthenticateMutation> {
    const statement = `mutation EnterPhoneNbrAuthenticate($phone: String!, $deviceID: String!) {
        enterPhoneNbrAuthenticate(phone: $phone, deviceID: $deviceID) {
          __typename
          ... on AuthenticateResponse {
            tokens {
              __typename
              refresh {
                __typename
                value
                expire
              }
              session {
                __typename
                value
                expire
              }
            }
            authenticateInfo {
              __typename
              ... on SignUpStep {
                unused
              }
              ... on User {
                userId
                lname
                fname
                email
                phone
                postalCode
                dateActive
                defaultTip {
                  __typename
                  tipType
                  value
                }
              }
            }
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      phone,
      deviceID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <EnterPhoneNbrAuthenticateMutation>(
      response.data.enterPhoneNbrAuthenticate
    );
  }
  async CheckPromo(type: string, promoId: number): Promise<CheckPromoMutation> {
    const statement = `mutation CheckPromo($type: String!, $promoId: Int!) {
        checkPromo(type: $type, promoId: $promoId) {
          __typename
          error
          data {
            __typename
            promoId
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type,
      promoId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CheckPromoMutation>response.data.checkPromo;
  }
  async AddPromo(
    type: string,
    promo_code: string,
    userId: string
  ): Promise<AddPromoMutation> {
    const statement = `mutation AddPromo($type: String!, $promo_code: String!, $userId: String!) {
        addPromo(type: $type, promo_code: $promo_code, userId: $userId) {
          __typename
          error
          data {
            __typename
            id
            promo_code
            promo_type
            promo_title
            amount {
              __typename
              AmtOrPercentage
              amount
              MaxSaving
            }
            promo_short_description
            promo_long_description
            expiry_date
            start_date
            evergreen
            status
            fleet {
              __typename
              allfleets
              data
            }
            usage_limit {
              __typename
              CoupounLimit
              CouponLimitStatus
            }
            customers
            isallcustomers
            expiry_status
            valid_area
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type,
      promo_code,
      userId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AddPromoMutation>response.data.addPromo;
  }
  async PaymentAddCustomerCard(
    method: string,
    uid: string,
    card_nonce?: string,
    postal_code?: string
  ): Promise<PaymentAddCustomerCardMutation> {
    const statement = `mutation PaymentAddCustomerCard($method: String!, $uid: String!, $card_nonce: String, $postal_code: String) {
        paymentAddCustomerCard(method: $method, uid: $uid, card_nonce: $card_nonce, postal_code: $postal_code) {
          __typename
          uid
          method
          error
          data {
            __typename
            error
            statusCode
            cards {
              __typename
              id
              last_4
              exp_year
              exp_month
              card_brand
              billing_address {
                __typename
                postal_code
              }
              isProfile
              email
              profile_type
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method,
      uid
    };
    if (card_nonce) {
      gqlAPIServiceArguments.card_nonce = card_nonce;
    }
    if (postal_code) {
      gqlAPIServiceArguments.postal_code = postal_code;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <PaymentAddCustomerCardMutation>response.data.paymentAddCustomerCard;
  }
  async PaymentDeleteCustomerCard(
    method: string,
    uid: string,
    card_id: string
  ): Promise<PaymentDeleteCustomerCardMutation> {
    const statement = `mutation PaymentDeleteCustomerCard($method: String!, $uid: String!, $card_id: String!) {
        paymentDeleteCustomerCard(method: $method, uid: $uid, card_id: $card_id) {
          __typename
          uid
          method
          error
          data {
            __typename
            error
            statusCode
            card_id
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method,
      uid,
      card_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <PaymentDeleteCustomerCardMutation>(
      response.data.paymentDeleteCustomerCard
    );
  }
  async PaymentAddProfile(
    method: string,
    uid: string,
    card_id: string,
    email?: string,
    profile_type?: string
  ): Promise<PaymentAddProfileMutation> {
    const statement = `mutation PaymentAddProfile($method: String!, $uid: String!, $card_id: String!, $email: String, $profile_type: String) {
        paymentAddProfile(method: $method, uid: $uid, card_id: $card_id, email: $email, profile_type: $profile_type) {
          __typename
          uid
          method
          error
          data {
            __typename
            error
            statusCode
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method,
      uid,
      card_id
    };
    if (email) {
      gqlAPIServiceArguments.email = email;
    }
    if (profile_type) {
      gqlAPIServiceArguments.profile_type = profile_type;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <PaymentAddProfileMutation>response.data.paymentAddProfile;
  }
  async SetDefaultTip(
    type: string,
    userId: string,
    tipType: string,
    value: number
  ): Promise<SetDefaultTipMutation> {
    const statement = `mutation SetDefaultTip($type: String!, $userId: String!, $tipType: String!, $value: Int!) {
        setDefaultTip(type: $type, userId: $userId, tipType: $tipType, value: $value) {
          __typename
          error
          data {
            __typename
            error
            statusCode
            data {
              __typename
              tipType
              value
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type,
      userId,
      tipType,
      value
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SetDefaultTipMutation>response.data.setDefaultTip;
  }
  async ServiceAreaCheck(
    type?: string,
    lat?: number,
    lng?: number,
    apiKey?: string
  ): Promise<ServiceAreaCheckMutation> {
    const statement = `mutation ServiceAreaCheck($type: String, $lat: Float, $lng: Float, $apiKey: String) {
        serviceAreaCheck(type: $type, lat: $lat, lng: $lng, apiKey: $apiKey) {
          __typename
          status
          geometry {
            __typename
            fleet
            zone
            distance
            entity
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (type) {
      gqlAPIServiceArguments.type = type;
    }
    if (lat) {
      gqlAPIServiceArguments.lat = lat;
    }
    if (lng) {
      gqlAPIServiceArguments.lng = lng;
    }
    if (apiKey) {
      gqlAPIServiceArguments.apiKey = apiKey;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ServiceAreaCheckMutation>response.data.serviceAreaCheck;
  }
  async InsertTrip(
    userId?: string,
    comment?: string,
    pkupDate?: string,
    pkupStreet?: string,
    pkupApt?: string,
    pkupCity?: string,
    pkupState?: string,
    pkupZip?: string,
    pkupLat?: number,
    pkupLng?: number,
    destStreet?: string,
    destApt?: string,
    destCity?: string,
    destState?: string,
    destZip?: string,
    destLat?: number,
    destLng?: number,
    nbrPass?: number,
    tripRate?: number,
    distance?: number,
    timeEstimate?: number,
    isNow?: boolean,
    couponId?: string,
    source?: string,
    vehicleType?: string,
    pickupTime?: string,
    paymentId?: string,
    paymentMethod?: string,
    tip?: number,
    tipType?: string,
    isWillCall?: boolean,
    phone?: string,
    firstName?: string,
    lastName?: string,
    passEmail?: string,
    PkupName?: string,
    DestName?: string,
    isLive?: boolean,
    processingFee?: number,
    ClientInfo1?: string,
    ClientInfo2?: string,
    ClientInfo3?: string,
    ClientInfo4?: string,
    ClientInfo5?: string,
    ClientInfo6?: string,
    strAccountNbr?: string,
    PricingEngineData?: string,
    ApiStage?: number,
    isCash?: boolean,
    TripType?: string,
  ): Promise<InsertTripMutation> {
    const statement = `mutation InsertTrip($userId: String!, $comment: String, $pkupDate: String, $pkupStreet: String, $pkupApt: String, $pkupCity: String, $pkupState: String, $pkupZip: String, $pkupLat: Float, $pkupLng: Float, $destStreet: String, $destApt: String, $destCity: String, $destState: String, $destZip: String, $destLat: Float, $destLng: Float, $nbrPass: Int, $tripRate: Float, $distance: Float, $timeEstimate: Float, $isNow: Boolean, $couponId: String, $source: String, $vehicleType: String, $pickupTime: String, $paymentId: String, $paymentMethod: String, $tip: Float, $tipType: String, $isWillCall: Boolean, $phone: String, $firstName: String, $lastName: String, $passEmail: String, $PkupName: String, $DestName: String, $isLive: Boolean, $processingFee: Float,$ClientInfo1: String,$ClientInfo2: String,$ClientInfo3: String,$ClientInfo4: String,$ClientInfo5: String,$ClientInfo6: String, $strAccountNbr: String, $PricingEngineData: String, $ApiStage: Boolean, $isCash: Boolean, $TripType: String) {
        insertTrip(userId: $userId, comment: $comment, pkupDate: $pkupDate, pkupStreet: $pkupStreet, pkupApt: $pkupApt, pkupCity: $pkupCity, pkupState: $pkupState, pkupZip: $pkupZip, pkupLat: $pkupLat, pkupLng: $pkupLng, destStreet: $destStreet, destApt: $destApt, destCity: $destCity, destState: $destState, destZip: $destZip, destLat: $destLat, destLng: $destLng, nbrPass: $nbrPass, tripRate: $tripRate, distance: $distance, timeEstimate: $timeEstimate, isNow: $isNow, couponId: $couponId, source: $source, vehicleType: $vehicleType, pickupTime: $pickupTime, paymentId: $paymentId, paymentMethod: $paymentMethod, tip: $tip, tipType: $tipType, isWillCall: $isWillCall, phone: $phone, firstName: $firstName, lastName: $lastName, passEmail: $passEmail, PkupName: $PkupName, DestName: $DestName, isLive: $isLive, processingFee: $processingFee, ClientInfo1: $ClientInfo1, ClientInfo2: $ClientInfo2,  ClientInfo3: $ClientInfo3, ClientInfo4: $ClientInfo4, ClientInfo5: $ClientInfo5, ClientInfo6: $ClientInfo6, strAccountNbr: $strAccountNbr, PricingEngineData: $PricingEngineData, ApiStage: $ApiStage, isCash: $isCash, TripType: $TripType) {
          __typename
          error
          data {
            __typename
            error
            errorCode
            zoneId
            tripNbr
            companyPhone
            servicingCompany
            pickup
            destination
            passengerName
            passengerPhone
            callDate
            questions
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
    };
    if (comment) {
      gqlAPIServiceArguments.comment = comment;
    }
    if (pkupDate) {
      gqlAPIServiceArguments.pkupDate = pkupDate;
    }
    if (pkupStreet) {
      gqlAPIServiceArguments.pkupStreet = pkupStreet;
    }
    if (pkupApt) {
      gqlAPIServiceArguments.pkupApt = pkupApt;
    }
    if (pkupCity) {
      gqlAPIServiceArguments.pkupCity = pkupCity;
    }
    if (pkupState) {
      gqlAPIServiceArguments.pkupState = pkupState;
    }
    if (pkupZip) {
      gqlAPIServiceArguments.pkupZip = pkupZip;
    }
    if (pkupLat) {
      gqlAPIServiceArguments.pkupLat = pkupLat;
    }
    if (pkupLng) {
      gqlAPIServiceArguments.pkupLng = pkupLng;
    }
    if (destStreet) {
      gqlAPIServiceArguments.destStreet = destStreet;
    }
    if (destApt) {
      gqlAPIServiceArguments.destApt = destApt;
    }
    if (destCity) {
      gqlAPIServiceArguments.destCity = destCity;
    }
    if (destState) {
      gqlAPIServiceArguments.destState = destState;
    }
    if (destZip) {
      gqlAPIServiceArguments.destZip = destZip;
    }
    if (destLat) {
      gqlAPIServiceArguments.destLat = destLat;
    }
    if (destLng) {
      gqlAPIServiceArguments.destLng = destLng;
    }
    if (nbrPass) {
      gqlAPIServiceArguments.nbrPass = nbrPass;
    }
    if (tripRate) {
      gqlAPIServiceArguments.tripRate = tripRate;
    }
    if (distance) {
      gqlAPIServiceArguments.distance = distance;
    }
    if (timeEstimate) {
      gqlAPIServiceArguments.timeEstimate = timeEstimate;
    }
    if (isNow) {
      gqlAPIServiceArguments.isNow = isNow;
    }

    gqlAPIServiceArguments.couponId = 0;
    // if (couponId) {
    //   gqlAPIServiceArguments.couponId = couponId;
    // }
    if (source) {
      gqlAPIServiceArguments.source = source;
    }
    
    if (vehicleType) {
      gqlAPIServiceArguments.vehicleType = vehicleType;
    }

    if (pickupTime) {
      gqlAPIServiceArguments.pickupTime = pickupTime;
    }

    if (paymentId) {
      gqlAPIServiceArguments.paymentId = paymentId;
    }

    if (paymentMethod) {
      gqlAPIServiceArguments.paymentMethod = paymentMethod;
    }

    if (tip) {
      gqlAPIServiceArguments.tip = tip;
    }

    if (tipType) {
      gqlAPIServiceArguments.tipType = tipType;
    }
    
    if (isWillCall) {
      gqlAPIServiceArguments.isWillCall = isWillCall;
    }
    
    if (phone) {
      gqlAPIServiceArguments.phone = phone;
    }

    if (firstName) {
      gqlAPIServiceArguments.firstName = firstName;
    }

    if (lastName) {
      gqlAPIServiceArguments.lastName = lastName;
    }

    if(passEmail) {
      gqlAPIServiceArguments.passEmail = passEmail;
    }

    if(PkupName) {
      gqlAPIServiceArguments.PkupName = PkupName;
    }

    if(DestName) {
      gqlAPIServiceArguments.DestName = DestName;
    }

    gqlAPIServiceArguments.isLive = isLive ? isLive: false;

    if(processingFee) {
      gqlAPIServiceArguments.processingFee = processingFee;
    }

    if (PricingEngineData) {
      gqlAPIServiceArguments.PricingEngineData = PricingEngineData;
    }

    if (ClientInfo1) {
      gqlAPIServiceArguments.ClientInfo1 = ClientInfo1;
    } else {
      gqlAPIServiceArguments.ClientInfo1 = '';
    }

    if (ClientInfo2) {
      gqlAPIServiceArguments.ClientInfo2 = ClientInfo2;
    } else {
      gqlAPIServiceArguments.ClientInfo2 = '';
    }

    if (ClientInfo3) {
      gqlAPIServiceArguments.ClientInfo3 = ClientInfo3;
    } else {
      gqlAPIServiceArguments.ClientInfo3 = '';
    }

    if (ClientInfo4) {
      gqlAPIServiceArguments.ClientInfo4 = ClientInfo4;
    } else {
      gqlAPIServiceArguments.ClientInfo4 = '';
    }

    if (ClientInfo5) {
      gqlAPIServiceArguments.ClientInfo5 = ClientInfo5;
    } else {
      gqlAPIServiceArguments.ClientInfo5 = '';
    }

    if (ClientInfo6) {
      gqlAPIServiceArguments.ClientInfo6 = ClientInfo6;
    } else {
      gqlAPIServiceArguments.ClientInfo6 = '';
    }

    gqlAPIServiceArguments.ApiStage = ApiStage;
    gqlAPIServiceArguments.isCash = isCash;
    gqlAPIServiceArguments.TripType = TripType;

    if (strAccountNbr != null) {
      gqlAPIServiceArguments.strAccountNbr = strAccountNbr;
    } else {
      gqlAPIServiceArguments.strAccountNbr = '10042';
    }

    if (strAccountNbr) gqlAPIServiceArguments.strAccountNbr = strAccountNbr;

    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <InsertTripMutation>response.data.insertTrip;
  }
  async VerifyPhone(phone: string): Promise<VerifyPhoneMutation> {
    const statement = `mutation VerifyPhone($phone: String!) {
        verifyPhone(phone: $phone) {
          __typename
          ... on VerifyPhoneResponse {
            response {
              __typename
              ... on VerifyPhoneAuthenticateData {
                codeSkippable
              }
              ... on VerifyPhoneSignUpData {
                unused
                data
              }
            }
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      phone
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <VerifyPhoneMutation>response.data.verifyPhone;
  }
  async EnterCodeEarlySignUp(
    pin: string,
    phone: string
  ): Promise<EnterCodeEarlySignUpMutation> {
    const statement = `mutation EnterCodeEarlySignUp($pin: String!, $phone: String!) {
        enterCodeEarlySignUp(pin: $pin, phone: $phone) {
          __typename
          ... on Success {
            unused
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      pin,
      phone
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <EnterCodeEarlySignUpMutation>response.data.enterCodeEarlySignUp;
  }
  async EnterEmail(
    email: string,
    deviceID: string
  ): Promise<EnterEmailMutation> {
    const statement = `mutation EnterEmail($email: String!, $deviceID: String!) {
        enterEmail(email: $email, deviceID: $deviceID) {
          __typename
          ... on Success {
            unused
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      email,
      deviceID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <EnterEmailMutation>response.data.enterEmail;
  }
  async EnterPasswordEarlySignup(
    password: string,
    deviceID: string
  ): Promise<EnterPasswordEarlySignupMutation> {
    const statement = `mutation EnterPasswordEarlySignup($password: String!, $deviceID: String!) {
        enterPasswordEarlySignup(password: $password, deviceID: $deviceID) {
          __typename
          ... on Tokens {
            refresh {
              __typename
              value
              expire
            }
            session {
              __typename
              value
              expire
            }
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      password,
      deviceID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <EnterPasswordEarlySignupMutation>(
      response.data.enterPasswordEarlySignup
    );
  }
  async EnterName(
    fname: string,
    lname: string,
    sessionToken: string,
    deviceID: string
  ): Promise<EnterNameMutation> {
    const statement = `mutation EnterName($fname: String!, $lname: String!, $sessionToken: String!, $deviceID: String!) {
        enterName(fname: $fname, lname: $lname, sessionToken: $sessionToken, deviceID: $deviceID) {
          __typename
          ... on Success {
            unused
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      fname,
      lname,
      sessionToken,
      deviceID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <EnterNameMutation>response.data.enterName;
  }
  async AcceptTerms(
    sessionToken: string,
    deviceID: string
  ): Promise<AcceptTermsMutation> {
    const statement = `mutation AcceptTerms($sessionToken: String!, $deviceID: String!) {
        acceptTerms(sessionToken: $sessionToken, deviceID: $deviceID) {
          __typename
          ... on User {
            userId
            lname
            fname
            email
            phone
            postalCode
            dateActive
            defaultTip {
              __typename
              tipType
              value
            }
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      sessionToken,
      deviceID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AcceptTermsMutation>response.data.acceptTerms;
  }
  async GetVehicles(
    lat: number,
    lng: number,
    fleetId: string,
    zoneId: string,
    departureDate: string
  ): Promise<GetVehiclesMutation> {
    const statement = `mutation GetVehicles($lat: Float!, $lng: Float!, $fleetId: String!, $zoneId: String!, $departureDate: String!) {
        getVehicles(lat: $lat, lng: $lng, fleetId: $fleetId, zoneId: $zoneId, departureDate: $departureDate) {
          __typename
          error
          data {
            __typename
            eta
            vehicles {
              __typename
              vehicleId
              lat
              lng
              types
              distance
              gpsDirection
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      lat,
      lng,
      fleetId,
      zoneId,
      departureDate
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVehiclesMutation>response.data.getVehicles;
  }
  async UpdateVehicleStatus(
    input: VehicleStatusInput
  ): Promise<UpdateVehicleStatusMutation> {
    const statement = `mutation UpdateVehicleStatus($input: VehicleStatusInput!) {
        updateVehicleStatus(input: $input) {
          __typename
          vehicleId
          driverId
          gpsDirection
          lat
          lng
          locationTimeStamp
          postedStatus
          tripStatus
          currentMeterFare
          currentMeterTotalDist
          meterRate1Set
          meterRate2Set
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVehicleStatusMutation>response.data.updateVehicleStatus;
  }
  
  async GetLocationForLatLng(
    lat: number,
    userId: string,
    lng?: number
  ): Promise<GetLocationForLatLngMutation> {
    const statement = `mutation GetLocationForLatLng($lat: Float!, $lng: Float, $userId: String!) {
        getLocationForLatLng(lat: $lat, lng: $lng, userId: $userId) {
          __typename
          status
          address {
            __typename
            Street
            City
            State
            Zip
            Lat
            Lng
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      lat,
      userId
    };
    if (lng) {
      gqlAPIServiceArguments.lng = lng;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetLocationForLatLngMutation>response.data.getLocationForLatLng;
  }


  async CancelTrip(
    tripNbr: number,
    zoneId: string
  ): Promise<CancelTripMutation> {
    const statement = `mutation CancelTrip($tripNbr: Int!, $zoneId: String!) {
        cancelTrip(tripNbr: $tripNbr, zoneId: $zoneId) {
          __typename
          error
          data {
            __typename
            error
            errorCode
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      tripNbr,
      zoneId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CancelTripMutation>response.data.cancelTrip;
  }
  async UpdateTripStatus(
    zoneId: string,
    tripNbr: number,
    fleetId?: string,
    comment?: string,
    pkupDate?: string,
    pkupStreet?: string,
    pkupApt?: string,
    pkupCity?: string,
    pkupState?: string,
    pkupZip?: string,
    pkupLat?: number,
    pkupLng?: number,
    destStreet?: string,
    destApt?: string,
    destCity?: string,
    destState?: string,
    destZip?: string,
    destLat?: number,
    destLng?: number,
    status?: string,
    statusTime?: string,
    vehicleNbr?: number,
    driverId?: number,
    finalFare?: number,
    ratingStatus?: boolean,
    tipStatus?: boolean
  ): Promise<UpdateTripStatusMutation> {
    const statement = `mutation UpdateTripStatus($zoneId: String!, $tripNbr: Int!, $fleetId: String, $comment: String, $pkupDate: String, $pkupStreet: String, $pkupApt: String, $pkupCity: String, $pkupState: String, $pkupZip: String, $pkupLat: Float, $pkupLng: Float, $destStreet: String, $destApt: String, $destCity: String, $destState: String, $destZip: String, $destLat: Float, $destLng: Float, $status: String, $statusTime: String, $vehicleNbr: Int, $driverId: Int, $finalFare: Float, $ratingStatus: Boolean, $tipStatus: Boolean) {
        updateTripStatus(zoneId: $zoneId, tripNbr: $tripNbr, fleetId: $fleetId, comment: $comment, pkupDate: $pkupDate, pkupStreet: $pkupStreet, pkupApt: $pkupApt, pkupCity: $pkupCity, pkupState: $pkupState, pkupZip: $pkupZip, pkupLat: $pkupLat, pkupLng: $pkupLng, destStreet: $destStreet, destApt: $destApt, destCity: $destCity, destState: $destState, destZip: $destZip, destLat: $destLat, destLng: $destLng, status: $status, statusTime: $statusTime, vehicleNbr: $vehicleNbr, driverId: $driverId, finalFare: $finalFare, ratingStatus: $ratingStatus, tipStatus: $tipStatus) {
          __typename
          tripNbr
          zoneId
          fleetId
          userId
          comment
          pkupDate
          pkupStreet
          pkupApt
          pkupCity
          pkupState
          pkupZip
          pkupLat
          pkupLng
          destStreet
          destApt
          destCity
          destState
          destZip
          destLat
          destLng
          nbrPass
          tripRate
          distance
          timeEstimate
          isNow
          couponId
          source
          vehicleType
          pickupTime
          paymentId
          paymentMethod
          tip
          tipType
          tripMinutes
          tripStatus {
            __typename
            appMessage
            userMessage
          }
          status
          statusTime
          vehicleNbr
          driverId
          finalFare
          ratingStatus
          tipStatus
        }
      }`;
    const gqlAPIServiceArguments: any = {
      zoneId,
      tripNbr
    };
    if (fleetId) {
      gqlAPIServiceArguments.fleetId = fleetId;
    }
    if (comment) {
      gqlAPIServiceArguments.comment = comment;
    }
    if (pkupDate) {
      gqlAPIServiceArguments.pkupDate = pkupDate;
    }
    if (pkupStreet) {
      gqlAPIServiceArguments.pkupStreet = pkupStreet;
    }
    if (pkupApt) {
      gqlAPIServiceArguments.pkupApt = pkupApt;
    }
    if (pkupCity) {
      gqlAPIServiceArguments.pkupCity = pkupCity;
    }
    if (pkupState) {
      gqlAPIServiceArguments.pkupState = pkupState;
    }
    if (pkupZip) {
      gqlAPIServiceArguments.pkupZip = pkupZip;
    }
    if (pkupLat) {
      gqlAPIServiceArguments.pkupLat = pkupLat;
    }
    if (pkupLng) {
      gqlAPIServiceArguments.pkupLng = pkupLng;
    }
    if (destStreet) {
      gqlAPIServiceArguments.destStreet = destStreet;
    }
    if (destApt) {
      gqlAPIServiceArguments.destApt = destApt;
    }
    if (destCity) {
      gqlAPIServiceArguments.destCity = destCity;
    }
    if (destState) {
      gqlAPIServiceArguments.destState = destState;
    }
    if (destZip) {
      gqlAPIServiceArguments.destZip = destZip;
    }
    if (destLat) {
      gqlAPIServiceArguments.destLat = destLat;
    }
    if (destLng) {
      gqlAPIServiceArguments.destLng = destLng;
    }
    if (status) {
      gqlAPIServiceArguments.status = status;
    }
    if (statusTime) {
      gqlAPIServiceArguments.statusTime = statusTime;
    }
    if (vehicleNbr) {
      gqlAPIServiceArguments.vehicleNbr = vehicleNbr;
    }
    if (driverId) {
      gqlAPIServiceArguments.driverId = driverId;
    }
    if (finalFare) {
      gqlAPIServiceArguments.finalFare = finalFare;
    }
    if (ratingStatus) {
      gqlAPIServiceArguments.ratingStatus = ratingStatus;
    }
    if (tipStatus) {
      gqlAPIServiceArguments.tipStatus = tipStatus;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateTripStatusMutation>response.data.updateTripStatus;
  }
  async SignInPassword(
    deviceId: string,
    password: string
  ): Promise<SignInPasswordMutation> {
    const statement = `mutation SignInPassword($deviceId: String!, $password: String!) {
        signInPassword(deviceId: $deviceId, password: $password) {
          __typename
          ... on Tokens {
            refresh {
              __typename
              value
              expire
            }
            session {
              __typename
              value
              expire
            }
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      deviceId,
      password
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SignInPasswordMutation>response.data.signInPassword;
  }
  async AddTip(
    method: string,
    tripid: number,
    tipType: string,
    tipValue: number
  ): Promise<AddTipMutation> {
    const statement = `mutation AddTip($method: String!, $tripid: Int!, $tipType: String!, $tipValue: Float!) {
        addTip(method: $method, tripid: $tripid, tipType: $tipType, tipValue: $tipValue) {
          __typename
          error
          data {
            __typename
            error
            statusCode
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method,
      tripid,
      tipType,
      tipValue
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AddTipMutation>response.data.addTip;
  }
  async AddRatingAndChargeTip(
    rating: number,
    method: string,
    tripid: number,
    tipType: string,
    tipValue: number
  ): Promise<AddRatingAndChargeTipMutation> {
    const statement = `mutation AddRatingAndChargeTip($rating: Int!, $method: String!, $tripid: Int!, $tipType: String!, $tipValue: Float!) {
        addRatingAndChargeTip(rating: $rating, method: $method, tripid: $tripid, tipType: $tipType, tipValue: $tipValue) {
          __typename
          RatingError
          tipPaymentError
          data {
            __typename
            error
            statusCode
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      rating,
      method,
      tripid,
      tipType,
      tipValue
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AddRatingAndChargeTipMutation>response.data.addRatingAndChargeTip;
  }
  async AddFeedback(
    method: string,
    imageUrls?: Array<string | null>,
    userId?: string,
    feedback?: string
  ): Promise<AddFeedbackMutation> {
    const statement = `mutation AddFeedback($method: String!, $imageUrls: [String], $userId: String, $feedback: String) {
        addFeedback(method: $method, imageUrls: $imageUrls, userId: $userId, feedback: $feedback) {
          __typename
          error
          data {
            __typename
            error
            statusCode
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method
    };
    if (imageUrls) {
      gqlAPIServiceArguments.imageUrls = imageUrls;
    }
    if (userId) {
      gqlAPIServiceArguments.userId = userId;
    }
    if (feedback) {
      gqlAPIServiceArguments.feedback = feedback;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AddFeedbackMutation>response.data.addFeedback;
  }
  async ForgotPasswordRequest(
    email: string
  ): Promise<ForgotPasswordRequestMutation> {
    const statement = `mutation ForgotPasswordRequest($email: String!) {
        forgotPasswordRequest(email: $email) {
          __typename
          error
          data {
            __typename
            error
            errorCode
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      email
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ForgotPasswordRequestMutation>response.data.forgotPasswordRequest;
  }
  async DriverInfo(
    driverId: number,
    fleetId: string
  ): Promise<DriverInfoMutation> {
    const statement = `mutation DriverInfo($driverId: Int!, $fleetId: String!) {
        driverInfo(driverId: $driverId, fleetId: $fleetId) {
          __typename
          error
          data {
            __typename
            statusCode
            lname
            fname
            imageUrl
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      driverId,
      fleetId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DriverInfoMutation>response.data.driverInfo;
  }
  async FleetInfo(tripId: number): Promise<FleetInfoMutation> {
    const statement = `mutation FleetInfo($tripId: Int!) {
        fleetInfo(tripId: $tripId) {
          __typename
          error
          data {
            __typename
            statusCode
            fleetName
            logo
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      tripId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <FleetInfoMutation>response.data.fleetInfo;
  }
  async AddFcmToken(
    method: string,
    userId: string,
    deviceId: string,
    fcmToken: string
  ): Promise<AddFcmTokenMutation> {
    const statement = `mutation AddFcmToken($method: String!, $userId: String!, $deviceId: String!, $fcmToken: String!) {
        addFcmToken(method: $method, userId: $userId, deviceId: $deviceId, fcmToken: $fcmToken) {
          __typename
          error
          statusCode
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method,
      userId,
      deviceId,
      fcmToken
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AddFcmTokenMutation>response.data.addFcmToken;
  }
  async ChangeCard(
    method: string,
    tripId: number,
    newCard: string
  ): Promise<ChangeCardMutation> {
    const statement = `mutation ChangeCard($method: String!, $tripId: Int!, $newCard: String!) {
        changeCard(method: $method, tripId: $tripId, newCard: $newCard) {
          __typename
          error
          statusCode
          data
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method,
      tripId,
      newCard
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ChangeCardMutation>response.data.changeCard;
  }
  async RedeemPromo(
    type: string,
    user_id: string,
    promo_id: number
  ): Promise<RedeemPromoMutation> {
    const statement = `mutation RedeemPromo($type: String!, $user_id: String!, $promo_id: Int!) {
        redeemPromo(type: $type, user_id: $user_id, promo_id: $promo_id) {
          __typename
          error
          data
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type,
      user_id,
      promo_id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <RedeemPromoMutation>response.data.redeemPromo;
  }
  async MessageDriver(
    zoneId: string,
    tripNbr: number,
    msg: string,
    source: string
  ): Promise<MessageDriverQuery> {
    const statement = `query MessageDriver($zoneId: String!, $tripNbr: Int!, $msg: String!, $source: String!) {
        messageDriver(zoneId: $zoneId, tripNbr: $tripNbr, msg: $msg, source: $source) {
          __typename
          error
          data {
            __typename
            error
            errorCode
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      zoneId,
      tripNbr,
      msg,
      source
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <MessageDriverQuery>response.data.messageDriver;
  }

  // Poly Airport Check
  async PolyAreaCheck(
    lat: number,
    lng: number
  ): Promise<PolyAreaCheckQuery> {
    const statement = `query PolyAreaCheck($lat: Float!, $lng: Float!) {
      polyAreaCheck(lat: $lat, lng: $lng) {
          __typename
          isAirport
          poly_name
        }
      }`;
    const gqlAPIServiceArguments: any = {
      lat,
      lng
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <PolyAreaCheckQuery>response.data.polyAreaCheck;
  }

  // cancelRide
  async CancelRide(
    tripNbr: Number
  ): Promise<CancelRideQuery> {
    const statement = `query CancelRide($tripNbr: Int!) {
      cancelRide(tripNbr: $tripNbr) {
          __typename
          error
          messages
        }
      }`;
    const gqlAPIServiceArguments: any = {
      tripNbr
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CancelRideQuery>response.data.cancelRide;
  }

  async CallDriver(
    fleetId: string,
    zoneId: string,
    vehicleNbr?: number
  ): Promise<CallDriverQuery> {
    const statement = `query CallDriver($fleetId: String!, $zoneId: String!, $vehicleNbr: Int) {
        callDriver(fleetId: $fleetId, zoneId: $zoneId, vehicleNbr: $vehicleNbr) {
          __typename
          error
          data {
            __typename
            error
            errorCode
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      fleetId,
      zoneId
    };
    if (vehicleNbr) {
      gqlAPIServiceArguments.vehicleNbr = vehicleNbr;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CallDriverQuery>response.data.callDriver;
  }
  async GetAllRecentLocations(
    userId: string
  ): Promise<GetAllRecentLocationsQuery> {
    const statement = `query GetAllRecentLocations($userId: String!) {
        getAllRecentLocations(userId: $userId) {
          __typename
          error
          data {
            __typename
            locations {
              __typename
              Street
              City
              State
              Zip
              Lat
              Lng
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetAllRecentLocationsQuery>response.data.getAllRecentLocations;
  }
  async GetAllCustomerCard(
    method: string,
    uid: string
  ): Promise<GetAllCustomerCardQuery> {
    const statement = `query GetAllCustomerCard($method: String!, $uid: String!) {
        getAllCustomerCard(method: $method, uid: $uid) {
          __typename
          error
          data {
            __typename
            error
            statusCode
            cards {
              __typename
              id
              last_4
              exp_year
              exp_month
              card_brand
              billing_address {
                __typename
                postal_code
              }
              isProfile
              email
              profile_type
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method,
      uid
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetAllCustomerCardQuery>response.data.getAllCustomerCard;
  }
  async GetAllPromo(
    type: string,
    userId: string,
    zipCode?: string
  ): Promise<GetAllPromoQuery> {
    const statement = `query GetAllPromo($type: String!, $userId: String!, $zipCode: String) {
        getAllPromo(type: $type, userId: $userId, zipCode: $zipCode) {
          __typename
          error
          data {
            __typename
            id
            promo_code
            promo_type
            promo_title
            amount {
              __typename
              AmtOrPercentage
              amount
              MaxSaving
            }
            promo_short_description
            promo_long_description
            expiry_date
            start_date
            evergreen
            status
            fleet {
              __typename
              allfleets
              data
            }
            usage_limit {
              __typename
              CoupounLimit
              CouponLimitStatus
            }
            customers
            isallcustomers
            expiry_status
            valid_area
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type,
      userId
    };
    if (zipCode) {
      gqlAPIServiceArguments.zipCode = zipCode;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetAllPromoQuery>response.data.getAllPromo;
  }
  async GetSelectedPromo(
    type: string,
    userId: string,
    zipCode?: string
  ): Promise<GetSelectedPromoQuery> {
    const statement = `query GetSelectedPromo($type: String!, $userId: String!, $zipCode: String) {
        getSelectedPromo(type: $type, userId: $userId, zipCode: $zipCode) {
          __typename
          error
          data {
            __typename
            id
            promo_code
            promo_type
            promo_title
            amount {
              __typename
              AmtOrPercentage
              amount
              MaxSaving
            }
            promo_short_description
            promo_long_description
            expiry_date
            start_date
            evergreen
            status
            fleet {
              __typename
              allfleets
              data
            }
            usage_limit {
              __typename
              CoupounLimit
              CouponLimitStatus
            }
            customers
            isallcustomers
            expiry_status
            valid_area
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type,
      userId
    };
    if (zipCode) {
      gqlAPIServiceArguments.zipCode = zipCode;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSelectedPromoQuery>response.data.getSelectedPromo;
  }
  async GetPromoDetail(type: string, id: string): Promise<GetPromoDetailQuery> {
    const statement = `query GetPromoDetail($type: String!, $id: String!) {
        getPromoDetail(type: $type, id: $id) {
          __typename
          error
          data {
            __typename
            id
            promo_code
            promo_type
            promo_title
            amount {
              __typename
              AmtOrPercentage
              amount
              MaxSaving
            }
            promo_short_description
            promo_long_description
            expiry_date
            start_date
            evergreen
            status
            fleet {
              __typename
              allfleets
              data
            }
            usage_limit {
              __typename
              CoupounLimit
              CouponLimitStatus
            }
            customers
            isallcustomers
            expiry_status
            valid_area
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type,
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPromoDetailQuery>response.data.getPromoDetail;
  }
  async GetDefaultTip(
    type: string,
    userId: string
  ): Promise<GetDefaultTipQuery> {
    const statement = `query GetDefaultTip($type: String!, $userId: String!) {
        getDefaultTip(type: $type, userId: $userId) {
          __typename
          error
          data {
            __typename
            error
            statusCode
            data {
              __typename
              tipType
              value
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type,
      userId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetDefaultTipQuery>response.data.getDefaultTip;
  }
  async GetTripStatus(
    tripNbr: number,
    zoneId?: string
  ): Promise<GetTripStatusQuery> {
    const statement = `query GetTripStatus($tripNbr: Int!, $zoneId: String) {
        getTripStatus(tripNbr: $tripNbr, zoneId: $zoneId) {
          __typename
          error
          data {
            __typename
            error
            errorCode
            cabNbr
            fltId
            cabLat
            cabLng
            cabMph
            cabType
            cabDirection
            eta
            driverName
            driverPicUrl
            plateNbr
            isComplete
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      tripNbr
    };
    if (zoneId) {
      gqlAPIServiceArguments.zoneId = zoneId;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTripStatusQuery>response.data.getTripStatus;
  }
  async GetUserDetails(userId: string): Promise<GetUserDetailsQuery> {
    const statement = `query GetUserDetails($userId: String!) {
        getUserDetails(userId: $userId) {
          __typename
          error
          statusCode
          data {
            __typename
            dateActive
            email
            lname
            fname
            userId
            phone
            postal_code
            defaultTip {
              __typename
              tipType
              value
            }
          }
          msg {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserDetailsQuery>response.data.getUserDetails;
  }
  async GetFarePrice(
    departureDate?: string,
    pkupStrNbr?: number,
    pkupStrName?: string,
    pkupApt?: string,
    pkupCity?: string,
    pkupState?: string,
    pkupZip?: string,
    pkupLat?: number,
    pkupLon?: number,
    destStrNbr?: number,
    destStrName?: string,
    destApt?: string,
    destCity?: string,
    destState?: string,
    destZip?: string,
    destLat?: number,
    destLon?: number,
    userId?: string,
    source?: string,
    tripType?: string,
    strAccountNbr?: string,
    isLive?: boolean,
  ): Promise<GetFarePriceQuery> {
    const statement = `query GetFarePrice($departureDate: String, $pkupStrNbr: Int, $pkupStrName: String, $pkupApt: String, $pkupCity: String, $pkupState: String, $pkupZip: String, $pkupLat: Float, $pkupLon: Float, $destStrNbr: Int, $destStrName: String, $destApt: String, $destCity: String, $destState: String, $destZip: String, $destLat: Float, $destLon: Float, $userId: String, $source: String, $tripType: String, $strAccountNbr: String, $isLive: Boolean) {
        getFarePrice(departureDate: $departureDate, pkupStrNbr: $pkupStrNbr, pkupStrName: $pkupStrName, pkupApt: $pkupApt, pkupCity: $pkupCity, pkupState: $pkupState, pkupZip: $pkupZip, pkupLat: $pkupLat, pkupLon: $pkupLon, destStrNbr: $destStrNbr, destStrName: $destStrName, destApt: $destApt, destCity: $destCity, destState: $destState, destZip: $destZip, destLat: $destLat, destLon: $destLon, userId: $userId, source: $source, tripType: $tripType, strAccountNbr: $strAccountNbr, isLive: $isLive) {
          __typename
          error
          data {
            __typename
            error
            errorCode
            fare
            miles
            minutes
            promoStatus
            promoId
            promoType
            promoAmount
            promoMaxSaving
            discount
            discountedFare
            processingFee
            displayFare
            PricingEngineData
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (departureDate) {
      gqlAPIServiceArguments.departureDate = departureDate;
    }

    if (pkupStrNbr) {
      gqlAPIServiceArguments.pkupStrNbr = pkupStrNbr;
    }
    else
      gqlAPIServiceArguments.pkupStrNbr = 0;
    
    if (pkupStrName) {
      gqlAPIServiceArguments.pkupStrName = pkupStrName;
    } else {
      gqlAPIServiceArguments.pkupStrName = "";
    }

    if (pkupApt) {
      gqlAPIServiceArguments.pkupApt = pkupApt;
    }
    if (pkupCity) {
      gqlAPIServiceArguments.pkupCity = pkupCity;
    }
    if (pkupState) {
      gqlAPIServiceArguments.pkupState = pkupState;
    }
    if (pkupZip) {
      gqlAPIServiceArguments.pkupZip = pkupZip;
    }
    if (pkupLat) {
      gqlAPIServiceArguments.pkupLat = pkupLat;
    }
    if (pkupLon) {
      gqlAPIServiceArguments.pkupLon = pkupLon;
    }
    if (destStrNbr) {
      gqlAPIServiceArguments.destStrNbr = destStrNbr;
    } else {
      gqlAPIServiceArguments.destStrNbr = 0;
    }

    if (destStrName) {
      gqlAPIServiceArguments.destStrName = destStrName;
    } else {
      gqlAPIServiceArguments.destStrName = "";
    }

    if (destApt) {
      gqlAPIServiceArguments.destApt = destApt;
    }
    if (destCity) {
      gqlAPIServiceArguments.destCity = destCity;
    }
    if (destState) {
      gqlAPIServiceArguments.destState = destState;
    }
    if (destZip) {
      gqlAPIServiceArguments.destZip = destZip;
    }
    if (destLat) {
      gqlAPIServiceArguments.destLat = destLat;
    }
    if (destLon) {
      gqlAPIServiceArguments.destLon = destLon;
    }
    if (userId) {
      gqlAPIServiceArguments.userId = userId;
    }
    if (source) {
      gqlAPIServiceArguments.source = source;
    }
    if (tripType) {
      gqlAPIServiceArguments.tripType = tripType;
    }
    if (strAccountNbr) {
      gqlAPIServiceArguments.strAccountNbr = strAccountNbr;
    } else {
      gqlAPIServiceArguments.strAccountNbr = "";
    }

    gqlAPIServiceArguments.isLive = isLive ? isLive: false;

    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetFarePriceQuery>response.data.getFarePrice;
  }
  async GetTypes(
    accessMode: string,
    lat: number,
    lng: number,
    zoneId: string,
    fleetId: string
  ): Promise<GetTypesQuery> {
    const statement = `query GetTypes($accessMode: String!, $lat: Float!, $lng: Float!, $zoneId: String!, $fleetId: String!) {
        getTypes(accessMode: $accessMode, lat: $lat, lng: $lng, zoneId: $zoneId, fleetId: $fleetId) {
          __typename
          error
          data {
            __typename
            error
            errorCode
            eta
            types {
              __typename
              type
              eta
              exist
            }
            vehicles {
              __typename
              vehicleId
              lat
              lng
              types
              distance
              gpsDirection
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      accessMode,
      lat,
      lng,
      zoneId,
      fleetId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTypesQuery>response.data.getTypes;
  }
  async Authenticate(
    type: string,
    password?: string,
    deviceId?: string,
    refreshToken?: string
  ): Promise<AuthenticateQuery> {
    const statement = `query Authenticate($type: String!, $password: String, $deviceId: String, $refreshToken: String) {
        authenticate(type: $type, password: $password, deviceId: $deviceId, refreshToken: $refreshToken) {
          __typename
          error
          data {
            __typename
            error
            errorCode
            refreshToken
            sessionToken
            refreshExpire
            sessionExpire
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type
    };
    if (password) {
      gqlAPIServiceArguments.password = password;
    }
    if (deviceId) {
      gqlAPIServiceArguments.deviceId = deviceId;
    }
    if (refreshToken) {
      gqlAPIServiceArguments.refreshToken = refreshToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AuthenticateQuery>response.data.authenticate;
  }
  async GetVehicleStatus(vehicleId: string): Promise<GetVehicleStatusQuery> {
    const statement = `query GetVehicleStatus($vehicleId: String!) {
        getVehicleStatus(vehicleId: $vehicleId) {
          __typename
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
          ... on VehicleStatus {
            vehicleId
            driverId
            gpsDirection
            lat
            lng
            locationTimeStamp
            postedStatus
            tripStatus
            currentMeterFare
            currentMeterTotalDist
            meterRate1Set
            meterRate2Set
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      vehicleId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVehicleStatusQuery>response.data.getVehicleStatus;
  }
  async GetRecentUpcomingTrips(
    userId: string
  ): Promise<GetRecentUpcomingTripsQuery> {
    const statement = `query GetRecentUpcomingTrips($userId: String!) {
        getRecentUpcomingTrips(userId: $userId) {
          __typename
          status
          trips {
            __typename
            tripNbr
            zoneId
            fleetId
            userId
            comment
            pkupDate
            pkupStreet
            pkupApt
            pkupCity
            pkupState
            pkupZip
            pkupLat
            pkupLng
            destStreet
            destApt
            destCity
            destState
            destZip
            destLat
            destLng
            nbrPass
            tripRate
            distance
            timeEstimate
            isNow
            couponId
            source
            vehicleType
            pickupTime
            paymentId
            paymentMethod
            tip
            tipType
            tripMinutes
            tripStatus {
              __typename
              appMessage
              userMessage
            }
            status
            statusTime
            vehicleNbr
            driverId
            finalFare
            ratingStatus
            tipStatus
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetRecentUpcomingTripsQuery>response.data.getRecentUpcomingTrips;
  }
  async GetRideOverviewData(
    departureDate: string,
    pkupLat: number,
    pkupLng: number,
    destLat: number,
    destLng: number,
    fleetId: string,
    zoneId: string
  ): Promise<GetRideOverviewDataQuery> {
    const statement = `query GetRideOverviewData($departureDate: String!, $pkupLat: Float!, $pkupLng: Float!, $destLat: Float!, $destLng: Float!, $fleetId: String!, $zoneId: String!) {
        getRideOverviewData(departureDate: $departureDate, pkupLat: $pkupLat, pkupLng: $pkupLng, destLat: $destLat, destLng: $destLng, fleetId: $fleetId, zoneId: $zoneId) {
          __typename
          error
          data {
            __typename
            fare {
              __typename
              error
              data {
                __typename
                error
                errorCode
                fare
                miles
                minutes
                promoStatus
                promoId
                promoType
                promoAmount
                promoMaxSaving
                discount
                discountedFare
                displayFare
              }
              messages {
                __typename
                appMessage
                userMessage
              }
            }
            vehicles {
              __typename
              error
              data {
                __typename
                eta
                vehicles {
                  __typename
                  vehicleId
                  lat
                  lng
                  types
                  distance
                  gpsDirection
                }
              }
              messages {
                __typename
                appMessage
                userMessage
              }
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      departureDate,
      pkupLat,
      pkupLng,
      destLat,
      destLng,
      fleetId,
      zoneId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetRideOverviewDataQuery>response.data.getRideOverviewData;
  }
  async GetUserTrips(userId: string): Promise<GetUserTripsQuery> {
    const statement = `query GetUserTrips($userId: String!) {
        getUserTrips(userId: $userId) {
          __typename
          error
          data {
            __typename
            error
            errorCode
            trips {
              __typename
              tripNbr
              zoneId
              fleetId
              userId
              comment
              pkupDate
              pkupStreet
              pkupApt
              pkupCity
              pkupState
              pkupZip
              pkupLat
              pkupLng
              destStreet
              destApt
              destCity
              destState
              destZip
              destLat
              destLng
              nbrPass
              tripRate
              distance
              timeEstimate
              isNow
              couponId
              source
              vehicleType
              pickupTime
              paymentId
              paymentMethod
              tip
              tipType
              tripMinutes
              tripStatus {
                __typename
                appMessage
                userMessage
              }
              status
              statusTime
              vehicleNbr
              driverId
              finalFare
              ratingStatus
              tipStatus
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserTripsQuery>response.data.getUserTrips;
  }
  async FindCabsUsingHash(
    type: string,
    lat: number,
    long: number
  ): Promise<FindCabsUsingHashQuery> {
    const statement = `query FindCabsUsingHash($type: String!, $lat: Float!, $long: Float!) {
        findCabsUsingHash(type: $type, lat: $lat, long: $long) {
          __typename
          error
          data
        }
      }`;
    const gqlAPIServiceArguments: any = {
      type,
      lat,
      long
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <FindCabsUsingHashQuery>response.data.findCabsUsingHash;
  }
  async VehicleInfo(
    fleetId: string,
    vehicleNbr: number
  ): Promise<VehicleInfoQuery> {
    const statement = `query VehicleInfo($fleetId: String!, $vehicleNbr: Int!) {
        vehicleInfo(fleetId: $fleetId, vehicleNbr: $vehicleNbr) {
          __typename
          ... on VehicleInfoData {
            vehicleNbr
            fleetId
            make
            model
            plate
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      fleetId,
      vehicleNbr
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <VehicleInfoQuery>response.data.vehicleInfo;
  }
  async DriverVehicleInfo(
    fleetId: string,
    driverId: number,
    vehicleNbr: number
  ): Promise<DriverVehicleInfoQuery> {
    const statement = `query DriverVehicleInfo($fleetId: String!, $driverId: Int!, $vehicleNbr: Int!) {
        driverVehicleInfo(fleetId: $fleetId, driverId: $driverId, vehicleNbr: $vehicleNbr) {
          __typename
          driver {
            __typename
            error
            data {
              __typename
              statusCode
              lname
              fname
              imageUrl
            }
            messages {
              __typename
              appMessage
              userMessage
            }
          }
          vehicle {
            __typename
            ... on VehicleInfoData {
              vehicleNbr
              fleetId
              make
              model
              plate
            }
            ... on Errors {
              errorCode
              messages {
                __typename
                appMessage
                userMessage
              }
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      fleetId,
      driverId,
      vehicleNbr
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DriverVehicleInfoQuery>response.data.driverVehicleInfo;
  }
  async GetEtas(
    tripStatus: string,
    vehLat: number,
    vehLng: number,
    destLat: number,
    destLng: number,
    pkupLat?: number,
    pkupLng?: number
  ): Promise<GetEtasQuery> {
    const statement = `query GetEtas($tripStatus: String!, $vehLat: Float!, $vehLng: Float!, $pkupLat: Float, $pkupLng: Float, $destLat: Float!, $destLng: Float!) {
        getEtas(tripStatus: $tripStatus, vehLat: $vehLat, vehLng: $vehLng, pkupLat: $pkupLat, pkupLng: $pkupLng, destLat: $destLat, destLng: $destLng) {
          __typename
          ... on EtaData {
            vehicleMinutes
            rideMinutes
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      tripStatus,
      vehLat,
      vehLng,
      destLat,
      destLng
    };
    if (pkupLat) {
      gqlAPIServiceArguments.pkupLat = pkupLat;
    }
    if (pkupLng) {
      gqlAPIServiceArguments.pkupLng = pkupLng;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetEtasQuery>response.data.getEtas;
  }
  async GetFleetPartners(zipCode?: string): Promise<GetFleetPartnersQuery> {
    const statement = `query GetFleetPartners($zipCode: String) {
        getFleetPartners(zipCode: $zipCode) {
          __typename
          ... on FleetList {
            fleets {
              __typename
              zoneId
              fleetId
              name
              description
              fleetImageUrl
            }
          }
          ... on Errors {
            errorCode
            messages {
              __typename
              appMessage
              userMessage
            }
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (zipCode) {
      gqlAPIServiceArguments.zipCode = zipCode;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetFleetPartnersQuery>response.data.getFleetPartners;
  }
  OnDeleteCardListener(
    method: string,
    uid: string
  ): Observable<SubscriptionResponse<OnDeleteCardSubscription>> {
    const statement = `subscription OnDeleteCard($method: String!, $uid: String!) {
        onDeleteCard(method: $method, uid: $uid) {
          __typename
          uid
          method
          error
          data {
            __typename
            error
            statusCode
            card_id
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method,
      uid
    };
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<SubscriptionResponse<OnDeleteCardSubscription>>;
  }

  OnPaymentAddListener(
    method: string,
    uid: string
  ): Observable<SubscriptionResponse<OnPaymentAddSubscription>> {
    const statement = `subscription OnPaymentAdd($method: String!, $uid: String!) {
        onPaymentAdd(method: $method, uid: $uid) {
          __typename
          uid
          method
          error
          data {
            __typename
            error
            statusCode
            cards {
              __typename
              id
              last_4
              exp_year
              exp_month
              card_brand
              billing_address {
                __typename
                postal_code
              }
              isProfile
              email
              profile_type
            }
          }
          messages {
            __typename
            appMessage
            userMessage
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      method,
      uid
    };
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<SubscriptionResponse<OnPaymentAddSubscription>>;
  }

  OnUpdateVehicleStatusListener(
    vehicleId?: string
  ): Observable<SubscriptionResponse<OnUpdateVehicleStatusSubscription>> {
    const statement = `subscription OnUpdateVehicleStatus($vehicleId: String) {
        onUpdateVehicleStatus(vehicleId: $vehicleId) {
          __typename
          vehicleId
          driverId
          gpsDirection
          lat
          lng
          locationTimeStamp
          postedStatus
          tripStatus
          currentMeterFare
          currentMeterTotalDist
          meterRate1Set
          meterRate2Set
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (vehicleId) {
      gqlAPIServiceArguments.vehicleId = vehicleId;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<SubscriptionResponse<OnUpdateVehicleStatusSubscription>>;
  }

  OnUpdateTripStatusListener(
    zoneId: string,
    tripNbr: number
  ): Observable<SubscriptionResponse<OnUpdateTripStatusSubscription>> {
    const statement = `subscription OnUpdateTripStatus($zoneId: String!, $tripNbr: Int!) {
        onUpdateTripStatus(zoneId: $zoneId, tripNbr: $tripNbr) {
          __typename
          tripNbr
          zoneId
          fleetId
          userId
          comment
          pkupDate
          pkupStreet
          pkupApt
          pkupCity
          pkupState
          pkupZip
          pkupLat
          pkupLng
          destStreet
          destApt
          destCity
          destState
          destZip
          destLat
          destLng
          nbrPass
          tripRate
          distance
          timeEstimate
          isNow
          couponId
          source
          vehicleType
          pickupTime
          paymentId
          paymentMethod
          tip
          tipType
          tripMinutes
          tripStatus {
            __typename
            appMessage
            userMessage
          }
          status
          statusTime
          vehicleNbr
          driverId
          finalFare
          ratingStatus
          tipStatus
        }
      }`;
    const gqlAPIServiceArguments: any = {
      zoneId,
      tripNbr
    };
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<SubscriptionResponse<OnUpdateTripStatusSubscription>>;
  }

  OnUpdateUserTripListener(
    userId: string
  ): Observable<SubscriptionResponse<OnUpdateUserTripSubscription>> {
    const statement = `subscription OnUpdateUserTrip($userId: String!) {
        onUpdateUserTrip(userId: $userId) {
          __typename
          tripNbr
          zoneId
          fleetId
          userId
          comment
          pkupDate
          pkupStreet
          pkupApt
          pkupCity
          pkupState
          pkupZip
          pkupLat
          pkupLng
          destStreet
          destApt
          destCity
          destState
          destZip
          destLat
          destLng
          nbrPass
          tripRate
          distance
          timeEstimate
          isNow
          couponId
          source
          vehicleType
          pickupTime
          paymentId
          paymentMethod
          tip
          tipType
          tripMinutes
          tripStatus {
            __typename
            appMessage
            userMessage
          }
          status
          statusTime
          vehicleNbr
          driverId
          finalFare
          ratingStatus
          tipStatus
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
    };
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<SubscriptionResponse<OnUpdateUserTripSubscription>>;
  }
}
