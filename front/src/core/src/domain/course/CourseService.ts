import apiRoutes from "#/routes/api";
import {Course} from "#/domain/course/Course";
import {BaseService} from "#/domain/shared/BaseService";

export class CourseService extends BaseService<Course> {
  constructor() {
    super({data: Course, url: apiRoutes.courses.base});
  }
}