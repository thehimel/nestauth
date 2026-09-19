import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService, HealthIndicatorService, MemoryHealthIndicator } from '@nestjs/terminus';
import { HEALTH_HEAP_INDICATOR_KEY, HEAP_MEMORY_THRESHOLD_BYTES } from '@/health/health.constants.js';
import { HealthService } from '@/health/health.service.js';
import { DB_CLIENT } from '@/infra/db/db.constants.js';

describe('HealthService', () => {
  let healthService: HealthService;
  let healthCheckService: { check: ReturnType<typeof vi.fn> };
  let memoryHealthIndicator: { checkHeap: ReturnType<typeof vi.fn> };
  let healthIndicatorService: { check: ReturnType<typeof vi.fn> };
  let dbAttempt: ReturnType<typeof vi.fn>;
  let dbClient: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    healthCheckService = { check: vi.fn().mockResolvedValue({ status: 'ok', info: {}, error: {}, details: {} }) };
    memoryHealthIndicator = { checkHeap: vi.fn() };
    dbAttempt = vi.fn();
    healthIndicatorService = { check: vi.fn().mockReturnValue({ attempt: dbAttempt }) };
    dbClient = vi.fn().mockResolvedValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        { provide: HealthCheckService, useValue: healthCheckService },
        { provide: MemoryHealthIndicator, useValue: memoryHealthIndicator },
        { provide: HealthIndicatorService, useValue: healthIndicatorService },
        { provide: DB_CLIENT, useValue: dbClient },
      ],
    }).compile();

    healthService = module.get(HealthService);
  });

  describe('checkLiveness', () => {
    it('runs with no indicators', async () => {
      await healthService.checkLiveness();

      expect(healthCheckService.check).toHaveBeenCalledWith([]);
    });
  });

  describe('checkReadiness', () => {
    it('runs the memory heap indicator', async () => {
      await healthService.checkReadiness();

      const [indicators] = healthCheckService.check.mock.calls[0];
      expect(indicators).toHaveLength(2);

      await indicators[0]();
      expect(memoryHealthIndicator.checkHeap).toHaveBeenCalledWith(
        HEALTH_HEAP_INDICATOR_KEY,
        HEAP_MEMORY_THRESHOLD_BYTES,
      );
    });

    it('runs a database query through the db indicator', async () => {
      await healthService.checkReadiness();

      const [indicators] = healthCheckService.check.mock.calls[0];
      await indicators[1]();

      expect(healthIndicatorService.check).toHaveBeenCalledWith('database');
      expect(dbAttempt).toHaveBeenCalled();
      const attemptFn = dbAttempt.mock.calls[0][0];
      await attemptFn();
      expect(dbClient).toHaveBeenCalled();
    });
  });
});
