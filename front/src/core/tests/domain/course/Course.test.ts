import {Course} from "#/domain/course/Course";
import {CourseInterface} from "#/domain/course/CourseInterface";

describe('Course', () => {
  test('Should create instance of type course', () => {
    const data: CourseInterface = {
      id: 1,
      title: 'Course 01',
      description: 'My Course 01',
      video: 'http://localhost',
      expiredAt: '2023-10-20',
      createdAt: '2023-10-20',
      updatedAt: '2023-10-20',
    }
    const course = new Course(data);
    expect(course).toEqual(data);
  })
})