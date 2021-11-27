/** Represented Phone number */
export default interface Phone {
  /** Identification number to country (e.g. 55 -> Brasil, 1 -> US) */
  country_code: number;
  /** Region identification (e.g. 16 -> Ribeirão Preto, 11 -> São Paulo) */
  area_code: number;
  number: string;
  /** The union of area_code and number. (e.g. 16993498271) */
  full_number: string;
}
