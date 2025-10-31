'use client';

import * as React from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/utils/cn';

type ImageWithPlaceholderProps = ImageProps & {
  containerClassName?: string;
  placeholderClassName?: string;
};

export function ImageWithPlaceholder({
  className,
  containerClassName,
  placeholderClassName,
  onLoad,
  onLoadingComplete,
  alt,
  ...props
}: ImageWithPlaceholderProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleLoaded = React.useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={cn('relative overflow-hidden rounded-lg', containerClassName)}>
      {!isLoaded && (
        <div
          className={cn(
            'absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-800/40 to-neutral-700/20',
            placeholderClassName
          )}
        />
      )}
      <Image
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={e => {
          handleLoaded();
          onLoad?.(e);
        }}
        onLoadingComplete={img => {
          handleLoaded();
          onLoadingComplete?.(img);
        }}
        {...props}
      />
    </div>
  );
}

