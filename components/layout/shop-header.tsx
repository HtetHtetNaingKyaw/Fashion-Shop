import Link from "next/link";
import { CATEGORIES } from "../../lib/porduct-utils";
import UserNav from "./user-nav";

const ShopHeader = () => {
  return (
    <header className=" sticky top-0 z-40 border-b bg-background/95 supports-backdrop-filter:bg-background/60 backdrop-blur">
      <div className="flex h-16 items-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 justify-between gap-4">
        <Link href={"/"} className="text-lg font-semibold tracking-tight">Fashion Shop</Link>
        <nav className="hidden md:flex items-center gap-2">
          {
            CATEGORIES.map((category) => (
              <Link key={category.value} href={`/categories?category=${category.value}`} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground" >
                {category.label}
              </Link>
            ))
          }
        </nav>
        <div className="flex items-center gap-1">
          <Link href={"/cart"} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground" >
            Cart
          </Link>
          <UserNav />
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
