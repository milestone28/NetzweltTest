export class Territory {
  id: string;
  name: string;
  parent: string | null;
  children?: Territory[];
}