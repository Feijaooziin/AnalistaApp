import { drawerMenu } from "@/src/constants/drawerMenu";

export function getRouteTitle(pathname: string) {
  const route = pathname.replace("/", "");

  for (const item of drawerMenu) {
    if ("children" in item) {
      const child = item.children.find((child) => child.route === route);

      if (child) {
        return child.title;
      }
    } else {
      if (item.route === route) {
        return item.title;
      }
    }
  }

  return "Analista App";
}
