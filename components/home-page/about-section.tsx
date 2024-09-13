import { syne } from "@/lib/direct-fonts";
import { cn } from "@/lib/utils";

export default function AboutSection() {
  return (
    <section>
      {/* Belt */}
      <div className={cn("flex text-7xl gap-24 font-black text-stroke overflow-hidden", syne.className)}>
        <h1 className="belt">Redefine Your Style!</h1>
        <h1 className="belt">Redefine Your Style!</h1>
        <h1 className="belt">Redefine Your Style!</h1>
      </div>
    </section>
  );
}
