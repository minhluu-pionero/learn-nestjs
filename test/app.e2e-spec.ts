import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
  })
  it.todo('should pass')
})
