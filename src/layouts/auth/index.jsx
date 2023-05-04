import authImg from "assets/img/auth/auth.jpg";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "routes.js";
import FixedSetting from "components/fixedSetting/FixedSetting";

export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedSetting />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 pl-0 overflow-hidden lg:overflow-y-scroll no-scrollbar">
              <div className="flex flex-col pl-5 pr-5 lg:max-w-[48%] w-full xl:max-w-full">
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/auth/sign-in" replace />}
                  />
                </Routes>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[60px] xl:rounded-bl-[80px]"
                    style={{ backgroundImage: `url(${authImg})` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
