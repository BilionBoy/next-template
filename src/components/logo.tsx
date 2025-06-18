import darkLogo from "@/assets/logos/DarkAdm.png";
import logo from "@/assets/logos/Adm.png";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-13 max-w-[10.9rem]">
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
