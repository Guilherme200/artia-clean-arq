import {CourseService} from "#/domain/course/CourseService";
import {BaseService, BaseServiceInterface} from "#/domain/shared/BaseService";
import {Course} from "#/domain/course/Course";

describe('BaseService', () => {
  const props: BaseServiceInterface = {data: Course, url: '/api/courses'}
  const service = new BaseService(props);

  test('Test method index', async () => {
    const result = await service.index()
    expect(result).not.toBeNull()
  })

  test('Test method get', async () => {
    const result = await service.get(1)
    expect(result).not.toBeNull()
  })

  test('Test method create', async () => {
    const result = await service.create({})
    expect(result).not.toBeNull()
  })

  test('Test method update', async () => {
    const result = await service.update(1, {})
    expect(result).not.toBeNull()
  })

  test('Test method destroy', async () => {
    const result = await service.destroy(1)
    expect(result).not.toBeNull()
  })
})