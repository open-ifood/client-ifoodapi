import Phone from './phone.interface.';

/**
 * Informations about a user-defined account.
 */
export default interface Account {
  /** If the account is active for usage */
  active?: boolean;
  /** Blocked to create new account */
  blocked_to_create_account?: boolean;
  email?: string;
  /** Integer identification */
  external_id?: number;
  /** Hashed identification SHA-* */
  id: string;
  language: Language;
  /** Fullname specified in sign-up */
  name: string;
  not_publish_when_create?: boolean;
  phone?: Phone;
  registration_date?: string;
  /** Document identification (e.g. CPF/RG) */
  tax_payer_identification_number?: string;
  tenant_id?: string;
  test_scope?: TestScope;
  user_type?: UserType;
}

/** Type of a user in plataform */
type UserType = 'PLATFORM' | string;
/** Allowed scope for test in application */
type TestScope = 'ONLY_TEST' | string;
type Language = 'pt-br' | string;
