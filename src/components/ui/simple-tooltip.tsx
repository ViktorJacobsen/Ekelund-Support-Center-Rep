'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  className?: string;
  hideArrow?: boolean;
  delayDuration?: number;
}

const SimpleTooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const SimpleTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const SimpleTooltipTrigger: React.FC<{
  children: React.ReactNode;
  asChild?: boolean; // Ignoreras i denna enkla implementation
}> = ({ children }) => {
  return <>{children}</>;
};

const SimpleTooltipContent: React.FC<TooltipProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  content,
  side = 'top',
  sideOffset = 5,
  className,
  hideArrow = false,
  delayDuration = 300,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayDuration);
  };

  const handleContent = () => {
    if (typeof content === 'string') {
      return content;
    } else if (content && React.isValidElement(content)) {
      return content;
    } else {
      return content ? String(content) : '';
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Positionera tooltip baserat på side prop
  useEffect(() => {
    if (triggerRef.current && tooltipRef.current && isVisible) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;
      
      switch (side) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - sideOffset;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.right + sideOffset;
          break;
        case 'bottom':
          top = triggerRect.bottom + sideOffset;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.left - tooltipRect.width - sideOffset;
          break;
      }
      
      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
    }
  }, [isVisible, side, sideOffset]);

  return (
    <div className="relative inline-block" ref={triggerRef} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 w-fit rounded-md px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95 bg-primary text-primary-foreground shadow-md",
            className
          )}
          {...props}
        >
          {handleContent()}
          {!hideArrow && (
            <div 
              className="absolute size-2.5 bg-primary rotate-45"
              style={{
                ...(side === 'top' && { bottom: '-5px', left: 'calc(50% - 5px)' }),
                ...(side === 'right' && { left: '-5px', top: 'calc(50% - 5px)' }),
                ...(side === 'bottom' && { top: '-5px', left: 'calc(50% - 5px)' }),
                ...(side === 'left' && { right: '-5px', top: 'calc(50% - 5px)' }),
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

// Higher-level component that combines the parts
function CustomTooltip({
  children,
  content,
  side = 'top',
  sideOffset = 5,
  className,
  hideArrow = false,
  delayDuration = 300,
}: TooltipProps) {
  return (
    <SimpleTooltipContent
    // @ts-ignore - Ignore ReactNode type issue
      content={content}
      side={side}
      sideOffset={sideOffset}
      className={className}
      hideArrow={hideArrow}
      delayDuration={delayDuration}
    >
      {children}
    </SimpleTooltipContent>
  );
}

export {
  SimpleTooltip as Tooltip,
  SimpleTooltipTrigger as TooltipTrigger,
  SimpleTooltipContent as TooltipContent,
  SimpleTooltipProvider as TooltipProvider,
  CustomTooltip
};