'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

type VisibleCard = {
  content: React.ReactNode;
  index: number;
};

type CarouselContextProps = {
  activeIndex: number;
  totalCards: number;
  goToPrevious: () => void;
  goToNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  setTotalCards: (total: number) => void;
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

type CarouselProps = {
  fill?: boolean;
} & React.ComponentProps<'div'>;

function Carousel({ className, fill = false, children, ...props }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  const goToPrevious = React.useCallback(() => {
    setActiveIndex(prev => Math.max(0, prev - 1));
  }, []);

  const goToNext = React.useCallback(() => {
    setActiveIndex(prev => Math.min(totalCards - 1, prev + 1));
  }, [totalCards]);

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < totalCards - 1;

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        goToNext();
      }
    },
    [goToPrevious, goToNext]
  );

  return (
    <CarouselContext.Provider
      value={{
        activeIndex,
        totalCards,
        goToPrevious,
        goToNext,
        hasPrevious,
        hasNext,
        setTotalCards,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative flex flex-col', fill && 'h-full', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        <div className="absolute h-full px-4 items-center flex justify-between z-10 w-full">
          {totalCards > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </div>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

type CarouselContentProps = {
  maxVisible?: number;
  stackOffset?: number;
  fill?: boolean;
};

function CarouselContent({
  maxVisible = 3,
  stackOffset = 20,
  fill = false,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselContentProps) {
  const { activeIndex, setTotalCards } = useCarousel();
  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;
  const [contentHeight, setContentHeight] = React.useState<number | null>(null);
  const firstCardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTotalCards(totalCards);
  }, [totalCards, setTotalCards]);

  useEffect(() => {
    const updateHeight = () => {
      if (firstCardRef.current) {
        const height = firstCardRef.current.offsetHeight;
        setContentHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [activeIndex, children]);

  const visibleCards: VisibleCard[] = [];
  const cardsToShow = fill ? 1 : maxVisible;
  for (let i = 0; i < cardsToShow; i++) {
    const cardIndex = activeIndex + i;
    if (cardIndex < totalCards) {
      visibleCards.push({
        content: childrenArray[cardIndex],
        index: cardIndex,
      });
    }
  }

  const additionalHeight = fill ? 0 : (maxVisible - 1) * stackOffset;
  const totalHeight = contentHeight ? contentHeight + additionalHeight : 0;

  return (
    <div
      data-slot="carousel-content"
      className={cn('relative w-full', fill && 'h-full', className)}
      style={!fill && totalHeight ? { height: `${totalHeight}px` } : undefined}
      {...props}
    >
      {visibleCards.map((card, stackIndex) => (
        <div
          key={card.index}
          ref={stackIndex === 0 ? firstCardRef : null}
          role="group"
          aria-roledescription="slide"
          data-slot="carousel-item"
          className={cn(
            'transition-all duration-300 ease-in-out',
            fill ? 'absolute inset-0 w-full h-full' : 'absolute w-full'
          )}
          style={
            fill
              ? {
                  zIndex: cardsToShow - stackIndex,
                  opacity: stackIndex === 0 ? 1 : 0,
                }
              : {
                  zIndex: maxVisible - stackIndex,
                  top: `${stackIndex * stackOffset}px`,
                  opacity: 1 - stackIndex * 0.15,
                  transform: `scale(${1 - stackIndex * 0.05})`,
                }
          }
        >
          {card.content}
        </div>
      ))}
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('w-full h-full', className)} {...props} />;
}

function CarouselPrevious({ className, ...props }: React.ComponentProps<'button'>) {
  const { goToPrevious, hasPrevious } = useCarousel();

  return (
    <button
      data-slot="carousel-previous"
      className={cn(
        'size-8 bg-black/30 border border-green-700/30 items-center justify-center flex rounded-full',
        className
      )}
      disabled={!hasPrevious}
      onClick={goToPrevious}
      {...props}
    >
      <ChevronLeft className="size-4 text-primary" />
      <span className="sr-only">Previous card</span>
    </button>
  );
}

function CarouselNext({ className, ...props }: React.ComponentProps<'button'>) {
  const { goToNext, hasNext } = useCarousel();

  return (
    <button
      data-slot="carousel-next"
      className={cn(
        'size-8 bg-black/30 border border-green-700/30 items-center justify-center flex rounded-full',
        className
      )}
      disabled={!hasNext}
      onClick={goToNext}
      {...props}
    >
      <ChevronRight className="size-4 text-primary" />
      <span className="sr-only">Next card</span>
    </button>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
