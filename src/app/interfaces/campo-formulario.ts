export interface CampoFormulario {
  label: string;
  controlName: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'select' | 'textarea';
  placeholder?: string;
  rows?: number;
}
