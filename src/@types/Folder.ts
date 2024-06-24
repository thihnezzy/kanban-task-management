import { UniqueIdentifier } from '@dnd-kit/core';

export type Folder = {
  children_ids: Array<UniqueIdentifier> | Array<string>;
  config: Record<string, unknown>;
  date_creation: string;
  favoris: boolean;
  id: string | UniqueIdentifier;
  last_modif: string;
  parent_id: string | UniqueIdentifier | null;
  tags: Record<string, unknown>;
  title: string;
  user_id: string;
};
