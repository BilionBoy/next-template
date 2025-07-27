import darkLogo from "@/assets/logos/LogoDark.png";
import logo from "@/assets/logos/LogoWhite.png";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-11 max-w-[15rem]">
      <Image
        src={logo}
        fill
        className="dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={darkLogo}
        fill
        className="hidden dark:block"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
