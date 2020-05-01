import React, {Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import UnauthenticatedRoute from "./libs/routes/unauthenticate/index";
import HomeRoute from "./libs/routes/home";
import AuthenticatedRoute from "./libs/routes/authenticate/index";
import DashRoute from "./libs/routes/DashRoute";
import AdminRoute from "./libs/routes/AdminRoute";
const AsyncHome = lazy(() => import("./containers/home/index"));
const AsyncVerifyEmail = lazy(() => import("./containers/home/verifyemail"));
const AsyncDashboard = lazy(() => import("./containers/admin/dashboard/index"));
const AsyncCategory = lazy(() => import("./containers/category/index"));
const AsyncViewDetails = lazy(() => import("./containers/course/view/index"));
const AsyncCourseList = lazy(() =>
  import("./containers/admin/course/list/index")
);
const AsyncNewCourse = lazy(() =>
  import("./containers/admin/course/new/index")
);
const AsyncFacultyList = lazy(() => import("./containers/admin/faculty/list/index"));
const AsyncNewFaculty = lazy(() => import("./containers/admin/faculty/new/index"));
const AsyncCategoryList = lazy(() =>
  import("./containers/admin/category/index")
);
// Layout components
const AsyncDashboardLayout = lazy(() =>
  import("./libs/layouts/Dashboard/index")
);
const AsyncViewLayout = lazy(() => import("./libs/layouts/View/index"));
const AsyncCourseLayout = lazy(() => import("./libs/layouts/Course/index"));
const AsyncAdminLayout = lazy(() => import("./libs/layouts/Admin/index"));
const AsyncTeacherList = lazy(() =>
  import("./containers/admin/teacher/list/index")
);
const AsyncNewTeacher = lazy(() =>
  import("./containers/admin/teacher/new/index")
);
const AsyncEnrolList = lazy(() =>
  import("./containers/admin/enrolment/enrolhistory/index")
);
const AsyncEnrolTeacher = lazy(() =>
  import("./containers/admin/enrolment/enrolteacher/index")
);
const AsyncSetting = lazy(() => import("./containers/admin/setting/index"));

export default ({ childProps }) => (
  <Switch>
    <HomeRoute path="/" exact component={AsyncHome} props={childProps} />
    <HomeRoute path="/reset-password" 
    exact 
    component={AsyncHome} 
    props={childProps} />
    <Route
      path="/verify-email"
      exact
      render={props => <Suspense fallback={<div>Loading... </div>}>
        <AsyncVerifyEmail {...props}/>
      </Suspense>}
    />
    {/* <UnauthenticatedRoute
    path="/dashboard"
    exact
    component={AsyncDashboard}
    props={childProps}
  /> */}
    <AuthenticatedRoute
      path="/dashboard"
      exact
      component={AsyncDashboard}
      layout={AsyncDashboardLayout}
      props={childProps}
    />
    <DashRoute
      path="/category"
      exact
      component={AsyncCategory}
      layout={AsyncDashboardLayout}
      props={childProps}
    />
    <DashRoute
      path="/viewdetails"
      exact
      component={AsyncViewDetails}
      layout={AsyncViewLayout}
      props={childProps}
    />
    <AdminRoute
      path="/admin/course"
      exact
      component={AsyncCourseList}
    />
    <AdminRoute
      path="/admin/course/:id"
      exact
      component={AsyncNewCourse}
    />
    <AdminRoute
      path="/admin/faculty"
      exact
      component={AsyncFacultyList}
    />
    <AdminRoute
      path="/admin/faculty/:id"
      exact
      component={AsyncNewFaculty}
    />
    <AdminRoute
      path="/admin/category"
      exact
      component={AsyncCategoryList}
    />
    <AdminRoute
      path="/admin/teacher"
      exact
      component={AsyncTeacherList}
    />
    <AdminRoute
      path="/admin/teacher/new"
      exact
      component={AsyncNewTeacher}
    />
    <AdminRoute
      path="/admin/dashboard"
      exact
      component={AsyncDashboard}
    />
    <AdminRoute
      path="/admin/setting"
      exact
      component={AsyncSetting}
    />
    <AdminRoute
      path="/admin/enrolment/history"
      exact
      component={AsyncEnrolList}
    />
    <AdminRoute
      path="/admin/enrolment/teacher"
      exact
      component={AsyncEnrolTeacher}
    />
  </Switch>
);
