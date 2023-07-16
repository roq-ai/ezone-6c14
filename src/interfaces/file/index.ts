import { GameSectionInterface } from 'interfaces/game-section';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FileInterface {
  id?: string;
  name: string;
  game_section_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  game_section?: GameSectionInterface;
  user?: UserInterface;
  _count?: {};
}

export interface FileGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  game_section_id?: string;
  user_id?: string;
}
