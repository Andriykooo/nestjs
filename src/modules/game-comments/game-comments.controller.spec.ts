import { Test, TestingModule } from '@nestjs/testing';
import { GameCommentsController } from './game-comments.controller';
import { GameCommentsService } from './game-comments.service';

describe('GameCommentsController', () => {
  let controller: GameCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameCommentsController],
      providers: [GameCommentsService],
    }).compile();

    controller = module.get<GameCommentsController>(GameCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
