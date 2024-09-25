export interface IAppRoutes {
  location: string;
  component: JSX.Element;
  isPublic: boolean;
  routes: IAppRoute[];
}

export interface IAppRoute {
  path: string;
  isPublic: boolean;
  component: JSX.Element;
}
