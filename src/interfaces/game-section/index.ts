import { FileInterface } from 'interfaces/file';
import { ServerInterface } from 'interfaces/server';
import { GetQueryInterface } from 'interfaces';

export interface GameSectionInterface {
  id?: string;
  name: string;
  server_id: string;
  created_at?: any;
  updated_at?: any;
  file?: FileInterface[];
  server?: ServerInterface;
  _count?: {
    file?: number;
  };
}

export interface GameSectionGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  server_id?: string;
}
