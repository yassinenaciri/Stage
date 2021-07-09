import { IEncadrant } from 'app/shared/model/encadrant.model';

export interface IEtudiant {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  mail?: string | null;
  encadrant?: string | null;
  encadrant?: IEncadrant | null;
}

export const defaultValue: Readonly<IEtudiant> = {};
