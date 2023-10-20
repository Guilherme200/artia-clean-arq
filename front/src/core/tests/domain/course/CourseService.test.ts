import {CourseService} from "#/domain/course/CourseService";

describe('CourseService', () => {
  test('', async() => {
    const service = new CourseService();
    const result = await service.index()

    console.log(result)

  })
})