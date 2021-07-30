import Phone from './phone';

export default interface Account {
  active?: boolean;
  blocked_to_create_account?: boolean;
  email?: string;
  external_id?: number;
  id: string;
  language: Language;
  name: string;
  not_publish_when_create?: boolean;
  phone?: Phone;
  registration_date?: string;
  tax_payer_identification_number?: string;
  tenant_id?: string;
  test_scope?: TestScope;
  user_type?: UserType;
}

type UserType = 'PLATFORM' | string;

type TestScope = 'ONLY_TEST' | string;

type Language = 'pt-br' | string;
