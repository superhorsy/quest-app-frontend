import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@mui/material";

import { useMatches, Link as RouterLink } from "react-router-dom";

export const Breadcrumbs = () => {
  const matches = useMatches();
  let crumbs = matches.filter((match) => Boolean(match.handle?.crumb)).map((match) => match.handle.crumb(match.data));
  return crumbs.length > 0 && (
    <>
      <MUIBreadcrumbs sx={{ mt: 3 }} aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          Главная
        </Link>
        {crumbs.map((crumb, index) => (crumbs.length - 1 === index) ? <Typography key={crumb.name} color="text.primary">{crumb.name}</Typography> : <Link component={RouterLink} key={crumb.name} underline="hover" color="inherit" to={crumb.href}>{crumb.name}</Link>)}
      </MUIBreadcrumbs>
    </>
  );
};
