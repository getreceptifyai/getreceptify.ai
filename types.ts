export type PlanType = "free" | "pro";

export type ReceptionistFAQ = {
  q: string;
  a: string;
};

export type ReceptionistHours = Record<
  string,
  {
    open: string;
    close: string;
    closed: boolean;
  }
>;

export type ReceptionistConfig = {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string;
  hours: ReceptionistHours;
  services: string[];
  faqs: ReceptionistFAQ[];
  greeting: string;
};
