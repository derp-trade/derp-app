import Image, { ImageProps } from "next/image";

export function Logomark(props: Omit<ImageProps, "alt" | "src">) {
  return (
    <Image
      src="/images/logo.jpg"
      width={32}
      height={32}
      alt="derps logo"
      className="inline rounded-md"
      {...props}
    />
  );
}

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`flex flex-row items-center ${props.className ?? ""}`} {...props}>
      <Logomark />
      <p className="ml-2 inline text-base font-header font-bold">derp.trade</p>
    </div>
  );
}
