import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { HEALTH_HEAP_INDICATOR_KEY, HEAP_MEMORY_THRESHOLD_BYTES } from '@/health/health.constants.js';
import { HealthService } from '@/health/health.service.js';

describe('HealthService', () => {
  let healthService: HealthService;
  let healthCheckService: { check: ReturnType<typeof vi.fn> };
  let memoryHealthIndicator: { checkHeap: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    healthCheckService = { check: vi.fn().mockResolvedValue({ status: 'ok', info: {}, error: {}, details: {} }) };
    memoryHealthIndicator = { checkHeap: vi.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        { provide: HealthCheckService, useValue: healthCheckService },
        { provide: MemoryHealthIndicator, useValue: memoryHealthIndicator },
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
      expect(indicators).toHaveLength(1);

      await indicators[0]();
      expect(memoryHealthIndicator.checkHeap).toHaveBeenCalledWith(
        HEALTH_HEAP_INDICATOR_KEY,
        HEAP_MEMORY_THRESHOLD_BYTES,
      );
    });
  });
});
