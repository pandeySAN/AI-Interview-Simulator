import { getTechLogos } from "@/lib/utils"
import Image from "next/image"

type TechIconProps = {
  techStack: string[]
}

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack)

  return (
    <div className="flex gap-2">
  {techIcons.slice(0, 3).map(({ tech, url }, index) => (
    <div key={index} className="relative group">
      <Image
        src={url}
        alt={tech}
        width={28}
        height={28}
        className="rounded-full border border-dark-200"
      />
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-300 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
        {tech}
      </span>
    </div>
  ))}

  {techIcons.length > 3 && (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-300 text-xs border border-dark-200">
      +{techIcons.length - 3}
    </div>
  )}
</div>

  )
}

export default DisplayTechIcons
