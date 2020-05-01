// Import Actions
import { COURSE_DETAILS, COURSE_LIST, CHAPTER_LIST } from './actions';

// Initial State
const initialState = {
  courseData: null, courseList: []
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_DETAILS:
      return Object.assign({}, state, {
        courseData: action.data,
      });
    case COURSE_LIST:
      return Object.assign({}, state, {
        courseList: action.data ? action.data : [],
      });
    default:
      return state;
  }
};

// Export Reducer
export default CourseReducer;
