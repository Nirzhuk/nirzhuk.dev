import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <ul className="flex flex-col space-y-4 list-[diamond]">
        
        <li>
          <Link href="https://adophite.com" className="text-lg font-semibold text-[#e01818] hover:text-[#f71919]">
            Adophite
          </Link>
          <p className="text-neutral-400 dark:text-neutral-300 text-xs ml-4">
            Stacked with Next.js,Phoenix Framework, Stripe, Tailwind/Shadcn, and Supabase
          </p>
          <p>
            My biggest project ever created as one-man-army, one link bio solution
            to rule them all
          </p>
        </li>
        <li>
          <Link
            href="https://snackies.app"
            className="text-lg font-semibold text-[#18e083] hover:text-[#21f793] "
          >
            Snackies
          </Link>
          <p className="text-neutral-400 dark:text-neutral-300 text-xs ml-4">
            Stacked with React Native, Expo, Custom API AI, and NativeWind
          </p>
          <p>
            Calories tracker app for your daily meals.
          </p>
        </li>
        <li>
          <Link
            href="https://interlinked.love"
            className="text-lg font-semibold text-[#e018c2] hover:text-[#f721d7] "
          >
            interlinked.love
          </Link>
          <p className="text-neutral-400 dark:text-neutral-300 text-xs ml-4">
            Stacked with Next.js, Tailwind/Shadcn, Stripe and Drizzle-ORM
          </p>
          <p>
            Calendar app synced with people you invite and share your schedule
            with them.
          </p>
        </li>
         <li>
          <Link
            href="https://wwa-builder.nirzhuk.dev"
            className="text-lg font-semibold text-[#e0a418] hover:text-[#e1c369]"
          >
            wwa-builder
          </Link>
          <p className="text-neutral-400 dark:text-neutral-300 text-xs ml-4">
            Stacked with Next.js, Tailwind/Shadcn, Supabase
          </p>
          <p>
            A simple tool to build your own WWArmies Army and share them.
          </p>
        </li>
        <li>
          <Link
            href="/projects/nirzhuk-dev"
            className="text-lg font-semibold text-[#51e018] hover:text-[#8be169]"
          >
            nirzhuk-dev
          </Link>
          <p>
            {`My personal website, where I share my thoughts, projects, and
            experiences.`}
          </p>
        </li>
      </ul>
    </div>
  )
}
51e018