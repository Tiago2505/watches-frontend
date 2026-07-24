
interface FormFields{

  id: string;
  type: 'email' | 'text' | 'number';
  text: string;

}

export interface FormInterface{
  type: 'column' | 'row';
  fields: FormFields[];
}
