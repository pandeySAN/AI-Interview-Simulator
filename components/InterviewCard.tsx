import React from "react"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { getRandomInterviewCover } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import DisplayTechIcons from "./DisplayTechIcons"

type Feedback = {
  createdAt: string
  comments?: string
  totalScore?: number
  finalAssessment?: string
}

type InterviewCardProps = Interview & {
  feedback?: Feedback | null
}

const InterviewCard = ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
  feedback,
}: InterviewCardProps) => {
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type
  const formattedDate = dayjs(feedback?.createdAt || createdAt).format(
    "MMM DD, YYYY"
  )

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96 p-4 flex flex-col gap-4">
      {/* Cover */}
      <div className="relative">
        <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-400">
          <p className="badge-text">{normalizedType}</p>
        </div>
        <Image
          src={getRandomInterviewCover()}
          alt="Interview Cover"
          width={90}
          height={90}
          className="rounded-full object-cover size-[90px]"
        />
      </div>

      {/* Title */}
      <h3 className="mt-5 capitalize">{role} Interview</h3>

      {/* Date + Score */}
      <div className="flex flex-row gap-5 mt-3">
        <div className="flex flex-row gap-2 items-center">
          <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
          <p className="text-sm">{formattedDate}</p>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <Image src="/star.svg" alt="star" width={22} height={22} />
          <p className="text-sm">
            {feedback?.totalScore !== undefined ? feedback.totalScore : "---"}
            /100
          </p>
        </div>
      </div>

      {/* Assessment */}
      <p className="line-clamp-2">
        {feedback?.finalAssessment || "You haven't taken the interview yet"}
      </p>

      {/* Tech stack + Button */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex-1">
          <DisplayTechIcons techStack={techstack} />
        </div>

        <Button className="btn-primary ml-3">
          <Link
            href={feedback ? `/interviews/${id}/feedback` : `/interviews/${id}`}
            className="btn-primary"
          >
            {feedback ? "Check Feedback" : "View Interview"}
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default InterviewCard
