import { Test, TestingModule } from "@nestjs/testing"
import { ImgProxyService } from "./imgproxy.service"

describe("ImgproxyService", () => {
  let service: ImgProxyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImgProxyService],
    }).compile()

    service = module.get<ImgProxyService>(ImgProxyService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
