import { Test, TestingModule } from '@nestjs/testing';
import { GameCommentsService } from './game-comments.service';

describe('GameCommentsService', () => {
  let service: GameCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCommentsService],
    }).compile();

    service = module.get<GameCommentsService>(GameCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
