export interface IEncadrant {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  mail?: string | null;
}

export const defaultValue: Readonly<IEncadrant> = {};
