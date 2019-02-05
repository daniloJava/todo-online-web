import { AbstractModel } from './abstract.model';

export class Example extends AbstractModel<string> {
  public fieldId!: string;
  public fieldString!: string;
  public fieldNumber!: number;
  public fieldStatus!: string;
  public fieldCpf!: string;
  public fieldCnpj!: string;
  public fieldCpfCnpj!: string;
  public fieldDate!: Date;
  public fieldTime!: Date;
  public fieldDateTime!: Date;
  public fieldBoolean!: boolean;
  public fieldAutocomplete!: string;
  public fieldSelectSingle!: string;
  public fieldSelectMultiple!: string[];
}
