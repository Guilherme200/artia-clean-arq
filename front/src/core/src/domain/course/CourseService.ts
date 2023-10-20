import {Course} from "#/domain/course/Course";
import {BaseService} from "#/domain/shared/BaseService";

export class CourseService extends BaseService<Course> {
  constructor() {
    super({data: Course, url: 'api/courses'});
  }
}