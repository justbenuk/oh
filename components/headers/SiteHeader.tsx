import SiteLoggedInMenu from "../menus/SiteLoggedInMenu";
import SiteMenu from "../menus/SiteMenu";
import SiteMobileMenu from "../menus/SiteMobileMenu";
import SiteLogo from "../SiteLogo";

export default function SiteHeader() {
  return (
    <header className="grid grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr] py-4 px-6">
      <div className="justify-self-start">
        <SiteLogo size="medium" />
      </div>
      <div className="hidden justify-self-center lg:block">
        <SiteMenu />
      </div>
      <div className="justify-self-end">
        <div className="hidden lg:flex">
          <SiteLoggedInMenu />
        </div>
        <SiteMobileMenu />
      </div>
    </header>
  );
}
