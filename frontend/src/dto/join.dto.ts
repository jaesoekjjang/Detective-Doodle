import DrawDTO from './draw.dto';
import PlayerDTO from './player.dto';

export default class JoinDTO {
  me: PlayerDTO;
  players: PlayerDTO[];
  draws: DrawDTO[];
}
