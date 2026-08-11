import SiteMenu from "../menus/SiteMenu";
import SiteLogo from "../SiteLogo";

export default function SiteHeader() {
  return (
    <header className="grid grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr] py-4 px-6">
      <div className="justify-self-start">
        <SiteLogo size="medium" />
      </div>
      <div className="justify-self-center">
        <SiteMenu />
      </div>
      <div className="justify-self-end">mobile</div>
    </header>
  );
}
