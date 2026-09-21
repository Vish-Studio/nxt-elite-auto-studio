import Image from "next/image";
const BrandMark = ({ priority = false }: { priority?: boolean }) => <Image alt="Elite Auto Studio" className="brand-mark" height={1080} priority={priority} src="/elite-auto-studio-logo.jpeg" width={1448} />;
export default BrandMark;
