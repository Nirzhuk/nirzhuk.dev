import Image from 'next/image';
import { cn } from '@/utils/cn';

type PhoneShellProps = {
  src: string;
  alt: string;
  side?: 'left' | 'right';
  className?: string;
};

export function PhoneShell({ src, alt, side = 'right', className }: PhoneShellProps) {
  return (
    <figure
      className={cn(
        'my-6 w-[160px] sm:w-[200px]',
        side === 'right' ? 'lg:float-right lg:ml-10 lg:mb-8' : 'lg:float-left lg:mr-10 lg:mb-8',
        'mx-auto lg:mx-0',
        className
      )}
    >
      <div className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] bg-neutral-800 border-[5px] sm:border-[6px] border-neutral-700 shadow-xl overflow-hidden aspect-[9/19]">
        <Image src={src} alt={alt} fill sizes="200px" className="object-cover object-top" />
      </div>
    </figure>
  );
}
